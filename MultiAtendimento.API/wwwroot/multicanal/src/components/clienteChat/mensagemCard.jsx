import React, { useState } from 'react';

export default function mensagemCard({ mensagem }) {

    return (
        <div className={(mensagem.remetente == "CLIENTE"  ? 'justify-end' : 'justify-start') + " flex  min-w-full"}>
             <p className={mensagem.remetente == "CLIENTE" ? 'mensagem mensagemMinha' : 'mensagem mensagemDele' }>{mensagem.conteudo}</p>
        </div>
    )
}