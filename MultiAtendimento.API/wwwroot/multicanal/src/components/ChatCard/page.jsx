import React from 'react';

const ChatCard = ({ chat, onClick }) => {
    return (
        <li 
            key={chat.id} 
            className="flex justify-between gap-x-6 py-5 cursor-pointer" 
            onClick={() => onClick(chat)}
        >
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{chat.cliente}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{chat.ultimaMensagem}</p>
                </div>
            </div>
        </li>
    );
};

export default ChatCard;
