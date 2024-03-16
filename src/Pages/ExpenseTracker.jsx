import React from 'react'
import Sidebar from '../Components/Sidebar'
import SidebarNew from '../Components/SidebarNew'
import MobileNavigation from '../Components/MobileNavigation'
import MobileDateSwitch from '../Components/MobileDateSwitch'
import MobileOverviewCard from '../Components/MobileOverviewCard'
import DataCard from '../Components/DataCard'

function ExpenseTracker() {
  return (

    <>
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
        <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
          {/* mobile screens */}
          <div className="block md:hidden ">
            <div className='flex flex-col h-screen'>


              <div className='flex flex-col items-start pt-10 px-8 py-3'>
                <h1 className='text-xl sm:text-2xl text-[#2740CD] font-bold '>Hey Nishad 👋</h1>
                <h2 className='text-[#66666] text-sm text-nowrap '>Track your expenses, start your day right</h2>
              </div>

              <div className='px-3 py-3'><MobileDateSwitch /></div>

              <div>
                <MobileOverviewCard title={'Spend so far'} subtitle={'5000'} />
              </div>

              <div className='flex justify-between p-5'>
                <h1 className='font-medium text-sm'>Today, 12 Mar 2024</h1>
                <button className='bg-[#2740CD] text-white text-sm px-3 py-1 rounded-xl'>Add</button>
              </div>

              <div className='px-3 flex flex-col gap-3  overflow-y-auto max-h-full'>
                <DataCard title={'Rent'} subTitle={'11.00am'} tailData={'$500'} type={'rent'}  />
                <DataCard title={'Stationary'} subTitle={'11.00am'} tailData={'$500'} type={'stationary'} />
                <DataCard title={'Refreshment'} subTitle={'11.00am'} tailData={'$500'} type={'refreshment'} />
                <DataCard title={'Electricity'} subTitle={'11.00am'} tailData={'$500'} type={'electricity'} />
                <DataCard title={'Repair'} subTitle={'11.00am'} tailData={'$500'} type={'repair'} />
                <DataCard title={'Equipments'} subTitle={'11.00am'} tailData={'$500'} type={'equipments'} />
                <DataCard title={'Miscallaneous'} subTitle={'11.00am'} tailData={'$500'} type={'miscallaneous'} />
                <DataCard title={'Miscallaneous'} subTitle={'11.00am'} tailData={'$500'} type={'miscallaneous'} />
                <DataCard title={'Miscallaneous'} subTitle={'11.00am'} tailData={'$500'} type={'miscallaneous'} />
                <DataCard title={'Miscallaneous'} subTitle={'11.00am'} tailData={'$500'} type={'miscallaneous'} />

              </div>

              <div className=''>
                <MobileNavigation />
              </div>

            </div>
          </div>

          {/* tablet screens */}
          <div className="hidden md:block md:col-span-1 lg:col-span-1 xl:hidden p-4">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>

          {/* pc screens */}
          <div className="hidden xl:block xl:col-span-2 2xl:col-span-1 p-4">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>

        </div>
        {/* <div className='grid grid-cols-5'>
            <div className='w-full '>
                <Sidebar />
            </div>
            <div>Home</div>
        </div> */}
      </div>

    </>
  )
}

export default ExpenseTracker
