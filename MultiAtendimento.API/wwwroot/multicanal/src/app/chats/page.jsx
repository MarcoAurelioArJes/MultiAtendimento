"use client";

import Navbar from '../../components/navBar/navBar';
import React, { useState } from 'react';
import ChatList from '../../components/ChatList/page.jsx';

let chatsArray = [
    {
        id: 1,
        cliente: "Lia",
        ultimaMensagem: 'oi Cauã, quer namorar'
    },
    {
        id: 2,
        cliente: "Marianne",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
    {
        id: 3,
        cliente: "Marco vida",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
    {
        id: 4,
        cliente: "Vitor vida",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
    {
        id: 5,
        cliente: "Luiz",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
    {
        id: 6,
        cliente: "Daniel",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
    {
        id: 7,
        cliente: "Robson",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
    {
        id: 8,
        cliente: "Tiago",
        ultimaMensagem: 'Cauã, te amo, vamos tentar novamente'
    },
];

const Chats = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() && currentChat) {
            const newMessage = {
                id: Date.now(),
                text: message,
                sender: "You"
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    const handleChatClick = (chat) => {
        setCurrentChat(chat);
        setMessages([]);
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <style>
                {`
                /* Estilos CSS */
                .main-container {
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    gap: 15px;
                    padding: 100px;
                    background-color: #f5f5f5;
                    height: 100vh;
                    box-sizing: border-box;
                }
                .chat-list {
                    display: flex;
                    flex-direction: column;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    overflow-y: auto;
                }
                .chat-list h2 {
                    margin-bottom: 20px;
                    color: #333;
                }
                .chat-card {
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    transition: background 0.3s;
                }
                .chat-card:hover {
                    background: #f0f0f0;
                }
                .message-input {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    overflow-y: auto;
                }
                .messages {
                    flex: 1;
                    overflow-y: auto;
                    border: 1px solid #eee;
                    border-radius: 10px;
                    padding: 10px;
                    margin-bottom: 20px;
                    background: #fafafa;
                }
                .message {
                    margin-bottom: 10px;
                    padding: 10px;
                    border-radius: 10px;
                    max-width: 70%;
                }
                .message.you {
                    background: #dcf8c6;
                    align-self: flex-end;
                }
                .message.other {
                    background: #fff;
                    align-self: flex-start;
                }
                .chat-header {
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                }
                .input-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .input-container input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .input-container button {
                    padding: 10px 20px;
                    background: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .input-container button:hover {
                    background: #0056b3;
                }
                `}
            </style>
            <main className="main-container">
                <div className="chat-list">
                    <h2>Chats</h2>
                    <ChatList chats={chatsArray} onChatClick={handleChatClick} />
                </div>
                <div className="message-input">
                    {currentChat && (
                        <>
                            <div className="chat-header">
                                {currentChat.cliente}
                            </div>
                            <div className="messages">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`message ${msg.sender === "You" ? "you" : "other"}`}>
                                        <p>{msg.text}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Digite sua mensagem..."
                        />

                        <button onClick={handleSendMessage}src="https://www.myinstants.com/instant/cebolinha-maltratando-11511/embed/">Enviar</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chats;
