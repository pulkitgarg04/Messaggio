import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MessageInput from "./MessageInput";

function Message({ isSender, text, avatarSrc, createdAt }) {
    return (
        <div className={`flex mb-4 cursor-pointer ${isSender ? "justify-end" : ""}`}>
            {!isSender && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <img src={avatarSrc} alt="User Avatar" className="w-8 h-8 rounded-full" />
                </div>
            )}
            <div
                className={`flex flex-col max-w-[75%] ${isSender ? "bg-gray-700" : "bg-indigo-400"
                    } rounded-lg p-3 text-white`}
            >
                {text && <p className="mb-1">{text}</p>}
                <time className="text-xs opacity-50 text-right">
                    {formatMessageTime(createdAt)}
                </time>
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
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
            subscribeToMessages();

            return () => unsubscribeFromMessages();
        }
    }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!selectedUser) return null;

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <header className="p-4 flex justify-between">
                    <h1 className="text-xl font-bold">Loading...</h1>
                </header>
            </div>
        );
    }

    const sortedMessages = [...messages].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return (
        <div className="flex flex-col h-screen w-full bg-[#262E35] text-white">
            <header className="p-4 flex justify-between">
                <div className="flex items-center">
                    <img
                        className="w-9 h-9 rounded-full"
                        src={selectedUser.profilePic}
                        alt="Avatar"
                    />
                    <h1 className="ml-5 text-2xl font-semibold">
                        {selectedUser.fullName}
                    </h1>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-140px)]">
                {sortedMessages.map((msg) => (
                    <Message
                        key={msg._id}
                        isSender={msg.senderId === authUser._id}
                        text={msg.text}
                        avatarSrc={
                            msg.senderId === authUser._id
                                ? authUser.profilePic
                                : selectedUser.profilePic
                        }
                        createdAt={msg.createdAt}
                    />
                ))}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
}

export default ChatSection;