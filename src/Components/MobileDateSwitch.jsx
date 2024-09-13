import React, { useState, useRef } from 'react';

// function MobileDateSwitch({ onSelectDateRange }) {
//     const [activeButton, setActiveButton] = useState('today');

//     const handleButtonClick = (button) => {
//         setActiveButton(button);
//         onSelectDateRange(button);
//     };

//     const handleInputFocus = () => {
//         if (inputRef.current) {
//             inputRef.current.type = 'date';
//         }
//     };

//     const handleInputBlur = () => {
//         if (inputRef.current) {
//             inputRef.current.type = 'text';
//         }
//     };

//     return (
//         <div className='flex flex-row gap-5  px-5'>
//             <button
//                 className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'today' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
//                 onClick={() => handleButtonClick('today')}
//             >
//                 Today
//             </button>
//             <button
//                 className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'thisWeek' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
//                 onClick={() => handleButtonClick('thisWeek')}
//             >
//                 Weekly
//             </button>
//             <button
//                 className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'thisMonth' ? 'bg-[#2740CD] text-white' : 'border border-[#767676]'}`}
//                 onClick={() => handleButtonClick('thisMonth')}
//             >
//                 Monthly
//             </button>
//             <input
//                 type="date"
//                 className={`p-2 text-xs sm:text-base rounded-xl ${activeButton === 'calendar' ? 'bg-[#2740CD] text-white' : 'border border-[#767676] bg-transparent'}`}
//                 placeholder="Select date"
//             />
//         </div>
//     );
// }

function MobileDateSwitch({ duration, onSelect }) {
   // Function to check if a string is a valid date
   const isValidDate = (value) => {
      // Create a new Date object from the input value
      const date = new Date(value);
      // Check if the date is valid
      return !isNaN(date.getTime());
   };

   return (
      <div className="flex flex-row gap-1 px-5 py-3">
         <button
            className={`py-2 px-3 3xl:py-3 3xl:px-5 text-xs sm:text-base lg:text-lg xl:text-sm 3xl:text-lg rounded-xl ${
               duration === 'today'
                  ? 'bg-[#2740CD] text-white'
                  : 'border border-[#767676]'
            }`}
            onClick={() => onSelect('today')}
         >
            Today
         </button>
         <button
            className={`py-2 px-3 3xl:py-3 3xl:px-5 text-xs sm:text-base lg:text-lg xl:text-sm 3xl:text-lg rounded-xl ${
               duration === 'this_week'
                  ? 'bg-[#2740CD] text-white'
                  : 'border border-[#767676]'
            }`}
            onClick={() => onSelect('this_week')}
         >
            Weekly
         </button>
         <button
            className={`py-2 px-3 3xl:py-3 3xl:px-5 text-xs sm:text-base lg:text-lg xl:text-sm 3xl:text-lg rounded-xl ${
               duration === 'this_month'
                  ? 'bg-[#2740CD] text-white'
                  : 'border border-[#767676]'
            }`}
            onClick={() => onSelect('this_month')}
         >
            Monthly
         </button>
         <input
            type="date"
            className={`py-2 px-3 3xl:py-3 3xl:px-5 text-xs sm:text-base lg:text-lg xl:text-sm 3xl:text-lg rounded-xl ${
               isValidDate(duration)
                  ? 'bg-[#2740CD] text-white'
                  : 'border border-[#767676] bg-transparent'
            }`}
            placeholder="Select date"
            onChange={(e) => onSelect(e.target.value)}
         />
      </div>
   );
}

export default MobileDateSwitch;
