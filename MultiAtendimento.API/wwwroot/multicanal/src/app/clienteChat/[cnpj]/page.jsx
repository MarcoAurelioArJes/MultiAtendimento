"use client";

import "./style.css";
import React, { useState } from 'react';
import FormularioCliente from '@/components/clienteChat/formularioCliente';
import CaixaDeMensagens from "@/components/clienteChat/caixaDeMensagens";
import { useParams } from 'next/navigation'

const ClienteChat = () => {

    const [aberto, setAberto] = useState(false);
    const [cliente, setCliente] = useState({ nome: "", setor: 0 });
    const [chatIniciado, setChatIniciado] = useState(false);
    const [conexao, setConexao] =  useState();
    const params = useParams()

    const abreChat = () => {
        setAberto(true);

    };

    const fechaChat = () => {
        setAberto(false);
        setCliente({ nome: "", setor: 0 });
    };

    return (
        <main>
            <div className={aberto ? "chat-popup block" : "chat-popup hidden"} id="myChatPopup">
                <div className="chat-header select-none overflow-visible">
                    <span className="close" onClick={fechaChat}>&times;</span>
                    <h2>Canal Multiatendimento</h2>
                </div>
                {chatIniciado ?
                    <CaixaDeMensagens
                        cliente={cliente}
                        conexao={conexao}
                    />
                    :
                    <FormularioCliente
                        setCliente={setCliente}
                        setChatIniciado={setChatIniciado}
                        setConexao={setConexao}
                        cnpj={params.cnpj}
                    />
                }
            </div>
            <button className="open-button" onClick={abreChat}>Chat</button>
        </main>
    );
}

export default ClienteChat;
