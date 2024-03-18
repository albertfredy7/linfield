import React, { useState } from 'react';

function DatePicker() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

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
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + change, 1));
    };
    return (
        <div className="bg-white py-3 px-3 rounded-lg w-full h-full">
            <div className="flex items-center justify-between">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500">&lt;</button>
                {/* Reduced text size */}
                <h2 className="text-sm 3xl:text-lg font-semibold text-gray-800">
                    {currentDate.toLocaleString('default', { month: 'short' })} {currentDate.getFullYear()}
                </h2>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500">&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-sm 3xl:text-lg">
                
                <div className="p-2 text-center font-medium text-gray-700">Mon</div>
                <div className="p-2 text-center font-medium text-gray-700">Tue</div>
                <div className="p-2 text-center font-medium text-gray-700">Wed</div>
                <div className="p-2 text-center font-medium text-gray-700">Thu</div>
                <div className="p-2 text-center font-medium text-gray-700">Fri</div>
                <div className="p-2 text-center font-medium text-gray-700">Sat</div>
                <div className="p-2 text-center font-medium text-gray-700">Sun</div>
                {generateDaysArray().map((day, index) => {
                    const isToday = day && new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === new Date().toDateString();
                    return (
                        <div key={index} className={`p-2 text-center text-sm 3xl:text-lg ${isToday ? 'bg-blue-500 text-white rounded-full' : 'text-gray-600'}`}>
                            {day || '-'}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default DatePicker;