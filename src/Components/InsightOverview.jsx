import React from 'react';

// Function to generate JSX for revenue, admissions, and expenses
const generateData = (type, labels) => (
    <>
        {labels.map((label, index) => (
            <>
                <div key={index} className="text-center px-2">
                    <p className="text-xl 3xl:text-4xl text-[#2740CD] font-bold">
                        {type === 'expenses' || type === 'revenue' ? `$${label.amount}` : label.amount}
                    </p>
                    <p className="text-xs font-medium text-[#333333] text-nowrap">{label.text}</p>
                </div>
                {index < labels.length - 1 && <div><h1 className='text-xl'>|</h1> </div>}
            </>
        ))}
    </>
);

// Define a mapping object for different types of data
const dataMapping = {
    revenue: generateData('revenue', [
        { amount: 500, text: 'Daily Revenue' },
        { amount: 3500, text: 'Weekly Revenue' },
        { amount: 15000, text: 'Monthly Revenue' },
    ]),
    admissions: generateData('admissions', [
        { amount: 100, text: 'Daily Admissions' },
        { amount: 700, text: 'Weekly Admissions' },
        { amount: 2800, text: 'Monthly Admissions' },
    ]),
    expenses: generateData('expenses', [
        { amount: 200, text: 'Daily Expenses' },
        { amount: 1400, text: 'Weekly Expenses' },
        { amount: 4200, text: 'Monthly Expenses' },
    ]),
};

function InsightOverview({ type }) {
    // Use the type prop to look up the corresponding data in the mapping object
    const data = dataMapping[type] || <p>No data available</p>;

    return (
        <div className="flex flex-row gap-1 px-4 justify-center">
            {data}
        </div>
    );
}

export default InsightOverview;
