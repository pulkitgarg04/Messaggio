import { useState } from 'react';
import { Search } from 'lucide-react';

function ContactsSidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { name: 'Alice' },
    { name: 'Amanda' },
    { name: 'Bob' },
    { name: 'Bella' },
    { name: 'Charlie' },
    { name: 'David' },
    { name: 'Diana' },
    { name: 'Elina' },
    { name: 'Paras' },
    { name: 'Pulkit' },
    { name: 'Raghav' },
    { name: 'Ujjwal' },
    { name: 'Zeth' },
  ];

  const groupedUsers = users.reduce((acc, user) => {
    const firstLetter = user.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user.name);
    return acc;
  }, {});

  const filteredUsers = Object.keys(groupedUsers)
    .filter((letter) => 
      searchTerm === '' || letter.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .sort()
    .reduce((acc, letter) => {
      acc[letter] = groupedUsers[letter].filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar]:h-1
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-700
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-600">
        {Object.keys(filteredUsers).map((letter) => (
          <div key={letter} className="mb-8">
            <h2 className="text-lg font-semibold mb-2">{letter}</h2>
            <ul className="space-y-1 ml-2">
              {filteredUsers[letter].map((name, idx) => (
                <li key={idx} className="text-gray-300">
                  <div className='flex gap-5 items-center mb-5'>
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar" className='w-8 h-8' />
                    <p className='truncate'>{name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsSidebar;