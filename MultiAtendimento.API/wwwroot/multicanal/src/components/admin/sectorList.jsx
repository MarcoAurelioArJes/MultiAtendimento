import { useState } from 'react';
import DeleteDialog from './DeleteDialog';
import UpdateCreateSectorDialog from './UpdateCreateSectorDialog';

// Receber da API
let sectors = [
    {
        id: 1,
        name: 'Administrativo'
    },
    {
        id: 2,
        name: 'Suporte'
    }
];

export default function SectorList() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [dialogMode, setDialogMode] = useState('update');

    const handleDeleteButtonClick = (entity) => {
        setSelectedEntity(entity);
        setShowDeleteDialog(true);
    };

    const handleEditButtonClick = (sector) => {
        setSelectedEntity(sector);
        setDialogMode('update');
        setShowUpdateDialog(true);
    };

    const handleCreateButtonClick = () => {
        setSelectedEntity(null);
        setDialogMode('create');
        setShowUpdateDialog(true);
    };

    const updateSector = (updatedSector) => {
        if (dialogMode === 'update') {
            sectors = sectors.map(sector => sector.id === updatedSector.id ? updatedSector : sector);
        } else {
            sectors.push(updatedSector);
        }
    };

    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <h1 className='text-black mb-4 font-extrabold text-2xl'> Setores </h1>
                <ul role="list" className="divide-y divide-gray-100">
                    {sectors.map((sector) => (
                        <li key={sector.id} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{sector.name}</p>
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <button
                                    className="flex items-center px-2 py-1 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={() => handleEditButtonClick(sector)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 012.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125L18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                                <button
                                    className="flex items-center px-2 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    onClick={() => handleDeleteButtonClick("setor", sector.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                    <li className="flex justify-end gap-x-6 py-5 text-white">
                        <div className="flex gap-x-4">
                            <button
                                className="flex items-center px-2 py-1 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={handleCreateButtonClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Novo setor
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            {showDeleteDialog && (
                <DeleteDialog
                    onClose={() => setShowDeleteDialog(false)}
                    entity={selectedEntity}
                />
            )}
            {showUpdateDialog && (
                <UpdateCreateSectorDialog
                    onClose={() => setShowUpdateDialog(false)}
                    sector={selectedEntity}
                    updateSector={updateSector}
                    mode={dialogMode}
                />
            )}
        </div>
    );
}
