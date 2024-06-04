import { useState } from 'react';
import DeleteDialog from './DeleteDialog';
import UpdateCreateDialog from './UpdateCreateDialog';

// Receber da API
let users = [
    {
        id: 11,
        Nome: 'Leslie Alexander',
        Email: 'leslie.alexander@example.com',
        cargo: 'Administrador',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        setor: 'Administrativo'
    },
    {
        id: 22,
        Nome: 'Michael Foster',
        Email: 'michael.foster@example.com',
        cargo: 'Atendente',
        imageUrl: '',
        setor: 'Suporte'
    }
];

export default function UserList() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [dialogMode, setDialogMode] = useState('update');

    const handleDeleteButtonClick = (entity) => {
        setSelectedEntity(entity);
        setShowDeleteDialog(true);
    };

    const handleEditButtonClick = (user) => {
        setSelectedEntity(user);
        setDialogMode('update');
        setShowUpdateDialog(true);
    };

    const handleCreateButtonClick = () => {
        setSelectedEntity(null);
        setDialogMode('create');
        setShowUpdateDialog(true);
    };

    const updateUser = (updatedUser) => {
        if (dialogMode === 'update') {
            users = users.map(user => user.Email === updatedUser.Email ? updatedUser : user);
        } else {
            users.push(updatedUser);
        }
    };

    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl border-b-2">
                <h1 className='text-black mb-4 font-extrabold text-2xl'> Usuários </h1>
                <ul role="list" className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <li key={user.Email} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img
                                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    src={user.imageUrl ? user.imageUrl : '/user-profile-icon.svg'}
                                    alt={user.Nome}
                                />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{user.Nome}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.Email}</p>
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <div className="flex flex-col items-end">
                                    <p className="text-sm leading-6 text-gray-900">{user.cargo}</p>
                                    <p className="text-sm leading-6 text-gray-900">{user.setor}</p>
                                </div>
                                <div className="flex flex-col gap-y-2 items-end">
                                    <button
                                        className="flex items-center px-2 py-1 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={() => handleEditButtonClick(user)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button
                                        className="flex items-center px-2 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={() => handleDeleteButtonClick("usuário", user.id)}
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
                                    onClick={handleCreateButtonClick}
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
                showUpdateDialog && (
                    <UpdateCreateDialog
                        onClose={() => setShowUpdateDialog(false)}
                        user={selectedEntity}
                        updateUser={updateUser}
                        mode={dialogMode}
                    />
                )
            }
        </div >
    );
}
