import React, { useState } from 'react';

function ButtonGroup() {
    const [selectedButton, setSelectedButton] = useState('revenue');

    const handleClick = (button) => {
        setSelectedButton(button);
    };
    return (
        <div className="flex flex-col w-full">
            <div className="bg-white rounded-l-2xl rounded-r-2xl">
            <div className="flex flex-row gap-0 w-full">
                <button
                    className={`px-4 py-2 lg:py-3 w-full text-sm lg:text-lg xl:text-lg   focus:outline-none rounded-l-2xl ${selectedButton === 'revenue' ? 'bg-[#2740CD] text-white rounded-2xl px-6' : 'bg-white text-gray-600'}`}
                    onClick={() => handleClick('revenue')}
                >
                    Revenue
                </button>
                <button
                    className={`px-4 py-2 lg:py-3 w-full text-sm lg:text-lg xl:text-lg  focus:outline-none ${selectedButton === 'admissions' ? 'bg-[#2740CD] text-white rounded-2xl px-6' : 'bg-white text-gray-600'}`}
                    onClick={() => handleClick('admissions')}
                >
                    Admissions
                </button>
                <button
                    className={`px-4 py-2 lg:py-3 w-full text-sm lg:text-lg xl:text-lg focus:outline-none rounded-r-2xl ${selectedButton === 'expenses' ? 'bg-[#2740CD] text-white rounded-2xl px-6' : 'bg-white text-gray-600'}`}
                    onClick={() => handleClick('expenses')}
                >
                    Expenses
                </button>
            </div>
            </div>

           
        </div>
    )
}

export default ButtonGroup;
