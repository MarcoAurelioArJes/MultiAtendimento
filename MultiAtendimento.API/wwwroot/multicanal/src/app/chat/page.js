"use client";

import React, { useState } from 'react';

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);

    const openChat = () => {
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsOpen(false);
    };

    return (
        <main>
            <style jsx>{`
                body {
                    font-family: Arial, sans-serif;
                }
                .open-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #008CBA;
                    color: white;
                    padding: 16px 20px;
                    border: none;
                    cursor: pointer;
                    border-radius: 50px;
                    text-align: center;
                }
                .chat-popup {
                    display: ${isOpen ? 'block' : 'none'};
                    position: fixed;
                    bottom: 0;
                    right: 20px;
                    border: 3px solid #f1f1f1;
                    z-index: 9;
                    max-width: 300px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    background-color: white;
                }
                .chat-header {
                    background-color: #008CBA;
                    color: white;
                    padding: 15px;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .chat-header h2 {
                    margin: 0;
                }
                .chat-header .close {
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                }
                .chat-body {
                    padding: 15px;
                    background-color: white;
                    max-height: 300px;
                    overflow-y: auto;
                    font-size: 14px;
                    line-height: 1.6;
                }
                .chat-body p {
                    margin: 10px 0;
                    padding: 10px;
                    background-color: #f1f1f1;
                    border-radius: 5px;
                }
                .chat-body p:first-of-type {
                    font-weight: bold;
                    background-color: #008CBA;
                    color: white;
                }
                .chat-footer {
                    padding: 10px;
                    background-color: #f1f1f1;
                    border-radius: 0 0 10px 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .chat-footer input[type=text] {
                    flex-grow: 1;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                }
                .chat-footer button {
                    background-color: #008CBA;
                    color: white;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
            `}</style>

            <div className="chat-popup" id="myChatPopup">
                <div className="chat-header">
                    <span className="close" onClick={closeChat}>&times;</span>
                    <h2>Canal Multiatendimento</h2>
                </div>
                <div className="chat-body">
                    <p>Olá! Como posso ajudar?</p>
                    <p>Digite 1 para Comercial</p>
                    <p>Digite 2 para Financeiro</p>
                    <p>Digite 3 para Suporte</p>
                </div>
                <div className="chat-footer">
                    <input type="text" placeholder="Digite uma mensagem..." />
                    <button type="submit">Enviar</button>
                </div>
            </div>
            <button className="open-button" onClick={openChat}>Chat</button>
        </main>
    );
}
