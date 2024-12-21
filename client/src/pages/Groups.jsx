import MainSidebar from "../components/MainSidebar";
import GroupsSidebar from "../components/GroupsSidebar";
import ChatSection from "../components/ChatSection";

const Groups = () => {
  return (
    <div className="h-screen flex bg-gray-100 font-Poppins">
      <MainSidebar />
      <GroupsSidebar />
      <ChatSection />
    </div>
  );
};

export default Groups;