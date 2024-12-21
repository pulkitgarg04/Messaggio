import { useState } from "react";
import MainSidebar from "../components/MainSidebar";
import ChatSidebar from "../components/ChatSidebar";
import ChatSection from "../components/ChatSection";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState("Chats");

  return (
    <div className="h-screen flex bg-gray-100 font-Poppins">
      <MainSidebar />
      <ChatSidebar />
      <ChatSection />
    </div>
  );
};

export default ChatApp;