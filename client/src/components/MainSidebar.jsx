import { useState, useEffect, useRef } from "react";
import { MessageSquare, Users, MessageSquareDot, ContactRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function MainSidebar() {
    const [selectedChat, setSelectedChat] = useState("Chats");
    const [isLogoutMenuOpen, setLogoutMenuOpen] = useState(false);
    const logoutMenuRef = useRef(null);
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target)) {
                setLogoutMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="w-20 bg-[#36404A] text-white flex flex-col justify-between py-6 items-center z-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center mb-4">
                <MessageSquareDot className="text-indigo-100" size={28} />
            </div>

            <div className="flex-grow flex flex-col justify-center items-center space-y-8">
                <Link to="/chat">
                    <div className="relative group">
                        <button
                            className={`p-2 rounded-md ${selectedChat === "Chats" ? "bg-gray-700" : ""
                                }`}
                            onClick={() => setSelectedChat("Chats")}
                        >
                            <MessageSquare size={24} />
                        </button>
                        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-700 text-white text-md rounded-md px-2 py-1">
                            Chats
                        </div>
                    </div>
                </Link>

                <Link to="/chat/group">
                    <div className="relative group">
                        <button
                            className={`p-2 rounded-md ${selectedChat === "Groups" ? "bg-gray-700" : ""
                                }`}
                            onClick={() => setSelectedChat("Groups")}
                        >
                            <Users size={24} />
                        </button>
                        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-700 text-white text-md rounded-md px-2 py-1">
                            Groups
                        </div>
                    </div>
                </Link>

                <Link to="/chat/contacts">
                    <div className="relative group">
                        <button
                            className={`p-2 rounded-md ${selectedChat === "Contacts" ? "bg-gray-700" : ""
                                }`}
                            onClick={() => setSelectedChat("Contacts")}
                        >
                            <ContactRound size={24} />
                        </button>
                        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-700 text-white text-md rounded-md px-2 py-1">
                            Contacts
                        </div>
                    </div>
                </Link>
            </div>

            <div className="relative" ref={logoutMenuRef}>
                <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer"
                    onClick={() => setLogoutMenuOpen(!isLogoutMenuOpen)}
                >
                    <img
                        src={authUser.profilePic || "https://avatar.iran.liara.run/public"}
                        alt="avatar"
                        className="rounded-full"
                    />
                </div>

                {isLogoutMenuOpen && (
                    <div className="absolute bottom-0 left-14 bg-gray-800 text-white rounded-md shadow-lg w-28">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => setLogoutMenuOpen(false)}
                        >
                            Profile
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => setLogoutMenuOpen(false)}
                        >
                            Settings
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainSidebar;