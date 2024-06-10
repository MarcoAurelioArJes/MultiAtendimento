import React, { useState } from 'react';

export default function mensagemCard({ mensagem }) {

    return (
        <div className={(mensagem.remetente?' justify-end': 'justify-start') + " flex  min-w-full"}>
             <p className={mensagem.remetente? 'mensagem mensagemMinha' : 'mensagem mensagemDele'}>{mensagem.conteudo}</p>
        </div>
    )
}
