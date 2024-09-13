import React, { useState } from 'react';
import SidebarNew from '../Components/SidebarNew';
import MobileNavigation from '../Components/MobileNavigation';
import Button from '../Components/Button';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function Teacher() {
   const [name, setName] = useState('');
   const [contactNo, setContactNo] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState(null);

   //handling the state of the loading button
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const options = [
      { value: 'Admin', label: 'Admin' },
      { value: 'GM', label: 'GM' },
      { value: 'Tutor', label: 'Tutor' },
   ];

   const teacherSubmitHandler = async () => {
      setLoading(true);

      try {
         if (!name || !contactNo || !email || !password || !role) {
            window.alert('Please fill all fields');
            return;
         }
         const requestData = {
            name,
            phoneNumber: contactNo,
            email,
            password,
            role,
         };

         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };

         // const { data } = await axios.post(
         //   'https://lobster-app-yjjm5.ondigitalocean.app/api/teachers/register',
         //   requestData,
         //   config
         // );

         // const { data } = await axios.post(
         //   'http://127.0.0.1:5000/api/teachers/register',
         //   requestData,
         //   config
         // );

         const { data } = await axios.post(
            'https://lms-backend-0hls.onrender.com/api/teachers/register',
            requestData,
            config
         );

         if (data.name) {
            window.alert('Teacher added successffully');
            setName('');
            setEmail('');
            setPassword('');
            setContactNo('');
            setRole('');
            navigate('/');
         }
      } catch (error) {
         window.alert(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
         <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
            {/* mobile screen */}
            <div className="block md:hidden bg-[#f0f0f0]">
               <div className="flex flex-col h-screen">
                  <div className="flex flex-col px-5 pt-10">
                     <h1 className="text-xl font-bold">Create Teacher ID</h1>
                     <h1 className="text-md text-gray-500 pt-1">
                        Fill out teacher details to add
                     </h1>
                  </div>
                  <div className="flex flex-col h-full gap-3 px-6 overflow-y-auto scroll-smooth pt-6">
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="name"
                           className="block text-base font-medium text-gray-600"
                        >
                           Teacher Name
                        </label>
                        <input
                           type="text"
                           id="name"
                           value={name}
                           placeholder="Enter name"
                           className="bg-[#FFFFFF] text-gray-600 bg text-base rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>

                     {/* contact No */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="contactNo"
                           className="block text-base 3xl:text-lg font-medium text-gray-600"
                        >
                           Contact No
                        </label>
                        <input
                           type="text"
                           id="contactNo"
                           value={contactNo}
                           placeholder="Enter contact number"
                           className="bg-[#FFFFFF] text-gray-600 bg text-base  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setContactNo(e.target.value)}
                        />
                     </div>

                     {/* email */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="email"
                           className="block text-base font-medium text-gray-600"
                        >
                           Email
                        </label>
                        <input
                           type="email"
                           id="email"
                           value={email}
                           placeholder="Enter email"
                           className="bg-[#FFFFFF] text-gray-600 bg text-base 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>

                     {/* password */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="password"
                           className="block text-base font-medium text-gray-600"
                        >
                           Password
                        </label>
                        <input
                           type="password"
                           id="password"
                           value={password}
                           placeholder="Enter password"
                           className="bg-[#FFFFFF] text-gray-600 bg text-base 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>

                     {/*  select roles */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="roles"
                           className="block text-base font-medium text-gray-600"
                        >
                           Select Role
                        </label>
                        <Select
                           options={options}
                           styles={{
                              control: (baseStyles, state) => ({
                                 ...baseStyles,
                                 borderRadius: '.5rem',
                                 padding: '0.2rem',
                                 borderWidth: '0px',
                                 backgroundColor: 'RGB(255, 255, 255)',
                                 fontSize: '1rem',
                              }),
                              singleValue: (baseStyles) => ({
                                 ...baseStyles,
                                 color: '#4A5568', // Change the color of the text inside the input container
                              }),
                           }}
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           name="roles"
                           value={
                              options.find((option) => option.value === role) ||
                              null
                           }
                           onChange={(e) => setRole(e.value)}
                        />
                     </div>

                     {/* submit button */}
                     <div className="pt-4 pb-24">
                        <Button
                           text="Create Teacher ID"
                           buttonStyle="bg-[#2740CD] text-white rounded-lg px-4 py-3 text-md w-full"
                           onClick={teacherSubmitHandler}
                           loading={loading}
                           Icon={HourglassEmptyIcon}
                        />
                     </div>
                  </div>
               </div>

               <div className="fixed bottom-0 right-0 w-full">
                  <MobileNavigation />
               </div>
            </div>

            {/* tablet screens */}
            <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen overflow-hidden">
               <div className="md:col-span-1 lg:col-span-1">
                  {/* <SidebarComponent /> */}
                  <SidebarNew />
               </div>
               <div className=" col-span-6 h-full px-12   overflow-hidden">
                  <div className="pt-14">
                     <h1 className="text-xl lg:text-4xl font-bold">
                        Add teacher
                     </h1>
                     <p className=" text-[#333333]">
                        Fill details to add new teacher
                     </p>
                  </div>
                  <div className=" overflow-y-auto h-full scroll-smooth pt-8 flex flex-col  gap-3 ">
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="name"
                           className="block text-sm 3xl:text-lg font-medium text-gray-600"
                        >
                           Teacher Name
                        </label>
                        <input
                           type="text"
                           id="name"
                           value={name}
                           placeholder="Enter name"
                           className="bg-[#FFFFFF] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>

                     {/* contact No */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="contactNo"
                           className="block text-sm 3xl:text-lg font-medium text-gray-600"
                        >
                           Contact No
                        </label>
                        <input
                           type="text"
                           id="contactNo"
                           value={contactNo}
                           placeholder="Enter contact number"
                           className="bg-[#FFFFFF] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setContactNo(e.target.value)}
                        />
                     </div>

                     {/* email */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="email"
                           className="block text-sm 3xl:text-lg font-medium text-gray-600"
                        >
                           Email
                        </label>
                        <input
                           type="email"
                           id="email"
                           value={email}
                           placeholder="Enter email"
                           className="bg-[#FFFFFF] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>

                     {/* password */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="password"
                           className="block text-sm 3xl:text-lg font-medium text-gray-600"
                        >
                           Password
                        </label>
                        <input
                           type="password"
                           id="password"
                           value={password}
                           placeholder="Enter password"
                           className="bg-[#FFFFFF] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>

                     {/*  select roles */}
                     <div className="flex flex-col gap-2">
                        <label
                           htmlFor="roles"
                           className="block text-sm 3xl:text-lg font-medium text-gray-600"
                        >
                           Select Role
                        </label>
                        <Select
                           options={options}
                           styles={{
                              control: (baseStyles, state) => ({
                                 ...baseStyles,
                                 borderRadius: '.5rem',
                                 padding: '0.4rem',
                                 borderWidth: '0px',
                                 backgroundColor: 'RGB(255, 255, 255)',
                                 fontSize: '1rem',
                              }),
                              singleValue: (baseStyles) => ({
                                 ...baseStyles,
                                 color: '#9E9E9E', // Change the color of the text inside the input container
                              }),
                           }}
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           name="roles"
                           onChange={(e) => setRole(e.value)}
                        />
                     </div>

                     {/* submit button */}
                     <div className="pt-4  flex justify-center">
                        <Button
                           text="Create Teacher ID"
                           buttonStyle="bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-1/2"
                           onClick={teacherSubmitHandler}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Teacher;
