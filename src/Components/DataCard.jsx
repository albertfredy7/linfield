import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';

function DataCard({ type, title, subTitle, tailData, style }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

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
  console.log(imageSrc)
  const height = style && style.h ? style.h : null;

  const openModal = (event) => {
    setModalOpen(true);
    const dotRect = event.target.getBoundingClientRect();
    setDotPosition({
      x: dotRect.left,
      y: dotRect.top,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={`relative bg-white rounded-xl px-4 py-2 h-${height ? height : 'full'} w-full cursor-pointer hover:bg-slate-200`}>
      <div className="grid grid-cols-11 h-full w-full">
        <div className={`col-span-3 h-full ${dots && 'flex items-center'}`} onClick={openModal}>
          {dots && <MoreVertIcon />}
          {imageSrc && (
            <div className={`w-full h-full flex justify-center items-center `}>
              <img className='h-10 md:h-12 lg:h-20 xl:h-10 3xl:h-16 rounded-full' src={imageSrc} alt="" />
            </div>
          )}
        </div>
        <div className='col-span-5 h-full  flex flex-col gap-0 justify-center items-center'>
          <h1 className='font-medium text-sm md:text-lg lg:text-2xl xl:text-sm 3xl:text-xl'>{title}</h1>
          {subTitle && <h2 className='text-[#666666] text-sm md:text-md lg:text-2xl xl:text-sm 3xl:text-xl'>{subTitle}</h2>}
        </div>
        <div className='col-span-3  h-full  flex justify-center items-center'>
          <h1 className='font-medium text-sm md:text-lg lg:text-2xl xl:text-sm 3xl:text-xl'>{tailData}</h1>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-65 z-40"
            onClick={closeModal}
          >
          <div className="absolute flex flex-col bg-white rounded-lg p-6 shadow-md z-50" style={{ top: dotPosition.y - 54, left: dotPosition.x }}>
            <button className="w-full flex justify-between border-b-2 pb-2" onClick={closeModal}>Edit student <EditIcon style={{ color: '#93e9be' }} /></button>
            <button className="w-full flex justify-between gap-4 border-b-2 py-3" onClick={closeModal}>Mark as passed <SchoolIcon style={{ color: '#5390d9' }} /></button>
            <button className="w-full flex justify-between  pt-2" onClick={closeModal}>Mark as failed <NotInterestedOutlinedIcon style={{ color: '#ad2829' }} /></button>
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DataCard;
