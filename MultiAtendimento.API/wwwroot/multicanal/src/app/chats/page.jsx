"use client";
import './style.css'

import Navbar from '../../components/navBar/navBar';
import React, { useState, useEffect, useRef } from 'react';
import ChatList from '../../components/ChatList/page.jsx';
import chatRepositorio from '../../repositorio/chatRepositorio.js'
import conexaoWebSocket from '../../services/conexaoWebSocket.js'
import toast from 'react-hot-toast';

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

            definirEventosASeremEscutados.bind(this)(conexaoInicial);
        }
        iniciarConexao();

        async function obterChats() {
            try {
                let retorno = await chatRepositorio.obterTodos();
                chatsRef.current = retorno.resultado;
                setChats(chatsRef.current);
            } catch(erro) {
                let erroJson = JSON.parse(erro.message);
          
                if (Object.keys(erroJson.resultado).length === 0) {
                  toast.error(erroJson.mensagem)
                  return;
                }
                erroJson.resultado.forEach(result => {
                  toast.error(result.mensagens[0], { id: result.campo })
                });
            }
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

        if (chatsRef.current[indexChatQueRecebeuAMensagem].mensagens.some(mensagem => mensagem.id == mensagemRecebida.id))
            return;

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
        setMensagem("");
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
                                    <div key={mensagem.id} className={`${mensagem.remetente != "CLIENTE" ? 'posicaoMensagemMinha' : 'posicaoMensagemDele'}`}>
                                        <p className={`message ${mensagem.remetente != "CLIENTE" ? 'mensagemMinha' : 'mensagemDele'}`}>{mensagem.conteudo}</p>
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