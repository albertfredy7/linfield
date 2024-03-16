import React from 'react'
import Sidebar from '../Components/Sidebar'
import SidebarNew from '../Components/SidebarNew'
import MobileNavigation from '../Components/MobileNavigation'
import MobileDateSwitch from '../Components/MobileDateSwitch'
import MobileOverviewCard from '../Components/MobileOverviewCard'
import OverviewCard from '../Components/OverviewCard'


function Insights() {

  const data= [
    {
      title:'Spend So Far',
      value: 5000
    }
  ]
  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden ">
          

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
  )
}

export default Insights