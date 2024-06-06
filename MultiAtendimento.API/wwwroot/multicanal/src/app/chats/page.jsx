"use client";
import './style.css'

import Navbar from '../../components/navBar/navBar';
import React, { useState, useEffect } from 'react';
import ChatList from '../../components/ChatList/page.jsx';
import chatRepositorio from '../../repositorio/chatRepositorio.js'
import conexaoWebSocket from '../../services/conexaoWebSocket.js'

const Chats = () => {
    let chatsContextoGlobal = [];
    let mensagensAtuaisContextoGlobal = [];
    let chatAtualContextoGlobal = [];

    const [mensagem, setMensagem] = useState("");
    const [chats, setChats] = useState([]);
    const [chatAtual, setChatAtual] = useState(null);
    const [mensagensAtuais, setMensagensAtuais] = useState(null);
    const [conexao, setConexao] = useState();
    
    useEffect(() => {
        async function iniciarConexao() {
            let conexaoInicial = conexaoWebSocket.obterConexao();
            console.log(conexaoInicial)
            await conexaoWebSocket.iniciarConexao(conexaoInicial);
            setConexao(conexaoInicial);
            conexaoInicial.invoke("VincularAUmGrupoDeChats");

            definirEventosASeremEscutados(conexaoInicial);
        }
        iniciarConexao();

        async function obterChats() {
            let chats = await chatRepositorio.obterTodos();
            setChats(chats);
            
            if (chatsContextoGlobal.length > 0)
                chatsContextoGlobal = [];

            chatsContextoGlobal.push(...chats)
        }
        obterChats()
    }, [])

    const definirEventosASeremEscutados = (conexao) => {
        conexao.on("MensagemRecebida", handleMensagemRecebida)
        conexao.on("MensagemEnviada", handleMensagemEnviada)

        conexao.on("ChatCriado", (chat) => {
            setChats([...chats, chat])
        })
    }

    const handleMensagemRecebida = (mensagem) => {
        let indexChatQueRecebeuAMensagem = chatsContextoGlobal.findIndex(chat => chat.id == mensagem.chatId);
        chatsContextoGlobal[indexChatQueRecebeuAMensagem].mensagens.push(mensagem);
        setChats(chatsContextoGlobal)

        let indexMensagensAtuaisContextoGlobal = mensagensAtuaisContextoGlobal.findIndex(mensagemAtual => mensagemAtual.chatId == mensagem.chatId);
        mensagensAtuaisContextoGlobal[indexMensagensAtuaisContextoGlobal].push(mensagem);
        setMensagensAtuais(mensagensAtuaisContextoGlobal)

        console.log(mensagensAtuaisContextoGlobal)
    }

    const handleMensagemEnviada = (mensagem) => {
        let indexMensagensAtuaisContextoGlobal = mensagensAtuaisContextoGlobal.findIndex(mensagemAtual => mensagemAtual.chatId == mensagem.chatId);
        mensagensAtuaisContextoGlobal[indexMensagensAtuaisContextoGlobal].push(mensagem);
        setMensagensAtuais(mensagensAtuaisContextoGlobal)

        console.log(mensagensAtuaisContextoGlobal)
    }

    const handleAoDigitarMensagem = (event) => {
        setMensagem(event.target.value)
    };

    const handleEnviarMensagem = () => {
        const novaMensagem = {
            chatId: chatAtual.id,
            conteudo: mensagem
        }
        console.log("EnviarMensagem", chats)
        conexao.invoke("EnviarMensagem", novaMensagem);

        chatAtual.mensagens.push(novaMensagem)
        setMensagensAtuais(chatAtual.mensagens)
        setChatAtual(chatAtual)
        setMensagem("")
    };

    const handleAoClicarNoChat = (chat) => {
        setChatAtual(chat);
        setMensagensAtuais(chat.mensagens);
        setChats(chats);

        if (mensagensAtuaisContextoGlobal.length > 0)
            mensagensAtuaisContextoGlobal = [];

        mensagensAtuaisContextoGlobal.push(chat.mensagens)

        conexao.invoke("VincularAUmChat", chat.id);
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="main-container">
                <div className="chat-list">
                    <h2>Chats</h2>
                    {
                        chats != undefined && <ChatList chats={chats} onChatClick={handleAoClicarNoChat} />
                    }
                </div>
                <div className="message-input">
                    {chatAtual && (
                        <>
                            <div className="chat-header">
                                {chatAtual.clienteId}
                            </div>
                            <div className="messages">
                                {mensagensAtuais.map((mensagem) => (
                                    // <div key={mensagem.id} className={`message ${msg.sender === "You" ? "you" : "other"}`}>
                                    <div key={mensagem.id} className={`message ${mensagem.sender === "You" ? "you" : "other"}`}>
                                        <p>{mensagem.conteudo}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="input-container">
                        <input
                            type="text"
                            value={mensagem}
                            onChange={handleAoDigitarMensagem}
                            placeholder="Digite sua mensagem..."
                        />

                        <button onClick={handleEnviarMensagem} src="https://www.myinstants.com/instant/cebolinha-maltratando-11511/embed/">Enviar</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chats;