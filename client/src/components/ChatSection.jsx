import { useState, useEffect } from 'react';
import { SendHorizontal, Paperclip, SmilePlus } from "lucide-react";

const mockUsers = [
    { _id: '1', firstName: 'Alice', lastName: 'Johnson', avatar: 'https://avatar.iran.liara.run/public/girl' },
    { _id: '2', firstName: 'Bob', lastName: 'Smith', avatar: 'https://avatar.iran.liara.run/public/boy' },
    { _id: '3', firstName: 'Charlie', lastName: 'Brown', avatar: 'https://avatar.iran.liara.run/public/boy' },
    { _id: '4', firstName: 'Diana', lastName: 'Carter', avatar: 'https://avatar.iran.liara.run/public/girl' },
];

function Message({ isSender, text, avatarSrc }) {
    return (
        <div className={`flex mb-4 cursor-pointer ${isSender ? 'justify-end' : ''}`}>
            {!isSender && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <img src={avatarSrc} alt="User Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
            <div className={`flex flex-wrap max-w-96 ${isSender ? 'bg-gray-700' : 'bg-indigo-400'} rounded-lg p-3 gap-3 text-white`}>
                <p>{text}</p>
            </div>
            {isSender && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center ml-2">
                    <img src={avatarSrc} alt="My Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
        </div>
    );
}

function ChatSection() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        setSelectedUser(randomUser);

        if (randomUser) {
            setMessages([
                { isSender: false, text: `Hey ${randomUser.firstName}, how's it going?`, avatarSrc: randomUser.avatar },
                { isSender: true, text: "Hi! I'm doing great! Just finished a project, feeling good. 😊", avatarSrc: 'https://avatar.iran.liara.run/public/boy' },
                { isSender: false, text: "That's awesome! What's it about?", avatarSrc: randomUser.avatar },
                { isSender: true, text: "It's a new feature for our app, improving chat experience!", avatarSrc: 'https://avatar.iran.liara.run/public/boy' },
                { isSender: false, text: `Hey ${randomUser.firstName}, how's it going?`, avatarSrc: randomUser.avatar },
                { isSender: true, text: "Hi! I'm doing great! Just finished a project, feeling good. 😊", avatarSrc: 'https://avatar.iran.liara.run/public/boy' },
                { isSender: false, text: "That's awesome! What's it about?", avatarSrc: randomUser.avatar },
                { isSender: true, text: "It's a new feature for our app, improving chat experience!", avatarSrc: 'https://avatar.iran.liara.run/public/boy' },
                { isSender: false, text: `Hey ${randomUser.firstName}, how's it going?`, avatarSrc: randomUser.avatar },
                { isSender: true, text: "Hi! I'm doing great! Just finished a project, feeling good. 😊", avatarSrc: 'https://avatar.iran.liara.run/public/boy' },
                { isSender: false, text: "That's awesome! What's it about?", avatarSrc: randomUser.avatar },
                { isSender: true, text: "It's a new feature for our app, improving chat experience!", avatarSrc: 'https://avatar.iran.liara.run/public/boy' },
            ]);
        }
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages((prev) => [
                ...prev,
                { isSender: true, text: newMessage, avatarSrc: 'https://avatar.iran.liara.run/public/boy' }
            ]);
            setNewMessage("");
        }
    };

    if (!selectedUser) return null;

    return (
        <div className="flex flex-col h-screen w-full bg-[#262E35] text-white">
            <header className="p-4 flex justify-between">
                <div className="flex justify-center items-center">
                    <img className="w-9 h-9 rounded-full self-center" src={selectedUser.avatar} alt="avatar" />
                    <h1 className="ml-5 text-2xl font-semibold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h1>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-140px)]">
                {messages.map((msg, index) => (
                    <Message key={index} isSender={msg.isSender} text={msg.text} avatarSrc={msg.avatarSrc} />
                ))}
            </div>

            <footer className="p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full bg-gray-700 ml-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        className="p-2 ml-2 rounded-md border border-transparent bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        <SmilePlus size={20}/>
                    </button>
                    <button
                        className="p-2 ml-2 rounded-md border border-transparent bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        <Paperclip size={20}/>
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className="p-2.5 ml-2 rounded-lg border border-transparent bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        <SendHorizontal size={20}/>
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default ChatSection;