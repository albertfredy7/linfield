import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Icons from Material UI
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

   const teacherLoginData = useSelector((state) => state.teacherLogin);
   const { teacherInfo } = teacherLoginData;
   const role = teacherInfo?.role;

   const handleOpenModal = () => setIsModalOpen(true);
   const handleCloseModal = () => setIsModalOpen(false);

   // Function to determine if a path is active
   const isActive = (path) => location.pathname === path;

   // Common function to render a navigation item
   const renderNavItem = (path, label, Icon) => (
      <div
         className="flex flex-col items-center"
         onClick={() => navigate(path)}
      >
         <Icon
            fontSize="medium"
            style={{
               color: isActive(path) ? '#2740CD' : '#717171',
            }}
         />
         <p
            className="text-nowrap text-sm sm:text-md"
            style={{
               color: isActive(path) ? '#2740CD' : '#717171',
            }}
         >
            {label}
         </p>
      </div>
   );

   // Navigation items for Admin and GM
   const adminNavItems = (
      <>
         {renderNavItem('/', 'Home', HomeIcon)}
         {renderNavItem('/insights', 'Insights', InsightsIcon)}
         <div className="flex flex-col items-center" onClick={handleOpenModal}>
            <BlurOnIcon
               fontSize="medium"
               style={{
                  color: isActive('/more') ? '#2740CD' : '#717171',
               }}
            />
            <p
               className="text-nowrap text-sm sm:text-md"
               style={{
                  color: isActive('/more') ? '#2740CD' : '#717171',
               }}
            >
               More
            </p>
         </div>
         {renderNavItem('/expense', 'Expense', AttachMoneyIcon)}
         {renderNavItem('/filter', 'Filter', FilterAltIcon)}
      </>
   );

   // Navigation items for Tutor
   const tutorNavItems = (
      <>
         {/* {renderNavItem('/', 'Home', HomeIcon)} */}
         {renderNavItem('/updatefee', 'Fee', PaymentIcon)}
         {renderNavItem('/filter', 'Filter', FilterAltIcon)}
         {renderNavItem('/expense', 'Expense', AttachMoneyIcon)}
         {renderNavItem('/add', 'Add', PersonAddAlt1Icon)}
         {renderNavItem('/modify', 'Modify', EditNoteIcon)}
      </>
   );

   return (
      <div className="bg-[#F2F6F3] shadow-lg w-full h-16 rounded-t-3xl px-5 pt-3">
         <div className="flex items-center justify-around">
            {role === 'Tutor' ? tutorNavItems : adminNavItems}
         </div>
         {role !== 'Tutor' && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
               <div className="grid grid-cols-2 gap-5 p-5">
                  {renderNavItem('/add', 'Add Student', PersonAddAlt1Icon)}
                  {renderNavItem('/modify', 'Modify Student', EditNoteIcon)}
                  {renderNavItem(
                     '/teacherId',
                     'Create Teacher',
                     SensorOccupiedIcon
                  )}
                  {renderNavItem('/updateFee', 'Update Fee', PaymentIcon)}
               </div>
            </Modal>
         )}
      </div>
   );
}

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
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
}

export default MobileNavigation;
