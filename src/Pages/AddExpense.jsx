import React, { useState } from 'react';
import Select from 'react-select';
// import { ToastContainer, toast } from 'react-toastify'; // Import toast
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS

import toast, { Toaster } from 'react-hot-toast';
import MobileNavigation from '../Components/MobileNavigation';
import Button from '../Components/Button';
import SidebarNew from '../Components/SidebarNew';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function AddExpense() {
   const navigate = useNavigate();
   const options = [
      { value: 'Salary', label: 'Salary' },
      { value: 'Rent', label: 'Rent' },
      // { value: 'PrintingandStationary', label: 'Printing & Stationary' },
      { value: 'Refreshment', label: 'Refreshment' },
      { value: 'Electricity', label: 'Electricity' },
      { value: 'Repairs', label: 'Repairs' },
      { value: 'Equipments', label: 'Equipments' },
      { value: 'Miscallaneous', label: 'Miscellaneous Expense' },
      { value: 'ExamFees', label: 'Exam Fees' },
      { value: 'RegistrationFees', label: 'Registration Fees' },
   ];

   const [category, setCategory] = useState(null);
   const [amount, setAmount] = useState(null);
   const [description, setDescription] = useState(null);
   const [date, setDate] = useState(null);
   const [loading, setLoading] = useState(false);

   const addExpenseHandler = async () => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      setLoading(true);

      try {
         // const { data } = await axios.post(
         //   'https://lobster-app-yjjm5.ondigitalocean.app/api/expense/add',
         //   { category, description, amount, date },
         //   config
         // );

         // const { data } = await axios.post(
         //   'http://127.0.0.1:5000/api/expense/add',
         //   { category, description, amount, date },
         //   config
         // );

         const { data } = await axios.post(
            'https://lms-backend-0hls.onrender.com/api/expense/add',
            { category, description, amount, date },
            config
         );
         if (data.transaction.type) {
            window.alert('Expense added successfully');
            navigate('/expense');
         }
      } catch (error) {
         window.alert(error.response.data.message);
      } finally {
         setLoading(false);
      }

      // axios
      //   .post(
      //     'https://lobster-app-yjjm5.ondigitalocean.app/api/expense/add',
      //     { category, description, amount, date },
      //     config
      //   )
      //   .then(({ data }) => {
      //     if (data.transaction && data.transaction.type) {
      //       //  toast.success('Expense added successfully');
      //       alert('Expense added successfully');
      //       navigate('/expense');
      //     }
      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       // Extracting the error message from the response
      //       const errorMessage = error.response.data.message;
      //       //  toast.error(errorMessage);
      //       window.alert(errorMessage);
      //     } else {
      //       // Handling other types of errors
      //       window.alert('An error occurred:', error.mresponse.data.message);
      //     }
      //   });
   };

   return (
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
         <div className="h-full w-full block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
            {/* mobile screens */}
            <div className="block md:hidden ">
               <div className="flex flex-col h-screen ">
                  <div className="flex flex-col items-start  px-5  pt-10">
                     <h1 className="text-xl md:text-2xl  font-bold ">
                        Add new expense
                     </h1>
                     <p className="text-[#66666] md:text-lg  ">
                        Please add details for expense tracking.
                     </p>
                  </div>

                  <div className="px-5 flex flex-col gap-2  py-5 ">
                     <div>
                        <label
                           for="amount"
                           class="block text-base text-gray-600 pb-1"
                        >
                           Amount
                        </label>
                        <input
                           type="text"
                           id="amount"
                           class="bg-white border text-gray-600 text-base  rounded-md block w-full p-2 md:p-4 xl:p-2"
                           placeholder="Enter the amount"
                           required
                           onChange={(e) => {
                              setAmount(e.target.value);
                           }}
                        />
                     </div>
                     <div>
                        <label
                           for="description"
                           class="block text-base text-gray-600 pb-1"
                        >
                           Description
                        </label>
                        <input
                           type="text"
                           id="description"
                           class="bg-white border text-gray-600 text-base  rounded-md block w-full p-2 md:p-4 xl:p-2"
                           placeholder="Describe the expense"
                           required
                           onChange={(e) => {
                              setDescription(e.target.value);
                           }}
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="category"
                           className="block text-base text-gray-600 pb-1"
                        >
                           Category
                        </label>
                        <Select
                           options={options}
                           id="category"
                           isSearchable={false}
                           onChange={(e) => {
                              setCategory(e.value);
                           }}
                           styles={{
                              control: (baseStyles, state) => ({
                                 ...baseStyles,
                                 borderRadius: '.5rem',
                                 padding: '0.07rem',
                                 borderWidth: '0px',
                                 backgroundColor: 'RGB(255,255,255)',
                                 fontSize: '1rem',
                              }),
                           }}
                        />
                     </div>
                     <div className="w-full ">
                        <label
                           for="date"
                           className="block text-base text-gray-600 pb-1"
                        >
                           Date
                        </label>
                        <input
                           type="date"
                           id="date"
                           className="bg-white px-3 border text-gray-600 text-sm  rounded-md w-full p-1.5 md:p-4 xl:p-2"
                           required
                           placeholder="Select date"
                           onChange={(e) => {
                              setDate(e.target.value);
                           }}
                        />
                     </div>
                     <div className="py-5">
                        <Button
                           buttonStyle={
                              'bg-[#2740CD] text-white p-3 rounded-xl w-full'
                           }
                           text={'Add Expense'}
                           onClick={addExpenseHandler}
                           Icon={HourglassEmptyIcon}
                           loading={loading}
                        />
                     </div>
                     {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />{' '} */}
                     <Toaster position="top-center" />
                  </div>
               </div>

               <div className="">
                  <MobileNavigation />
               </div>
            </div>

            {/* tablet screens */}
            <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
               <div className="md:col-span-1 lg:col-span-1">
                  {' '}
                  {/* First col is acquired by the sidebar component */}
                  <SidebarNew />
               </div>
               <div className="md:col-span-6 lg:col-span-6 p-10">
                  {' '}
                  {/* Second col is acquired by the main content */}
                  <div className=" w-full rounded-2xl">
                     <div className="flex flex-col items-start   ">
                        <h1 className="text-3xl   font-bold lg:text-4xl ">
                           Add new expense
                        </h1>
                        <h2 className="text-[#66666] text-lg sm:text-lg lg:text-2xl  ">
                           Please add details for expense tracking.
                        </h2>
                     </div>

                     <div className=" flex flex-col gap-2  py-10 ">
                        <div>
                           <label
                              for="amount"
                              class="block text-lg lg:text-2xl font-medium text-gray-600"
                           >
                              Amount
                           </label>
                           <input
                              type="text"
                              id="amount"
                              class="bg-white border text-gray-600 text-lg lg:text-2xl  rounded-md block w-full p-2 md:p-4 xl:p-2"
                              placeholder="Enter the amount"
                              required
                              onChange={(e) => {
                                 setAmount(e.target.value);
                              }}
                           />
                        </div>
                        <div>
                           <label
                              for="description"
                              class="block text-lg lg:text-2xl font-medium text-gray-600"
                           >
                              Description
                           </label>
                           <input
                              type="text"
                              id="description"
                              class="bg-white border text-gray-600 text-lg lg:text-2xl  rounded-md block w-full p-2 md:p-4 xl:p-2"
                              placeholder="Describe the expense"
                              required
                              onChange={(e) => {
                                 setDescription(e.target.value);
                              }}
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="category"
                              className="block text-lg lg:text-2xl font-medium text-gray-600"
                           >
                              Category
                           </label>

                           {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! bug !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                           {/* this component size need to change */}
                           <Select
                              options={options}
                              id="category"
                              isSearchable={false}
                              onChange={(e) => {
                                 setCategory(e.value);
                              }}
                              styles={{
                                 control: (provided) => ({
                                    ...provided,
                                    fontSize: '1.125rem', // This corresponds to text-lg in Tailwind CSS
                                 }),
                                 option: (provided) => ({
                                    ...provided,
                                    fontSize: '1.125rem', // This corresponds to text-lg in Tailwind CSS
                                 }),
                              }}
                           />
                        </div>
                        <div>
                           <label
                              for="date"
                              class="block text-lg lg:text-2xl font-medium text-gray-600"
                           >
                              Date
                           </label>
                           <input
                              type="date"
                              id="date"
                              className="bg-white px-3 border text-gray-600 text-lg lg:text-2xl  rounded-md w-full p-2 md:p-4 xl:p-2"
                              required
                              placeholder="Select date"
                              onChange={(e) => {
                                 setDate(e.target.value);
                              }}
                           />
                        </div>
                        <div className="p-5">
                           <Button
                              buttonStyle={
                                 'bg-[#2740CD] text-white text-lg lg:text-2xl font-medium p-3 rounded-xl w-full '
                              }
                              text={'Add Expense'}
                              onClick={addExpenseHandler}
                              Icon={HourglassEmptyIcon}
                              loading={loading}
                           />
                        </div>
                        {/* <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />{' '} */}
                        <Toaster
                           position="top-center"
                           reverseOrder={false}
                           gutter={8}
                           containerClassName=""
                           containerStyle={{}}
                           toastOptions={{
                              // Define default options
                              className: '',
                              duration: 5000,
                              style: {
                                 background: '#363636',
                                 color: '#fff',
                              },

                              // Default options for specific types
                              success: {
                                 duration: 3000,
                                 theme: {
                                    primary: 'green',
                                    secondary: 'black',
                                 },
                              },
                           }}
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* pc screens */}
            <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen">
               {' '}
               {/* Total 2 cols for pc screens */}
               {/* <SidebarComponent /> */}
            </div>
         </div>
      </div>
   );
}

export default AddExpense;
