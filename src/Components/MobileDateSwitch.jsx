import React, { useState } from 'react';

function MobileDateSwitch() {
    const [activeButton, setActiveButton] = useState('today');

    // Function to handle button click and set the active button
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div className='flex flex-row gap-4 p-2 sm:p-3 '>
            <button 
                className={`rounded-2xl p-2 sm:p-2 text-xs ${activeButton === 'today' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('today')}
            >
                Today
            </button>
            <button 
                className={`rounded-2xl p-2 sm:p-2 text-xs ${activeButton === 'thisWeek' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('thisWeek')}
            >
                This Week
            </button>
            <button 
                className={`rounded-2xl p-2 sm:p-2 text-xs ${activeButton === 'thisMonth' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('thisMonth')}
            >
                This Month
            </button>
            <button 
                className={`rounded-2xl p-2 sm:p-2 text-xs ${activeButton === 'calendar' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('calendar')}
            >
                Calendar
            </button>
        </div>
    );
}

export default MobileDateSwitch
