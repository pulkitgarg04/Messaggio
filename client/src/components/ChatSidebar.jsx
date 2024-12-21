import { useState } from 'react'
import { Search } from 'lucide-react'

const users = [
  { id: 1, name: 'Pulkit Garg', avatar: 'https://avatar.iran.liara.run/public/boy', status: 'online' },
  { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/40?img=2', status: 'offline' },
  { id: 3, name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/40?img=3', status: 'online' },
  { id: 4, name: 'Alice Brown', avatar: 'https://i.pravatar.cc/40?img=4', status: 'offline' },
]

const activeUsers = [
  { name: "Pulkit", avatar: "https://avatar.iran.liara.run/public" },
  { name: "Rahul", avatar: "https://avatar.iran.liara.run/public" },
  { name: "Ishita", avatar: "https://avatar.iran.liara.run/public" },
  { name: "Aryan", avatar: "https://avatar.iran.liara.run/public" },
  { name: "Meera", avatar: "https://avatar.iran.liara.run/public" },
  // { name: "Meera", avatar: "https://avatar.iran.liara.run/public" },
];

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-80 bg-[#303841] text-white flex flex-col p-5">
      <h1 className="text-xl font-semibold mb-4">Chats</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

        <div
          className="overflow-x-auto
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar]:h-1
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-700
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-600 mt-4 px-2"
        >
          <div className="flex space-x-4">
            {activeUsers.map((user, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-700 rounded-md aspect-square px-3 py-1 mb-2"
              >
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full border border-gray-600"
                    src={user.avatar}
                    alt={`${user.name} avatar`}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                </div>
                <p className="text-white text-sm mt-2">{user.name}</p>
              </div>
            ))}
          </div>
        </div>

      <p className='mt-3 font-semibold'>Recent</p>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map(user => (
          <div key={user.id} className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">
                {user.status === 'online' ? 'Online' : 'Offline'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}