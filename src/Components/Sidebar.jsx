import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
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

function Sidebar() {
    const location = useLocation();
    const isTabletScreen = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
    const isMobileScreen = useMediaQuery('(max-width: 767px)'); // Detect mobile screen size

    const navigationItems = [
        { to: '/', icon: <HomeIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Home' },
        { to: '/insights', icon: <InsightsIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Insights' },
        { to: '/expense', icon: <AttachMoneyIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Expense Tracker' },
        { to: '/add', icon: <PersonAddAlt1Icon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Add Student' },
        { to: '/modify', icon: <EditNoteIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Modify Student' },
        { to: '/filter', icon: <FilterAltIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Filter Student' },
        { to: '/teacherId', icon: <SensorOccupiedIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Create Teacher ID' },
        { to: '/updatefee', icon: <PaymentIcon fontSize={isTabletScreen ? 'large' : 'medium'} />, text: 'Update Fee' },
    ];

    if (isMobileScreen) {
        return null;
    }

    return (
        <div className='h-screen p-5 overflow-y-hidden'>
            <div className="w-full h-full rounded-xl lg:flex lg:flex-col lg:justify-between bg-white ">
                <div className="p-6 h-full">
                    <div className="flex flex-row justify-around md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-4">
                        <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full overflow-hidden">
                            <img src={nishad} className="w-full h-full object-cover" alt="" />
                        </div>
                        {!isTabletScreen && (
                            <div className=" w-full flex flex-col justify-center items-start gap-0">
                                <h2 className="text-md 2xl:text-lg text-nowrap pc:text-nowrap text-[#666666]">Welcome back !</h2>
                                <h1 className="text-lg 2xl:text-2xl font-bold w-full">Nishad 👋</h1>
                            </div>
                        )}
                    </div>
                    <div className={` h-[85%]  w-full mt-${isTabletScreen ? '20' : ''} flex flex-col ${isTabletScreen ? 'gap-4 justify-between items-center' : 'gap-8 items-center'}`}> 
                        <div className=" w-full font-normal flex-grow">
                            <ul className={`w-full flex justify-center items-center flex-col ${isTabletScreen ? 'mt-10' : 'py-10'}`}>
                                {navigationItems.map((item) => (
                                    <li key={item.to} className="mb-1 w-full text-center ">
                                        <Link to={item.to} className={`flex ${isTabletScreen ? 'justify-center' : 'flex-start'} 2xl: space-x-2 rounded-3xl p-2  ${location.pathname === item.to ? 'bg-[#5266D7] text-white' : ''}`}>
                                            <span className="flex items-center justify-center gap-3 text-lg text-nowrap ">
                                                {isTabletScreen ? item.icon : <>{item.icon} {item.text}</>}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="h-full w-full lg:flex lg:flex-col lg:justify-end">
                            <button className={`flex space-x-2 rounded-3xl p-2 ${isTabletScreen ? 'mt-50' : ''}`}>
                                <span className="flex items-center justify-center gap-3 text-lg">
                                    <LogoutIcon fontSize={isTabletScreen ? 'large' : 'medium'} />
                                    {!isTabletScreen && 'Logout'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
