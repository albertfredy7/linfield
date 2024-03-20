import React, { useState } from 'react';

function MobileDateSwitch({ onSelectDateRange }) {
    const [activeButton, setActiveButton] = useState('today');

    // Function to handle button click and set the active button
    const handleButtonClick = (button) => {
        setActiveButton(button);
        onSelectDateRange(button);
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
            {/* <button 
                className={`rounded-2xl p-2 sm:p-2 xl:px-5 text-xs md:text-base lg:text-lg xl:text-sm 3xl:text-lg ${activeButton === 'calendar' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('calendar')}
            >
                Calendar
            </button> */}
            <input
                type="date"
                id="date"
                className={`rounded-xl cursor-pointer p-2 sm:p-2 xl:px-3 text-xs md:text-base lg:text-lg xl:text-sm 3xl:text-lg  ${activeButton === 'calendar' ? 'bg-[#2740CD] text-white' : 'border border-[#767676] bg-[#f0f0f0]'}`}
                required
                placeholder="Select date"
                onClick={() => handleButtonClick('calendar')}
            />
        </div>
    );
}

export default MobileDateSwitch
