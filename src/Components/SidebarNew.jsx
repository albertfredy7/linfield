import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import nishad from '../assets/nishad.jpeg';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';

function SidebarNew() {
    const location = useLocation();
  const isTabletScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1024px)'
  );
  const isMobileScreen = useMediaQuery('(max-width: 767px)'); // Detect mobile screen size

  const navigationItems = [
    {
      to: '/',
      icon: <HomeIcon fontSize={isTabletScreen ? 'large' : 'medium'} />,
      text: 'Home',
    },
    {
      to: '/insights',
      icon: <InsightsIcon fontSize={isTabletScreen ? 'large' : 'medium'} />,
      text: 'Insights',
    },
    {
      to: '/expense',
      icon: <AttachMoneyIcon fontSize={isTabletScreen ? 'large' : 'medium'} />,
      text: 'Expense Tracker',
    },
    {
      to: '/add',
      icon: (
        <PersonAddAlt1Icon fontSize={isTabletScreen ? 'large' : 'medium'} />
      ),
      text: 'Add Student',
    },
    {
      to: '/modify',
      icon: <EditNoteIcon fontSize={isTabletScreen ? 'large' : 'medium'} />,
      text: 'Modify Student',
    },
    {
      to: '/filter',
      icon: <FilterAltIcon fontSize={isTabletScreen ? 'large' : 'medium'} />,
      text: 'Filter Student',
    },
    {
      to: '/teacherId',
      icon: (
        <SensorOccupiedIcon fontSize={isTabletScreen ? 'large' : 'medium'} />
      ),
      text: 'Create Teacher',
    },
    {
      to: '/updatefee',
      icon: <PaymentIcon fontSize={isTabletScreen ? 'large' : 'medium'} />,
      text: 'Update Fee',
    },
  ];
  return (
    <div className="h-full w-full shadow-sm rounded-lg grid grid-rows-8 bg-white 2xl:bg-white pt-4">
        <div className="row-span-1 grid md:grid-cols-1 xl:grid-cols-5">
          <div className="col-span-2 flex justify-center items-center">
            <div className="w-16 h-16 lg:h-16 lg:w-16 xl:w-16 xl:16 rounded-full overflow-hidden">
              <img src={nishad} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
          <div className="col-span-3 md:hidden xl:block">
            <div className="w-full h-full flex flex-col justify-center items-start">
              <h4 className="text-sm">Welcome back,</h4>
              <div className='w-full'>
                <h3 className="text-lg font-bold">Nishad👋</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-5 pt-8">
          <ul className={`flex justify-center items-center flex-col md:px-1 xl:px-4`}>
            {navigationItems.map((item) => (
              <li
                key={item.to}
                className={`mb-1 ${!isTabletScreen && 'w-full'} text-center`}
              >
                <Link
                  to={item.to}
                  className={`flex ${
                    isTabletScreen ? 'justify-center' : 'start'
                  } ${
                    isTabletScreen ? 'rounded-full' : 'rounded-xl'
                  } space-x-2 rounded-xl p-2 ${
                    location.pathname === item.to
                      ? 'bg-[#5266D7] text-white'
                      : ''
                  }`}
                >
                  <span className="flex items-center justify-center gap-3 text-md 3xl:text-lg text-nowrap">
                    {isTabletScreen ? (
                      item.icon
                    ) : (
                      <>
                        {item.icon} {item.text}
                      </>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="row-span-2 flex items-end md:px-1 xl:px-4  py-8">
          <button
            className={`flex md:w-full md:justify-center xl:justify-start space-x-2 rounded-3xl p-2`}
          >
            <span className="flex items-center justify-center gap-3 text-md 3xl:text-lg">
              <LogoutIcon fontSize={isTabletScreen ? 'large' : 'medium'} />
              {!isTabletScreen && 'Logout'}
            </span>
          </button>
        </div>
      </div>
  )
}

export default SidebarNew