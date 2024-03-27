import React, { useState } from 'react';

function DatePicker() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const generateDaysArray = () => {
    const daysArray = [];
    for (let i = 1; i <= daysInMonth + firstDayOfMonth - 1; i++) {
      if (i < firstDayOfMonth) {
        daysArray.push('');
      } else {
        daysArray.push(i - firstDayOfMonth + 1);
      }
    }
    return daysArray;
  };

  const changeMonth = (change) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + change, 1)
    );
  };
  return (
    <div className="bg-white 3xl:py-3 4xl:py-6 px-3 rounded-lg w-full h-full flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className=" rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        >
          &lt;
        </button>
        {/* Reduced text size */}
        <h2 className="text-sm 3xl:text-lg font-semibold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'short' })}{' '}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className=" rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-sm 3xl:text-lg">
        <div className="px-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Mon
        </div>
        <div className="p-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Tue
        </div>
        <div className="p-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Wed
        </div>
        <div className="p-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Thu
        </div>
        <div className="p-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Fri
        </div>
        <div className="p-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Sat
        </div>
        <div className="p-2 py-0 3xl:py-2 4xl:py-3 text-center font-medium text-gray-700">
          Sun
        </div>
        {generateDaysArray().map((day, index) => {
          const isToday =
            day &&
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            ).toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              className={`p-1 3xl:p-2 4xl:p-3 text-center text-sm 3xl:text-lg ${
                isToday
                  ? 'bg-blue-500 text-white rounded-full'
                  : 'text-gray-600'
              }`}
            >
              {day || '-'}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DatePicker;
