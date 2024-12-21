import MainSidebar from "../components/MainSidebar";
import ContactsSidebar from "../components/ContactsSidebar";
import ChatSection from "../components/ChatSection";

const Contacts = () => {
  return (
    <div className="h-screen flex bg-gray-100 font-Poppins">
      <MainSidebar />
      <ContactsSidebar />
      <ChatSection />
    </div>
  );
};

export default Contacts;
