import React, { useState, useRef } from 'react';

function MobileDateSwitch({ onSelectDateRange }) {
    const [activeButton, setActiveButton] = useState('today');

    const handleButtonClick = (button) => {
        setActiveButton(button);
        onSelectDateRange(button);
    };

    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.type = 'date';
        }
    };

    const handleInputBlur = () => {
        if (inputRef.current) {
            inputRef.current.type = 'text';
        }
    };

    return (
        <div className='flex flex-row gap-5  px-5'>
            <button 
                className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'today' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('today')}
            >
                Today
            </button>
            <button 
                className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'thisWeek' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('thisWeek')}
            >
                Weekly
            </button>
            <button 
                className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'thisMonth' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
                onClick={() => handleButtonClick('thisMonth')}
            >
                Monthly
            </button>
            <input
                type="date"
                className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'calendar' ? 'bg-[#2740CD] text-white' : 'border border-[#767676] bg-transparent'}`}
                placeholder="Select date"
            />
        </div>
    );
}

export default MobileDateSwitch;
