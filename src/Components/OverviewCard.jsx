import { useMediaQuery } from '@mui/material';
import React from 'react';

function OverviewCard({ title, value, style, number, totalAdmission }) {
  const isMobileScreen = useMediaQuery('(max-width: 767px)'); // Detect mobile screen size
  console.log(totalAdmission);

  let hight = style && style.h ? style.h : 'full';

  if (isMobileScreen) {
    return null;
  }

  return (
    <div className={`w-full px-4 h-${hight}`}>
      <div
        className={`h-full bg-[#2740CD] text-white p-2 ${style} rounded-3xl flex flex-col items-center justify-center`}
      >
        <h2 className="text-md md:text-lg lg:text-2xl xl:text-lg 3xl:text-3xl font-medium text-nowrap">
          {title}
        </h2>
        <p className="text-2xl lg:text-3xl xl:text-2xl 3xl:text-3xl font-bold text-white">
          {number ? number : `₹ ${value}`}
        </p>
      </div>
    </div>
  );
}

export default OverviewCard;
