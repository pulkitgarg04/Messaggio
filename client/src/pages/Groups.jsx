import MainSidebar from "../components/MainSidebar";
import GroupsSidebar from "../components/GroupsSidebar";
import ChatSection from "../components/ChatSection";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";

const Groups = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen flex bg-gray-100 font-Poppins">
      <MainSidebar />
      <GroupsSidebar />
      {!selectedUser ? <NoChatSelected /> : <ChatSection />}
    </div>
  );
};

export default Groups;