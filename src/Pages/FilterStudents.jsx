import React from 'react'
import Sidebar from '../Components/Sidebar'
import SidebarNew from '../Components/SidebarNew'
import MobileNavigation from '../Components/MobileNavigation'
import SeachBar from '../Components/SeachBar'
import OverviewCard from '../Components/OverviewCard'
import DataCard from '../Components/DataCard'
import MobileOverviewCard from '../Components/MobileOverviewCard'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'


function FilterStudents() {
 

  const yearOptions = [
    {
      label: 2024,
      value: 2024,
    },
    {
      label: 2025,
      value: 2025,
    },
    {
      label: 2026,
      value: 2026,
    },
    {
      label: 2027,
      value: 2027,
    },
    {
      label: 2028,
      value: 2028,
    },
  ];

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden  ">

          <div className='flex flex-col h-screen'>
            <div className='pt-14 px-5 flex flex-col'>
              <h1 className='text-2xl font-semibold'>Filter Student</h1>
              <h1 className='text-[#333333] text-sm'>Filter the student based on Admn No / Mobile No </h1>
            </div>
  
            <div className='pt-5'><MobileOverviewCard title={'Total students'} subtitle={'2500'} /></div>
  
  
  
            <div className='flex justify-between pt-5 pb-5 px-6 gap-8 '>
              
              <Button text='Filter' buttonStyle='bg-[#2740CD] text-white px-3 py-1 rounded-xl' navigateUrl={'/applyFilter'} />
              <SeachBar />
            </div>
  
            <div className='overflow-y-auto flex flex-col gap-3 h-[550px] px-5  pt-5'>
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
            </div>
          </div>





          <div className='fixed bottom-0 right-0 w-full'>
            <MobileNavigation />
          </div>
        </div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
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
                Filter students
              </h1>
              <h1 className="text-md 3xl:text-xl font-normal">
                Lorem ipsum some random sub heading
              </h1>
            </div>

            <div className="row-span-2 3xl:row-span-3  py-3">
              <OverviewCard title={'Total Students'} value={2500} number={true}/>
            </div>

            <div className="row-span-4 3xl:row-span-8 pt-4">
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
                <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-full bg-green-100 grid grid-rows-12 overflow-hidden">
            <div className='row-span-2 bg-green-300 flex flex-col justify-center items-center px-4'>
              <SeachBar />
            </div>
            <div className='row-span-11 bg-green-500 p-10'>
              

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

export default FilterStudents;
