import React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';



function MobileOverviewCard({ item, title, subtitle, page, revenue, admissions, expenses }) {
    // Check if item prop is provided
    if (item) {
        return (
            <div className='w-full px-4 '>
                <div className='bg-[#2740CD] text-white p-4 rounded-3xl flex flex-col items-center justify-center'>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-1 items-center '>
                            {item.icon}
                            <p className='text-lg font-semibold'>{item.subtitle}</p>
                        </div>
                    </div>
                </div>
                </div>
            
        );
    } else if (title && subtitle) {
        // If item is not provided but title and subtitle are, render them
        return (
            <div className='w-full px-4 '>
                <div className='bg-[#2740CD] text-white p-4 rounded-3xl flex flex-col items-center justify-center'>
                    <div className='flex gap-10'>
                        <div className='flex flex-col items-center '>
                            <p className='text-sm font-semibold'>{title}</p>
                            <p className='text-sm font-semibold'>{subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if(page === 'home'){
        return (
            <div className='w-full px-4 '>
                <div className='bg-[#2740CD] text-white p-4 rounded-3xl flex flex-col items-center justify-center'>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-1 items-center '>
                            <MonetizationOnIcon />
                            <p className='text-md font-semibold'>{revenue}</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center '>
                            <SchoolIcon />
                            <p className='text-md font-semibold'>{admissions}</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center '>
                            <RequestQuoteIcon />
                            <p className='text-lg font-semibold'>{expenses}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
     else {
        // If neither item nor title and subtitle are provided, render a default message or return null
        return null;
    }

    
}

export default MobileOverviewCard
