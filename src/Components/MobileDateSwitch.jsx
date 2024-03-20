import React, { useState, useRef } from 'react';

function MobileDateSwitch({ onSelectDateRange }) {
    const [activeButton, setActiveButton] = useState('today');

    // Function to handle button click and set the active button
    const handleButtonClick = (button) => {
        setActiveButton(button);
        onSelectDateRange(button);
    };

    // Function to handle input focus and blur
    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.type = 'date'; // Accessing inputRef.current to change type
        }
    };

    const handleInputBlur = () => {
        if (inputRef.current) {
            inputRef.current.type = 'text'; // Accessing inputRef.current to change type
        }
    };

    return (
        <div className='flex flex-row gap-3.5 px-2 xl:px-0 py-4 md:py-4'>
            <button 
                className={`rounded-xl p-2 sm:p-2 xl:px-5 text-xs md:text-base lg:text-lg xl:text-sm 3xl:text-lg ${activeButton === 'today' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('today')}
            >
                Today
            </button>
            <button 
                className={`rounded-xl p-2 sm:p-2 xl:px-5 text-xs md:text-base lg:text-lg xl:text-sm 3xl:text-lg ${activeButton === 'thisWeek' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('thisWeek')}
            >
                Weekly
            </button>
            <button 
                className={`rounded-xl p-2 sm:p-2 xl:px-5 text-xs md:text-base lg:text-lg xl:text-sm 3xl:text-lg ${activeButton === 'thisMonth' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('thisMonth')}
            >
                Monthly
            </button>
            <input
                type="date"
                className={`rounded-xl cursor-pointer p-2 sm:p-2 xl:px-3 text-xs md:text-base lg:text-lg xl:text-sm 3xl:text-lg  ${activeButton === 'calendar' ? 'bg-[#2740CD] text-white' : 'border border-[#767676] bg-[#f0f0f0]'}`}
                placeholder="Select date"
                
                
            />
        </div>
    );
}

export default MobileDateSwitch;
