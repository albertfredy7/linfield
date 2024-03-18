

import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function DataCard({type, title, subTitle, tailData, style }) {

    const dots = type === 'admissions' ? true : false;
    const imageMap = {
      transactions: 'https://www.kindpng.com/picc/m/471-4710522_money-icon-circle-hd-png-download.png',
      admissions: 'https://cdn-icons-png.freepik.com/512/10584/10584906.png',
      salary: 'https://cdn3.vectorstock.com/i/1000x1000/66/62/salary-vector-31396662.jpg',
      rent: 'https://static.vecteezy.com/system/resources/previews/031/066/791/non_2x/rent-house-icon-vector.jpg',
      stationary: 'https://static.vecteezy.com/system/resources/previews/024/140/802/non_2x/download-this-premium-icon-of-stationery-in-trendy-style-ready-to-use-vector.jpg',
      refreshment: 'https://static.vecteezy.com/system/resources/thumbnails/000/177/819/small_2x/Strawberry_Smoothies.jpg',
      electricity: 'https://cdn3.vectorstock.com/i/1000x1000/47/47/electricity-logo-electric-and-icon-vector-27184747.jpg',
      repair: 'https://icons.veryicon.com/png/o/education-technology/blue-gray-solid-blend-icon/repair-35.png',
      equipments: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsjz43Klf80GVH2i8KuQAGskpMSinx1rOZu1_zur0Iu5FYJT0Rbc1lCXW2cbGBm2uHXfw&usqp=CAU',
      miscallaneous: 'https://static.vecteezy.com/system/resources/previews/021/378/257/non_2x/expense-icon-vector.jpg',
  };
  
  const imageSrc = imageMap[type] || null;
  const hight = style && style.h ? style.h : null;
    
  return (
    <div className={`bg-white rounded-xl px-4 py-2 h-${hight ? hight : 'full'} w-full cursor-pointer hover:bg-slate-200`}>
      <div className='grid grid-cols-11 h-full w-full'>
        <div className={`col-span-3 h-full ${dots && 'flex items-center'}`}>
          {dots && (
            <MoreVertIcon />
          )}
          {imageSrc && (
          <div className={`w-full h-full flex justify-center items-center `}>
            < img className='h-12 lg:h-20 xl:h-10 3xl:h-16 rounded-full' src={imageSrc} alt="" />
          </div>
          )}
        </div>
        <div className='col-span-5 h-full  flex flex-col gap-0 justify-center items-center'>
          <h1 className='font-medium text-lg lg:text-2xl xl:text-sm 3xl:text-xl'>{title}</h1>
          {subTitle && <h2 className='text-[#666666] text-md lg:text-2xl xl:text-sm 3xl:text-xl'>{subTitle}</h2>}
        </div>
        <div className='col-span-3  h-full  flex justify-center items-center'>
          <h1 className='font-semibold text-lg lg:text-2xl xl:text-sm 3xl:text-md'>{tailData}</h1>
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




