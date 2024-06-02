import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import OverviewCard from '../Components/OverviewCard';
import Button from '../Components/Button';
import DataCard from '../Components/DataCard';
import Select from 'react-select';
import MobileNavigation from '../Components/MobileNavigation';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import axios from 'axios';

function CreateTeacher() {
  const [teachersData, setTeachersData] = useState([]);
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);

  const options = [
    { value: 'Admin', label: 'Admin' },
    { value: 'GM', label: 'GM' },
    { value: 'Tutor', label: 'Tutor' },
  ];

  const teacherSubmitHandler = async () => {
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

      const { data } = await axios.post(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/teachers/register',
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
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchTeachersData = async () => {
      const { data } = await axios.get(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/teachers/showAll'
      );
      if (data) {
        setTeachersData(data);
      }
    };

    fetchTeachersData();
  }, []);

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden  ">
          <div className="flex flex-col h-screen">
            <div className="pt-10 px-5 flex flex-col">
              <h1 className="text-xl font-semibold">Create Teacher ID</h1>
              <h1 className="text-[#333333] text-sm pt-1">
                Strengthen linfield with the right teacher
              </h1>
            </div>

            <div className="pt-5 px-1">
              <MobileOverviewCard
                title={'Total Staff'}
                subtitle={teachersData.length > 0 ? teachersData.length : '0'}
              />
            </div>

            <div className="flex justify-between items-center pt-5  pl-5 pr-5 gap-8">
              <div>
                <h2 className="text-gray-600 font-semibold">Current staff</h2>
              </div>
              <Button
                text="Create"
                buttonStyle="bg-[#2740CD] text-white px-3 py-2 rounded-xl"
                navigateUrl={'/createTeacher'}
              />
            </div>

            <div className="overflow-y-auto flex flex-col gap-3 md:h-[550px] px-5 pt-5">
              {/* <DataCard type="admissions" title="Nishad" tailData="Admin" />
              <DataCard type="admissions" title="Irfan" tailData="Manager" />
              <DataCard type="admissions" title="Geetha" tailData="Teacher" />
              <DataCard type="admissions" title="John" tailData="Teacher" /> */}
              {teachersData.length > 0 ? (
                teachersData.map((teacher, index) => (
                  <DataCard
                    key={index}
                    type="admissions"
                    title={teacher.name}
                    tailData={teacher.role}
                    role={'teacher'}
                    teacherId={teacher._id.toString()}
                  />
                ))
              ) : (
                <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                  <img
                    src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                    className="mix-blend-multiply w-4/6"
                    alt=""
                  />
                  <h1 className="text-center">No teacher data available</h1>
                </div>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 right-0 w-full">
            <MobileNavigation />
          </div>
        </div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>
          <div className="col-span-6 h-full  px-12 grid grid-rows-9 3xl:grid-rows-12 overflow-hidden ">
            <div className="row-span-1 3xl:row-span-2 flex flex-col justify-center 3xl:justify-center px-4 ">
              <h1 className="text-xl md:text-3xl lg:text-4xl 3xl:text-4xl font-semibold pt-10">
                Create Teacher ID
              </h1>
              <h1 className="text-md lg:text-xl 3xl:text-xl font-medium text-[#333333] pb-5">
                Strengthen lifields with the right teacher
              </h1>
            </div>

            <div className="row-span-1   ">
              <OverviewCard
                title={'Total Staff'}
                number={teachersData.length > 0 ? teachersData.length : 0}
              />
            </div>

            <div className="row-span-1 flex justify-between  gap-5 pt-5 lg:pt-8 px-5 items-center">
              <div>
                <h2 className="text-gray-500 font-semibold lg:text-2xl">
                  Current Staff
                </h2>
              </div>
              <Button
                text="Create"
                buttonStyle="bg-[#2740CD] h-1/2 text-white px-6 py-2  lg:text-xl rounded-xl"
                navigateUrl={'/createTeacher'}
              />
            </div>

            <div className="row-span-6">
              <div className="overflow-y-auto scroll-smooth h-full p-4">
                <div className="space-y-3">
                  {teachersData.length > 0 ? (
                    teachersData.map((teacher, index) => (
                      <DataCard
                        key={index}
                        type="admissions"
                        title={teacher.name}
                        tailData={teacher.role}
                        role={'teacher'}
                        teacherId={teacher._id.toString()}
                      />
                    ))
                  ) : (
                    <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply w-4/6"
                        alt=""
                      />
                      <h1 className="text-center">No teacher data available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen">
          <div className="col-span-2 ">
            <SidebarNew />
          </div>

          <div className="col-span-6 h-full  px-12 grid grid-rows-7 3xl:grid-rows-12 overflow-hidden">
            <div className="row-span-1 3xl:row-span-2 flex flex-col justify-center 3xl:justify-center px-4">
              <h1 className="text-xl 3xl:text-3xl font-semibold">
                Create Teacher ID
              </h1>
              <h1 className="text-md 3xl:text-xl font-normal">
                Strengthen lifields with the right teacher
              </h1>
            </div>

            <div className="row-span-2 3xl:row-span-3  py-3">
              <OverviewCard
                title={'Total Staff'}
                number={teachersData.length > 0 ? teachersData.length : 0}
              />
            </div>

            <div className="row-span-4 3xl:row-span-8 pt-4">
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
                  {/* <DataCard type="admissions" title="Nishad" tailData="Admin" />
                  <DataCard
                    type="admissions"
                    title="Irfan"
                    tailData="Manager"
                  />
                  <DataCard
                    type="admissions"
                    title="Geetha"
                    tailData="Teacher"
                  /> */}
                  {teachersData.length > 0 ? (
                    teachersData.map((teacher, index) => (
                      <DataCard
                        key={index}
                        type="admissions"
                        title={teacher.name}
                        tailData={teacher.role}
                        role={'teacher'}
                        teacherId={teacher._id.toString()}
                      />
                    ))
                  ) : (
                    <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply w-4/6"
                        alt=""
                      />
                      <h1 className="text-center">No teacher data available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-full  overflow-hidden flex items-center ">
            <div className="pt-10 px-5 py-2 w-full">
              <div className=" h-full flex flex-col bg-white p-8 rounded-xl w-full">
                <div className="">
                  <h2 className="text-base xl:text-xl 3xl:text-2xl font-semibold">
                    Create teacher profile
                  </h2>
                  <h2 className="text-sm 3xl:text-md font-normal">
                    Strengthen Linfield with the right Teacher
                  </h2>
                </div>
                <div className="  pt-6 flex flex-col gap-3">
                  {/* teacher name  */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      Teacher Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      className="bg-[#f0f0f0] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  {/* contact No */}
                  <div>
                    <label
                      htmlFor="contactNo"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      Contact No
                    </label>
                    <input
                      type="text"
                      id="contactNo"
                      placeholder="Enter contact number"
                      className="bg-[#f0f0f0] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      }}
                    />
                  </div>

                  {/* email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      className="bg-[#f0f0f0] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  {/* password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      className="bg-[#f0f0f0] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  {/*  select roles */}
                  <div>
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
                          backgroundColor: 'RGB(240, 240, 240)',
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
                      onChange={(e) => {
                        setRole(e.value);
                      }}
                    />
                  </div>

                  {/* submit button */}
                  <div className="pt-4">
                    <Button
                      text="Create Teacher ID"
                      buttonStyle="bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-full"
                      onClick={teacherSubmitHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='grid grid-cols-5'>
            <div className='w-full '>
                <Sidebar />
            </div>
            <div>Home</div>
        </div> */}
    </div>
  );
}

export default CreateTeacher;
