import React from 'react';
import ChatCard from '../ChatCard/page.jsx';

const ChatList = ({ chats, onChatClick }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {chats.map((chat) => (
                <ChatCard key={chat.id} chat={chat} onClick={onChatClick} />
            ))}
        </ul>
    );
};

export default ChatList;
