import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import setorRepositorio from '@/repositorio/setorRepositorio';
import { toast } from 'react-hot-toast';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function CriarEAtualizarSetorDialog({ aoFechar, setor, atualizarSetor, mode }) {
    const dadosFormularioPadrao = { nome: '' };
    const [dadosDoFormulario, setDadosDoFormulario] = useState(mode === 'atualizar' ? { ...setor } : { nome: '' });

    const handleAoMudarOValorDoInput = (e) => {
        const { name, value } = e.target;
        setDadosDoFormulario((dadosDoFormulario) => ({...dadosDoFormulario, [name]: value,}));
      };
    
      const handleCriarSetor = async () => {
        try {
          const dadosSetor = {
            ...dadosDoFormulario
          };
      
          await mode === 'atualizar' ? setorRepositorio.atualizar(dadosSetor.id, dadosSetor) : setorRepositorio.criar(dadosSetor);
    
          setDadosDoFormulario(dadosFormularioPadrao);
          toast.success("Setor cadastrado com sucesso!!!");
          atualizarSetor(dadosSetor);
          aoFechar();
        }
        catch (erro) {
          toast.error(erro.message)
        }
      };

    return (
        <Transition show={true}>
            <Dialog className="relative z-10" onClose={aoFechar}>
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-10">
                                                {mode === 'update' ? 'Alterar setor' : 'Novo setor'}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <form className="space-y-4 text-gray-500">
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                            Nome
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nome"
                                                            id="nome"
                                                            value={dadosDoFormulario.nome}
                                                            onChange={handleAoMudarOValorDoInput}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-between my-5">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={handleCriarSetor}
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={aoFechar}
                                        data-autofocus
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
