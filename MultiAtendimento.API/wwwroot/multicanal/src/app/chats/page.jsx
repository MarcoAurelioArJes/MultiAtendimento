"use client";
import './style.css'

import Navbar from '../../components/navBar/navBar';
import React, { useState, useEffect, useRef } from 'react';
import ChatList from '../../components/ChatList/page.jsx';
import chatRepositorio from '../../repositorio/chatRepositorio.js';
import conexaoWebSocket from '../../services/conexaoWebSocket.js';

export default function Chats() {
    const [mensagem, setMensagem] = useState("");
    const [chats, setChats] = useState([]);
    const chatsRef = useRef();
    const [chatAtual, setChatAtual] = useState(null);
    const chatAtualRef = useRef();
    const [mensagensAtuais, setMensagensAtuais] = useState(null);
    const mensagensAtuaisRef = useRef();
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
            chatsRef.current = await chatRepositorio.obterTodos();
            setChats(chatsRef.current);
            console.log(chatsRef.current)
        }
        obterChats()
    }, [])

    const definirEventosASeremEscutados = (conexao) => {
        conexao.on("MensagemRecebida", handleMensagemRecebida);
        conexao.on("MensagemAtualEnviada", handleMensagemAtualEnviada);

        conexao.on("ChatCriado", (chat) => {
            let chatExiste = chatsRef.current.some(chatRef => chatRef.id == chat.id)
            if (chatExiste)
                return;

            chatsRef.current = [...chatsRef.current, chat]
            setChats(chatsRef.current)
        })
    }

    const handleAtualizarChatsEMensagens = (mensagemRecebida) => {
        let indexChatQueRecebeuAMensagem = chatsRef.current.findIndex(chatRef => chatRef.id === mensagemRecebida.chatId);
        if (chatAtualRef.current.id === mensagemRecebida.chatId) {
            mensagensAtuaisRef.current = [...mensagensAtuaisRef.current, mensagemRecebida];
            chatAtualRef.current.mensagens = mensagensAtuaisRef.current;
            
            setChatAtual(chatAtualRef.current)
            setMensagensAtuais(mensagensAtuaisRef.current)
        }
        else {
            chatsRef.current[indexChatQueRecebeuAMensagem].mensagens = [...chatsRef.current[indexChatQueRecebeuAMensagem].mensagens, mensagemRecebida]
            setChats(chatsRef.current)
        }
    }

    const handleMensagemRecebida = (mensagemRecebida) => {
        handleAtualizarChatsEMensagens(mensagemRecebida);
    }

    const handleMensagemAtualEnviada = (mensagemRecebida) => {
        handleAtualizarChatsEMensagens(mensagemRecebida);
    }
    
    const handleAoDigitarMensagem = (event) => {
        setMensagem(event.target.value)
    };

    const handleEnviarMensagem = () => {
        const novaMensagem = {
            chatId: chatAtual.id,
            conteudo: mensagem
        }
        conexao.invoke("EnviarMensagem", novaMensagem);
    };

    const handleAoClicarNoChat = (chat) => {
        chatAtualRef.current = chat;
        setChatAtual(chatAtualRef.current);
        mensagensAtuaisRef.current = chatAtualRef.current.mensagens;
        setMensagensAtuais(mensagensAtuaisRef.current);

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
                                {chatAtual.cliente.nome}
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