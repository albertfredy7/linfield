import React from 'react';
import SidebarNew from '../Components/SidebarNew';

const AddRevenue = () => {
  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden "></div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>
          <div className="col-span-6 bg-red-100 flex items-center p-4">
            <div className="h-full w-full bg-orange-200 grid grid-rows-7 space-y-2">
              <div className="row-span-1 bg-violet-100 flex flex-col justify-center px-2">
                <h1 className="text-3xl font-semibold">Add revenue</h1>
                <h4 className="text-2xl">
                  Enter the details to help you track revenue
                </h4>
              </div>
              <div className="row-span-4 bg-violet-200 px-2">
                <div className="h-full w-full grid grid-rows-5 bg-green-200"></div>
              </div>
              <div className="row-span-2 bg-violet-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRevenue;
