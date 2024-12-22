import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ContactsSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const groupedUsers = users.reduce((acc, user) => {
    if (!user.fullName) return acc;
    const firstLetter = user.fullName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  const filteredUsers = Object.keys(groupedUsers)
    .filter((letter) =>
      searchTerm === "" ||
      letter.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .sort()
    .reduce((acc, letter) => {
      acc[letter] = groupedUsers[letter].filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return acc;
    }, {});

  return (
    <div className="w-80 bg-[#303841] text-white flex flex-col p-5">
      <h1 className="text-xl font-semibold mb-4">Contacts</h1>
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
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
        {Object.keys(filteredUsers).length > 0 ? (
          Object.keys(filteredUsers).map((letter) => (
            <div key={letter} className="mb-8">
              <h2 className="text-lg font-semibold mb-2">{letter}</h2>
              <ul className="space-y-1 ml-2">
                {filteredUsers[letter].map((user) => (
                  <li
                    key={user._id}
                    c
                    className={`flex gap-5 items-center mb-5 cursor-pointer ${selectedUser?._id === user._id
                        ? "bg-gray-600 rounded-md p-2"
                        : ""
                      }`}
                  >
                    <div className="relative">
                      <img
                        src={
                          user.profilePic ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      {onlineUsers.includes(user._id) && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-[#303841]"></span>
                      )}
                    </div>
                    <p className="truncate">{user.fullName}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            {isUsersLoading ? "Loading users..." : "No users found"}
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactsSidebar;