import React, { useState, useEffect, useRef } from 'react';
import MensagemCard from './mensagemCard';
import Cookies from 'js-cookie';

export default function caixaDeMensagens({ conexao }) {

    const [mensagens, setMensagens] = useState([]);
    const [mensagemDigitada, setMensagemDigitada] = useState("");

    useEffect(() => {
        console.log(conexao)
        definirEventosASeremEscutados(conexao);
    }, [])

    const definirEventosASeremEscutados = (conexao) => {
        conexao.on("TokenDoCliente", handleAdicionarTokenDoCliente);
        conexao.on("MensagemRecebida", handleMensagemRecebida);
        conexao.on("MensagemAtualEnviada", handleMensagemAtualEnviada);
    }

    const handleAdicionarTokenDoCliente = (tokenDoCliente) => {
        Cookies.set("tokenDeAcessoCliente", tokenDoCliente);
    }

    const handleMensagemRecebida = (mensagemRecebida) => {
        setMensagens(mensagensAntigas => [...mensagensAntigas, mensagemRecebida]);

    }

    const handleMensagemAtualEnviada = (mensagemRecebida) => {
        setMensagens(mensagensAntigas => [...mensagensAntigas, mensagemRecebida]);
    }

    const handleEnviarMensagem = () => {
        if (mensagemDigitada.trim()) {
            let tokenDoCliente = Cookies.get("tokenDeAcessoCliente");
            if (tokenDoCliente == undefined)
                return;

            conexao.invoke("EnviarMensagemCliente", { conteudo: mensagemDigitada, token: tokenDoCliente });
            setMensagemDigitada('');
        }


    };

    const pegaMensageDigitada = (e) => {
        setMensagemDigitada(e.target.value)
    }

    return (
        <>
            <ul className="chat-body caixaDeMensagens overflow-scroll">
                {mensagens.map((mensagem, index) => <MensagemCard mensagem={mensagem} key={index} />)}
            </ul>
            <div className="chat-footer">
                <input className='text-black mx-2 w-9/12 rounded-md' type="text" placeholder="Digite uma mensagem..." value={mensagemDigitada} onChange={pegaMensageDigitada} />
                <button type="button" onClick={handleEnviarMensagem}>Enviar</button>
            </div>
        </>
    )
}