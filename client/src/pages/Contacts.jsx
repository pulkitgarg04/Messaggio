import MainSidebar from "../components/MainSidebar";
import ContactsSidebar from "../components/ContactsSidebar";
import ChatSection from "../components/ChatSection";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";

const Contacts = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen flex bg-gray-100 font-Poppins">
      <MainSidebar />
      <ContactsSidebar />
      {!selectedUser ? <NoChatSelected /> : <ChatSection />}
    </div>
  );
};

export default Contacts;
