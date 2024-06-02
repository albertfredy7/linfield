import React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

function MobileOverviewCard({
  item,
  title,
  subtitle,
  page,
  revenue,
  admissions,
  expenses,
  style = '', // Default value for style
}) {
  // Log the received props
  console.log('MobileOverviewCard props:', {
    item,
    title,
    subtitle,
    page,
    revenue,
    admissions,
    expenses,
    style,
  });

  // Check if item prop is provided
  if (item) {
    console.log('Rendering with item');
    return (
      <div className="w-full px-4">
        <div className="bg-[#2740CD] text-white p-4 rounded-3xl flex flex-col items-center justify-center">
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 items-center">
              {item.icon}
              <p className="text-lg font-semibold">{item.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If item is not provided but title and subtitle are, render them
  if (title && subtitle !== undefined && subtitle !== null) {
    console.log('Rendering with title and subtitle');
    return (
      <div className="w-full px-4">
        <div
          className={`bg-[#2740CD] text-white p-4 ${style} rounded-3xl flex flex-col items-center justify-center`}
        >
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <p className="text-lg md:text-sm font-semibold">{title}</p>
              <p className="text-lg md:text-sm font-semibold">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If page is 'home', render the relevant content
  if (page === 'home') {
    console.log('Rendering for home page');
    return (
      <div className="w-full px-4">
        <div className="bg-[#2740CD] text-white p-4 rounded-3xl flex flex-col items-center justify-center">
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 items-center">
              <MonetizationOnIcon />
              <p className="text-base font-semibold">₹ {revenue}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <SchoolIcon />
              <p className="text-md font-semibold">{admissions}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <RequestQuoteIcon />
              <p className="text-lg font-semibold">₹ {expenses}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If none of the above conditions are met, render null
  console.log('None of the conditions met, returning null');
  return null;
}

export default MobileOverviewCard;
