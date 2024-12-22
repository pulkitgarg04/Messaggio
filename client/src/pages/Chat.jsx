import MainSidebar from "../components/MainSidebar";
import ChatSidebar from "../components/ChatSidebar";
import ChatSection from "../components/ChatSection";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";

const ChatApp = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex bg-gray-100 font-Poppins">
      <MainSidebar />
      <ChatSidebar />
      {!selectedUser ? <NoChatSelected /> : <ChatSection />}
    </div>
  );
};

export default ChatApp;