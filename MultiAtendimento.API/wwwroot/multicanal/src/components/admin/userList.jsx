import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

// Receber da API
const users = [
    {
        Nome: 'Leslie Alexander',
        Email: 'leslie.alexander@example.com',
        cargo: 'Admninstrador',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        setor: 'Administrativo'
    },
    {
        Nome: 'Michael Foster',
        Email: 'michael.foster@example.com',
        cargo: 'Atendente',
        imageUrl: '',
        setor: 'Suporte'
    }
];



export default function UserList() {
    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
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
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{user.cargo}</p>
                                <p className="text-sm leading-6 text-gray-900">{user.setor}</p>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
