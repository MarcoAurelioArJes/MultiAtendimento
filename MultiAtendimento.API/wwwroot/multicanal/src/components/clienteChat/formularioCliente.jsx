import React, { useState, useEffect } from 'react';
import MenuSetor from "../../components/clienteChat/menuSetor";
import setorRepositorio from '@/repositorio/setorRepositorio';
import conexaoWebSocket from '../../services/conexaoWebSocket.js'

//const CNPJ = "987654321";

export default function formularioCliente({ setCliente, setChatIniciado, setConexao, cnpj }) {

    const [setores, setSetores] = useState([{id: 0, nome: ""}]);
    const [nome, setNome] = useState("");
    const [setorSelecionado, setSetorSelecionado] = useState(setores[0]);

    useEffect(() => {
        setorRepositorio.obterSetoresPorCnpj(cnpj).then(data => setSetores(data))
    }, [])

    const pegarNome = (e) => {
        setNome(e.target.value);
    }

    const enviar = async () => {
        const cliente = {nome: nome, empresaCnpj: cnpj , setorId: setorSelecionado.id};

        const conexaoInstanciada = await obterConexaoInstanciada();
        conexaoInstanciada.invoke("IniciarChat", cliente)
        setConexao(conexaoInstanciada)

        setCliente(cliente)

        setChatIniciado(true)
    };

    const obterConexaoInstanciada = async () => {
        let conexaoInicial = conexaoWebSocket.obterConexao();
        await conexaoWebSocket.iniciarConexao(conexaoInicial);
        return conexaoInicial;
    }

    return (
        <>
            <div className="chat-body select-none">
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
                                value={nome}
                                onChange={pegarNome}
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="cnpj" className="block text-sm font-medium leading-6 text-gray-900">
                            Selecione o setor desejado
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm text-gray-800">
                            <MenuSetor
                                options={setores}
                                selected={setorSelecionado}
                                setSelected={setSetorSelecionado}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="chat-footer select-none">
                <button type="button" className='w-full' onClick={enviar}>Entrar</button>
            </div>
        </>

    )


}