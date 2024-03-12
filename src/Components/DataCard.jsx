

import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function DataCard({type, title, subTitle, tailData, style }) {

    const dots = type === 'admissions' ? true : false;
    const transactionsImg = type === 'transactions' ? 'https://www.kindpng.com/picc/m/471-4710522_money-icon-circle-hd-png-download.png' : null;
    const admissionImg = type === 'admissions' ? 'https://cdn-icons-png.freepik.com/512/10584/10584906.png' : null;
    const imageSrc = type === 'admissions' ? admissionImg : transactionsImg;
    const hight = style && style.h ? style.h : null
    
  return (
    <div className={`bg-white rounded-xl px-4 h-${hight ? hight : 'full'} w-full cursor-pointer hover:bg-slate-200`}>
      <div className='grid grid-cols-11 h-full w-full'>
        <div className={`col-span-3 h-full ${dots && 'flex items-center'}`}>
          {dots && (
            <MoreVertIcon />
          )}
          {imageSrc && (
          <div className={`w-full h-full flex justify-center items-center `}>
            < img className='h-12 lg:h-14 xl:h-10 3xl:h-14 rounded-full' src={imageSrc} alt="" />
          </div>
          )}
        </div>
        <div className='col-span-5 h-full  flex flex-col gap-0 justify-center items-center'>
          <h1 className='font-semibold text-md lg:text-lg xl:text-sm 3xl:text-md'>{title}</h1>
          {subTitle && <h2 className='text-[#666666] text-md lg:text-lg xl:text-sm 3xl:text-md'>{subTitle}</h2>}
        </div>
        <div className='col-span-3  h-full  flex justify-center items-center'>
          <h1 className='font-semibold text-sm lg:text-md 3xl:text-md'>{tailData}</h1>
        </div>
      </div>
      {/* <div className='flex flex-row justify-center items-center gap-5 bg-pink-200'>
        {dots && (
          <div>
            <MoreVertIcon />
          </div>
        )}
        {imageSrc && (
          <img className='w-16 bg-blend-overlay rounded-full' src={imageSrc} alt="" />
        )}
      </div>
      <div className='flex flex-col gap-0 justify-center  w-1/2 items-start'>
        <h1 className='font-semibold text-xl'>{title}</h1>
        {subTitle && <h2 className='text-[#666666] text-lg'>{subTitle}</h2>}
      </div>
      <div className='flex justify-center items-center'>
        <h1 className='font-semibold text-xl'>{tailData}</h1>
      </div> */}
    </div>
 );
}

export default DataCard
