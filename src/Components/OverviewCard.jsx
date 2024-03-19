import { useMediaQuery } from '@mui/material';
import React from 'react';

function OverviewCard({title, value, style}) {
  const isMobileScreen = useMediaQuery('(max-width: 767px)'); // Detect mobile screen size

  let hight = style && style.h ? style.h : 'full'

  if (isMobileScreen) {
    return null;
  }

  return (
    <div className={`w-full px-4 h-${hight}`}>
      <div className={`h-full bg-[#2740CD] text-white p-2 ${style} rounded-3xl flex flex-col items-center justify-center`}>
        <h2 className='text-md md:text-md xl:text-lg 3xl:text-2xl font-medium text-nowrap'>{title}</h2>
        <p className='text-2xl font-bold'>₹ {value}</p>
      </div>
    </div>
  );
}

export default OverviewCard;
