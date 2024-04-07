import React, { useState, useEffect } from 'react';
import SidebarNew from '../Components/SidebarNew';
import SearchBar from '../Components/SeachBar';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* Mobile screens */}
        <div className=" h-full md:hidden flex flex-col">
          <div className="h-full overflow-y-auto px-5 flex flex-col gap-3">
            <div className="flex flex-col pt-10">
              <h1 className="text-xl font font-semibold">Student profile</h1>
              <h1 className="text-[#333333] text-md pt-1">
                View & verify the details of student
              </h1>
            </div>
          </div>
        </div>

        {/* Tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>
        </div>

        {/* PC screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen ">
          <div className="col-span-2">
            <SidebarNew />
          </div>
          <div className="col-span-9 bg-red-100 px-12 pt-6 3xl:pt-14 pb-6 overflow-hidden">
            <div className="flex justify-between">
              <div className=" pb-6">
                <h1 className="text-xl 3xl:text-2xl font-semibold">
                  Student profile
                </h1>
                <h3 className="text-gray-500 text-md 3xl:text-lg ">
                  View and verify the details of the student
                </h3>
              </div>
              <div className="w-1/2 flex items-center">
                <SearchBar />
              </div>
            </div>
            <div className="h-full bg-yellow-200">
              {!studentData ? (
                <div className="text-center text-base font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                  <img
                    src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                    className="mix-blend-multiply w-4/6"
                    alt=""
                  />
                  <h1 className="text-center text-gray-500">
                    No student data available
                  </h1>
                </div>
              ) : (
                <div>Student data available </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
