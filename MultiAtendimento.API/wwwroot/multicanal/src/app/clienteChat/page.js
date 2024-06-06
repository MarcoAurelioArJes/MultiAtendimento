"use client";

import React, { useState, useEffect } from 'react';
import MenuSetor from "../../components/clienteChat/menuSetor";
import setorRepositorio from '../../repositorio/setorRepositorio';

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [cliente, setCliente] = useState({ nome: "", cnpj: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [iniciarChat, setIniciarChat] = useState(false);
    const [setores, setSetores] = useState([]);
    const [setorSelecionado, setSetorSelecionado] = useState(null);

    const openChat = () => {
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsOpen(false);
        setIsSubmitted(false);
        setCliente({ nome: "", cnpj: "" });
        setSetores([]);
    };

    const handleSubmit = async () => {
        if (cliente.nome && cliente.cnpj && !isSubmitted) {
            try {
                const setoresData = await setorRepositorio.obterSetores();
                setSetores(setoresData);
                setIsSubmitted(true);
            } catch (error) {
                console.error('Erro ao obter setores:', error);
            }
        } else if (isSubmitted) {
            setIniciarChat(true);
        }
    };

    // const enviarMensagem = () => {
       
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({ ...prevState, [name]: value }));
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
                    max-width: 500px;
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
                    {iniciarChat ? (
                        <div className="message-input">
                          
                        </div>
                    ) : !isSubmitted ? (
                        <div>
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                                    Digite o seu nome
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="nome"
                                        id="nomeCliente"
                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Informe o seu nome"
                                        value={cliente.nome}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="cnpj" className="block text-sm font-medium leading-6 text-gray-900">
                                    Digite o CNPJ da empresa
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="cnpj"
                                        id="cnpjEmpresa"
                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Informe o CNPJ"
                                        value={cliente.cnpj}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Olá {cliente.nome}! </p>
                            <p className='text-black'>Selecione o setor para te atender</p>
                            <div>
                                <MenuSetor
                                    options={setores}
                                    selected={setorSelecionado}
                                    setSelected={setSetorSelecionado}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="chat-footer">
                   {iniciarChat? (<input className='text-black' type="text" placeholder="Digite uma mensagem..." />) : (<></>)}
                    <button type="button" onClick={iniciarChat ? enviarMensagem : handleSubmit}>Enviar</button>
                </div>
            </div>
            <button className="open-button" onClick={openChat}>Chat</button>
        </main>
    );
}
