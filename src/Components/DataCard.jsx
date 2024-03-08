import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function DataCard({type, title, subTitle, tailData }) {

    const dots = type === 'admissions' ? true : false;
    const transactionsImg = type === 'transactions' ? 'https://www.kindpng.com/picc/m/471-4710522_money-icon-circle-hd-png-download.png' : null;
    const admissionImg = type === 'admissions' ? 'https://cdn-icons-png.freepik.com/512/10584/10584906.png' : null;
    const imageSrc = type === 'admissions' ? admissionImg : transactionsImg;
    
  return (
    <div className='bg-white py-8 rounded-xl mb-4 flex justify-between 2xl:ps-16 px-10 h-20'>
      <div className='flex flex-row justify-center items-center gap-5'>
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
        <h1 className='font-semibold text-lg'>{title}</h1>
        {subTitle && <h2 className='text-[#666666]'>{subTitle}</h2>}
      </div>
      <div className='flex justify-center items-center'>
        <h1 className='font-semibold text-lg'>{tailData}</h1>
      </div>
    </div>
 );
}

export default DataCard
