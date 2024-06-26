import { useState, useEffect } from 'react';
import DeleteDialog from './DeleteDialog.jsx';
import CriarEAtualizarUsuarioDialog from './criarEAtualizarUsuarioDialog.jsx';
import usuarioRepositorio from '../../repositorio/usuarioRepositorio.js'

export default function ListaDeUsuarios() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [mostrarAtualizarDialog, setMostrarAtualizarDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState('atualizar');

    useEffect(()=>{
        usuarioRepositorio.obterUsuarios().then(data => setUsuarios(data.resultado))
    },[])

    const handleDeleteButtonClick = (entity) => {
        setSelectedEntity(entity);
        setShowDeleteDialog(true);
    };

    const handleAoClicarEmEditarUsuario = (usuario) => {
        setUsuarioSelecionado(usuario);
        setDialogMode('atualizar');
        setMostrarAtualizarDialog(true);
    };

    const handleAoClicarEmNovoUsuario = () => {
        setUsuarioSelecionado(null);
        setDialogMode('criar');
        setMostrarAtualizarDialog(true);
    };

    const atualizarUsuario = (usuarioAtualizado) => {
        if (dialogMode === 'atualizar') {
            let index = usuarios.findIndex(usuario => usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario);
            usuarios[index] = usuarioAtualizado;
        } else {
            console.log(usuarioAtualizado)
            usuarios.push(usuarioAtualizado);
        }
    };

    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl border-b-2">
                <h1 className='text-black mb-4 font-extrabold text-2xl'> Usuários </h1>
                <ul role="list" className="divide-y divide-gray-100">
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img
                                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    src={'/user-profile-icon.svg'}
                                    alt={'Imagem ilustrativa'}
                                />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{usuario.nome}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{usuario.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <div className="flex flex-col items-end">
                                    <p className="text-sm leading-6 text-gray-900">{usuario.cargo === 0 ? "Administrador" : "Atendente"}</p>
                                    <p className="text-sm leading-6 text-gray-900">{usuario.setorId == null ? "Todos" : usuario.setor}</p>
                                </div>
                                <div className="flex flex-col gap-y-2 items-end">
                                    <button
                                        className="flex items-center px-2 py-1 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={() => handleAoClicarEmEditarUsuario(usuario)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button
                                        className="flex items-center px-2 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={() => handleDeleteButtonClick("usuário", usuarioSelecionado.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    <li className="flex justify-end gap-x-6 py-5 text-white">
                        <div className="flex gap-x-4">
                            <div className="flex gap-y-2 items-end">
                                <button
                                    className="flex items-center px-2 py-1 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    onClick={handleAoClicarEmNovoUsuario}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Novo usuario
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {
                showDeleteDialog && (
                    <DeleteDialog
                        onClose={() => setShowDeleteDialog(false)}
                        entity={selectedEntity}
                    />
                )
            }
            {
                mostrarAtualizarDialog && (
                    <CriarEAtualizarUsuarioDialog
                        aoFechar={() => setMostrarAtualizarDialog(false)}
                        usuario={usuarioSelecionado}
                        atualizarUsuario={atualizarUsuario}
                        mode={dialogMode}
                    />
                )
            }
        </div >
    );
}