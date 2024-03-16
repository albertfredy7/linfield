// OverviewCard.js

import { useMediaQuery } from '@mui/material';
import React from 'react';


function OverviewCard( data ) {

  const isMobileScreen = useMediaQuery('(max-width: 767px)'); // Detect mobile screen size
  if(isMobileScreen){
    return null
  }
  return (
    <div className='w-full px-4 '>
      <div className='bg-[#2740CD] text-white  p-2 md:py-8 2xl:py-14 2xl:px-10  rounded-3xl flex flex-col items-center justify-center'>
        <h2 className='text-md md:text-sm  font-medium text-nowrap'>{data.title}</h2>
        <p className='text-3xl font-bold'>₹ {data.value}</p>
      </div>
    </div>
  );
}

export default OverviewCard;
