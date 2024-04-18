import React from 'react'

function SwitchButton({ category, onSelect }) {
    const categories = ['personal details', 'academic details', 'subjects & assignments', 'fee details'];
  return (
    <div className="w-full md:w-full xl:w-full h-full  grid grid-cols-4 bg-white rounded-l-xl rounded-r-xl ">
    {categories.map((cat) => (
      <button
        key={cat}
        className={`col-span-1 rounded-xl text-sm md:text-md lg:text-sm xl:text-base 3xl:text-xl py-5 px-0 text-wrap ${
          category === cat ? 'bg-[#2740CD] text-white' : ''
        }`}
        onClick={() => onSelect(cat)}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/ /g, ' ')}
      </button>
    ))}
  </div>
  )
}

export default SwitchButton