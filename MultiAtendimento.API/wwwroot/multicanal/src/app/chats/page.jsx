"use client";
import './style.css'

import Navbar from '../../components/navBar/navBar';
import React, { useState, useEffect } from 'react';
import ChatList from '../../components/ChatList/page.jsx';
import chatRepositorio from '../../repositorio/chatRepositorio.js'
import conexaoWebSocket from '../../services/conexaoWebSocket.js'
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
  } from "@microsoft/signalr";

const Chats = () => {
    const [mensagem, setMensagem] = useState("");
    const [chats, setChats] = useState([]);
    const [chatAtual, setChatAtual] = useState(null);
    const [mensagensAtuais, setMensagensAtuais] = useState(null);
    const [conexao, setConexao] = useState(conexaoWebSocket.obterConexao());
    
    useEffect(() => {
        let conexaoBuild = new HubConnectionBuilder()
                        .withUrl("http:localhost:9000/chatHub", { accessTokenFactory: () => localStorage.getItem("tokenDeAcesso") })
                        .withAutomaticReconnect()
                        .configureLogging(LogLevel.Information)
                        .build();
    setConexao(conexaoBuild);
    conexao
      .start()
      .then(() => {
        console.log("CONECTADO")
      })

      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err)
      );

        async function obterChats() {
            let chats = await chatRepositorio.obterTodos();
            setChats(chats);
        }
        obterChats()
    },[conexao])

    const handleAoDigitarMensagem = (event) => {
        setMensagem(event.target.value)
    };

    const handleEnviarMensagem = () => {
        const novaMensagem = {
            id: 2,
            conteudo: mensagem
        }
        chatAtual.mensagens.push(novaMensagem)
        setMensagensAtuais(chatAtual.mensagens)
        setChatAtual(chatAtual)
        setMensagem("")
    };

    const handleAoClicarNoChat = (chat) => {
        setChatAtual(chat);
        setMensagensAtuais(chat.mensagens);
        setChats(chats);
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
