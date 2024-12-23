import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const { users, getRecentChats, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const recentChatsData = await getRecentChats();
        setRecentChats(recentChatsData);

        const nonChatUsers = users.filter(
          (user) =>
            !recentChatsData.some((chat) => chat._id === user._id) &&
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(nonChatUsers);
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      }
    };

    if (users.length > 0) {
      fetchRecentChats();
    }
  }, [getRecentChats, users, searchTerm]);

  const onlineUserDetails = onlineUsers
    .map((id) => users.find((user) => user._id === id))
    .filter((user) => user);

  return (
    <div className="w-80 bg-[#303841] text-white flex flex-col p-5">
      <h1 className="text-xl font-semibold mb-4">Chats</h1>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {onlineUserDetails.length > 0 && (
        <div className="mb-4">
          <div className="overflow-x-auto flex space-x-4">
            {onlineUserDetails.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center justify-center bg-gray-700 rounded-md px-3 py-1"
              >
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full border border-gray-600"
                    src={user.profilePic}
                    alt={`${user.fullName} avatar`}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                </div>
                <p className="text-sm mt-2 truncate">
                  {user.fullName.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-semibold text-lg mb-2">Recent Chats</h2>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {recentChats.length > 0 ? (
          recentChats.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedUser(chat)}
            >
              <img
                src={chat.profilePic}
                alt={chat.fullName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <h3 className="font-medium truncate">{chat.fullName}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage || "No messages"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No recent chats</p>
        )}
      </div>
    </div>
  );
}