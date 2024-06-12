import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import SelectMenu from './SelectMenu';
import usuarioRepositorio from '@/repositorio/usuarioRepositorio';
import setorRepositorio from '@/repositorio/setorRepositorio';
import { toast } from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CriarEAtualizarDialog({ aoFechar, usuario, atualizarUsuario, mode }) {
  const cargos = [
    { id: 0, nome: "Administrador" },
    { id: 1, nome: "Atendente" }
  ];

  useEffect(() => {
    async function obterSetores() {
      let resultadoSetor = await setorRepositorio.obterSetores();
      let setores = resultadoSetor.resultado;
      setSetores(setores)
      setSetorSelecionado(mode === 'atualizar' ? setores.find(setor => setor.id === usuario.setorId) : setores[0]);
    }
    obterSetores();

    setCargoSelecionado(mode === 'atualizar' ? cargos.find(cargo => cargo.id === usuario.cargo) : cargos[0])
  },[])

  const dadosFormularioPadrao = { nome: '', email: '', senha: '', setorId: 0, cargo: 0 };
  const [dadosDoFormulario, setDadosDoFormulario] = useState(mode === 'atualizar' ? { ...usuario } : dadosFormularioPadrao);
  const [setores, setSetores] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState();
  const [cargoSelecionado, setCargoSelecionado] = useState();

  const handleAoMudarOValorDoInput = (e) => {
    const { name, value } = e.target;
    setDadosDoFormulario((dadosDoFormulario) => ({...dadosDoFormulario, [name]: value,}));
  };

  const handleCriarUsuario = async () => {
    try {
      const dadosUsuario = {
        ...dadosDoFormulario,
        setorId: setorSelecionado.id,
        cargo: cargoSelecionado.id
      };
  
      await mode === 'atualizar' ? usuarioRepositorio.atualizar(usuario.id, dadosUsuario) : usuarioRepositorio.criar(dadosUsuario);

      setDadosDoFormulario(dadosFormularioPadrao)
      toast.success(`${cargoSelecionado.nome} cadastrado com sucesso!!!`)
      atualizarUsuario(dadosUsuario)
      aoFechar()
    }
    catch (erro) {
      toast.error(erro.message)
    }
  };

  return (
    <Transition show={true}>
      <Dialog className="relative z-10" onClose={aoFechar}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-10">
                        {mode === 'update' ? 'Alterar usuário' : 'Novo usuário'}
                      </DialogTitle>
                      <div className="mt-2">
                        <form className="space-y-4 text-gray-500">
                          <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                              Nome
                            </label>
                            <input
                              type="text"
                              name="nome"
                              id="nome"
                              value={dadosDoFormulario.nome}
                              onChange={handleAoMudarOValorDoInput}
                              className="mt-1 block w-full rounded-md border-gray-300 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={dadosDoFormulario.email}
                              onChange={handleAoMudarOValorDoInput}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              disabled={mode === 'update'}
                            />
                          </div>
                          <div>
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                              Senha
                            </label>
                            <input
                              type="password"
                              name="senha"
                              id="senha"
                              value={dadosDoFormulario.senha}
                              onChange={handleAoMudarOValorDoInput}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            {
                                setorSelecionado !== undefined && (
                                  <SelectMenu
                                  options={setores}
                                  formLabel="Setores"
                                  selected={setorSelecionado}
                                  setSelected={setSetorSelecionado}
                                />
                                )
                            }
                          </div>
                          <div>
                            {
                                cargoSelecionado !== undefined && (
                                  <SelectMenu
                                  options={cargos}
                                  formLabel="Cargo"
                                  selected={cargoSelecionado}
                                  setSelected={setCargoSelecionado}
                                />
                                )
                            }
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
                    onClick={handleCriarUsuario}
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
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
