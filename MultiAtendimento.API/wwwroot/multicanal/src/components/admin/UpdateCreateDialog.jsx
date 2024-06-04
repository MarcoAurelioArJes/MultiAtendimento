import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import SelectMenu from './SelectMenu';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UpdateCreateDialog({ onClose, user, updateUser, mode }) {

  const roles = [
    { id: 1, nome: "Administrador" },
    { id: 2, nome: "Atendente" }
  ];

  //Buscar da API
  let sectors = [
    { id: 1, nome: 'Administrativo' },
    { id: 2, nome: 'Suporte' }
  ];


  const [formData, setFormData] = useState( mode === 'update' ? { ...user } : { Nome: '', Email: '', Senha: '', setor: sectors[0].id, cargo: 1 });
  const [selectedSector, setSelectedSector] = useState(mode === 'update' ? sectors.find(sector => sector.nome === user.setor) : sectors[0]);
  const [selectedRole, setSelectedRole] = useState( mode === 'update' ? { id: user.cargo, nome: user.cargo === 1 ? "Administrador" : "Atendente" } : { id: 2, nome: "Atendente" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value,}));
  };

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      setorId: selectedSector.id,
      cargo: selectedRole.id
    };

    const url = mode === 'update' ? `/api/users/${user.Id}` : '/api/users';
    const method = mode === 'update' ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        onClose();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Transition show={true}>
      <Dialog className="relative z-10" onClose={onClose}>
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
                              {sectors[0].nome}
                            </label>
                            <input
                              type="text"
                              name="Nome"
                              id="nome"
                              value={formData.Nome}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              name="Email"
                              id="email"
                              value={formData.Email}
                              onChange={handleInputChange}
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
                              name="Senha"
                              id="senha"
                              value={formData.Senha}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <SelectMenu
                              options={sectors}
                              formLabel="Setores"
                              selected={selectedSector}
                              setSelected={setSelectedSector}
                            />
                          </div>
                          <div>
                            <SelectMenu
                              options={roles}
                              formLabel="Cargo"
                              selected={selectedRole}
                              setSelected={setSelectedRole}
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
                    onClick={handleSubmit}
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
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
