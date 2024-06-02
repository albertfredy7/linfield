// SeachBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-11 sm:h-14 md:h-14 xl:h-11  3xl:h-14 flex ">
        <input
          className="block w-full p-3 leading-5 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base placeholder:text-sm sm:text-sm xl:text-sm 3xl:text-lg"
          placeholder="Enter admission number"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Add this line
        />
        <div
          className="absolute inset-y-0 right-1 flex items-center p-0"
          onClick={handleSearch}
        >
          <svg
            className="w-12 h-7 sm:h-9 md:h-9 3xl:h-10 text-white bg-blue-600 p-2 rounded-2xl"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
