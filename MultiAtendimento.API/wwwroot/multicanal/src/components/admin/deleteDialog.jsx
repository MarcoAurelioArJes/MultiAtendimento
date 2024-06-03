import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DeleteDialog({ onClose, entity, entityId }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const URL = '';

    const handleDelete = () => {
        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    throw new Error(response.status);
                }
                setSuccess(`O registro de ${entity} foi excluído.`);
                setTimeout(() => onClose(), 3000);
            })
            .catch(error => {
                console.error(`Erro ao excluir ${entity}: ${error}`);
                setError('Por favor, tente novamente mais tarde.');
            });
    };

    const clearError = () => {
        setError(null);
    };

    const clearSuccess = () => {
        setSuccess(null);
    };

    return (
        <Transition show={true}>
            <Dialog className="fixed inset-0 overflow-y-auto" onClose={onClose}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogPanel className="flex items-center justify-center min-h-screen p-4 text-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />

                        {!error && !success && (
                            <DialogPanel className="relative z-10 bg-white rounded-lg p-6 sm:p-8">

                                <div className="mt-4 flex-row">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                        Excluir {entity}
                                    </DialogTitle>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p>Tem certeza que deseja excluir esse {entity}?</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={handleDelete}
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 inline-flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </DialogPanel>
                        )}

                        {error && (
                            <DialogPanel className="relative z-10 bg-white rounded-lg p-6 sm:p-8">
                                <div className="mt-4 flex-row text-red-600">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <DialogTitle as="h3" className="text-lg font-semibold leading-6">
                                        Erro
                                    </DialogTitle>
                                    <div className="mt-2 ">
                                        <p>{error}</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="button"
                                        className="ml-4 inline-flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </DialogPanel>
                        )}

                        {success && (
                            <DialogPanel className="relative z-10 bg-white rounded-lg p-6 sm:p-8">
                                <div className="mt-4 flex-row text-green-600">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>

                                    </div>
                                    <DialogTitle as="h3" className="text-lg font-semibold leading-6">
                                        Sucesso!
                                    </DialogTitle>
                                    <div className="mt-2 mb-6">
                                        <p>{success}</p>
                                    </div>
                                </div>
                            </DialogPanel>
                        )}

                    </DialogPanel>

                </TransitionChild>
            </Dialog>
        </Transition>
    );
}