import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// icons from material ui
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import BlurOnIcon from '@mui/icons-material/BlurOn';

function MobileNavigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Modal component defined within MobileNavigation
  function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-x-0 -bottom-11 z-10 p-3 w-full">
        <div className="flex items-end justify-center min-h-screen">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
          ></div>
          <div className="inline-block  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // remove the fixed  for the bottom navigation for bug fixing
    <div className=" bottom-0 bg-[#F2F6F3] shadow-lg w-full h-16 rounded-t-3xl px-5 pt-3">
      <div className="flex gap-5 items-center justify-around">
        <div
          className="flex flex-col items-center"
          onClick={() => navigate('/')}
        >
          <HomeIcon
            fontSize="medium"
            style={{ color: location.pathname === '/' ? '#2740CD' : '#717171' }}
          />
          <p
            className="text-nowrap text-sm sm:text-md"
            style={{ color: location.pathname === '/' ? '#2740CD' : '#717171' }}
          >
            Home
          </p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate('/insights')}
        >
          <InsightsIcon
            fontSize="medium"
            style={{
              color: location.pathname === '/insights' ? '#2740CD' : '#717171',
            }}
          />
          <p
            className="text-nowrap text-sm sm:text-md"
            style={{
              color: location.pathname === '/insights' ? '#2740CD' : '#717171',
            }}
          >
            Insights
          </p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => handleOpenModal()}
        >
          <BlurOnIcon
            fontSize="medium"
            style={{
              color: location.pathname === '/more' ? '#2740CD' : '#717171',
            }}
          />
          <p
            className="text-nowrap text-sm sm:text-md"
            style={{
              color: location.pathname === '/more' ? '#2740CD' : '#717171',
            }}
          >
            More
          </p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate('/expense')}
        >
          <AttachMoneyIcon
            fontSize="medium"
            style={{
              color:
                location.pathname === '/expense' ||
                location.pathname === '/add-expense'
                  ? '#2740CD'
                  : '#717171',
            }}
          />
          <p
            className="text-nowrap text-sm sm:text-md"
            style={{
              color: location.pathname === '/expense' ? '#2740CD' : '#717171',
            }}
          >
            Expense
          </p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate('/filter')}
        >
          <FilterAltIcon
            fontSize="medium"
            style={{
              color:
                location.pathname === '/filter' ||
                location.pathname === '/applyFilter'
                  ? '#2740CD'
                  : '#717171',
            }}
          />
          <p
            className="text-nowrap text-sm sm:text-md"
            style={{
              color:
                location.pathname === '/filter' ||
                location.pathname === '/applyFilter'
                  ? '#2740CD'
                  : '#717171',
            }}
          >
            Filter
          </p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* Additional navigation items go here */}
        <div className="grid grid-cols-2 gap-5 p-5 ">
          <div
            className="flex flex-col items-center"
            onClick={() => navigate('/add')}
          >
            <PersonAddAlt1Icon fontSize="medium" />
            <p className="text-nowrap">Add Student</p>
          </div>
          <div className="flex flex-col items-center">
            <EditNoteIcon
              fontSize="medium"
              onClick={() => navigate('/modify')}
            />
            <p className="text-nowrap">Modify Student</p>
          </div>
          <div className="flex flex-col items-center">
            <SensorOccupiedIcon fontSize="medium" onClick={()=>navigate('/createTeacher')} />
            <p className="text-nowrap">Create Teacher</p>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={() => navigate('/updateFee')}
          >
            <PaymentIcon fontSize="medium" />
            <p className="text-nowrap">Update Fee</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MobileNavigation;
