import { useState } from 'react';
import { Search } from 'lucide-react';

function GroupsSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const groups = [
    { name: 'General' },
    { name: 'Reporting' },
    { name: 'Designers' },
    { name: 'Developers' },
    { name: 'Project-Alpha' },
    { name: 'Snacks' },
  ];

  const filteredGroups = groups.filter((group) =>
    searchTerm === '' || group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 bg-[#303841] text-white flex flex-col p-5">
      <h1 className="text-xl font-semibold mb-4">Public Groups</h1>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search groups..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div
        className="overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-700
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-600"
      >
        {filteredGroups.map((group, idx) => (
          <div key={idx} className="flex gap-4 items-center mb-5">
            <div
              className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold"
              title={group.name}
            >
              {group.name[0]}
            </div>
            <p className="truncate">{group.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupsSidebar;