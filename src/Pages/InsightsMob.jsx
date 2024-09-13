import React from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import MobileNavigation from '../Components/MobileNavigation';
import MobileDateSwitch from '../Components/MobileDateSwitch';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import OverviewCard from '../Components/OverviewCard';
import InsightOverview from '../Components/InsightOverview';
import DataCard from '../Components/DataCard';
import ButtonGroup from '../Components/ButtonGroup';
import Button from '../Components/Button';

function Insights() {
   const data = [
      {
         title: 'Spend So Far',
         value: 5000,
      },
   ];
   return (
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
         <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
            {/* mobile screens */}
            <div className="block md:hidden w-full ">
               <div className="flex flex-col h-screen">
                  <div className="p-5">
                     <h1 className="text-3xl text-center font-semibold">
                        Insights
                     </h1>
                     <p className="text-center">All your data is here</p>
                  </div>

                  <div className=" px-5">
                     <ButtonGroup />
                  </div>
                  <div className="px-10 py-5">
                     <InsightOverview type={'expenses'} />
                  </div>

                  <div className=" p-5">
                     <MobileDateSwitch />
                  </div>

                  <div className="flex justify-between items-center py-2 px-5">
                     <div className=" px-5">
                        <h1>Recent Transactions</h1>
                     </div>
                     <div className="p-2">
                        <Button
                           buttonStyle="bg-[#2740CD] text-white px-5 py-1 text-sm rounded-2xl"
                           text="Add"
                        />
                     </div>
                  </div>
                  <div className="px-3 flex flex-col gap-3  overflow-y-auto pb-20">
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                     <DataCard
                        type="transactions"
                        title="Admission Fees"
                        subTitle="John doe"
                        tailData="SSLC"
                     />
                  </div>

                  <div className="fixed bottom-0 right-0 w-full">
                     <MobileNavigation />
                  </div>
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
               <div className="col-span-2 bg-red-100  ">
                  <SidebarNew />
               </div>

               <div className="col-span-9 bg-red-100 grid grid-rows-12 h-full  overflow-hidden">
                  <div className="row-span-2 px-5 bg-green-100 flex justify-between items-end">
                     <div className="flex flex-col pb-5 ">
                        <h1 className="text-2xl 3xl:text-3xl font-semibold">
                           Insights
                        </h1>
                        <h1 className="text-md 3xl:text-xl font-normal">
                           All your data is here
                        </h1>
                     </div>
                     <div className="pb-5">
                        <InsightOverview type={'expenses'} />
                     </div>
                  </div>
                  <div className="row-span-10  grid grid-cols-10">
                     <div className="col-span-7 bg-blue-100 grid grid-rows-8">
                        <div className="row-span-1 bg-green-200 overflow-hidden">
                           hdjdj
                        </div>
                        <div className="row-span-7 grid grid-rows-7  bg-orange-200 overflow-hidden">
                           <div className="row-span-1 bg-red-200 p-5">
                              <MobileDateSwitch />
                           </div>
                           <div className="row-span-6 grid grid-rows-6  h-full   gap-4 ">
                              <div className="w-full h-full overflow-y-auto bg-red-100">
                                 <div className="space-y-3">
                                    <DataCard
                                       type="transactions"
                                       title="Admission Fees"
                                       subTitle="John doe"
                                       tailData="SSLC"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-span-3 bg-yellow-100"></div>
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

export default Insights;
