import React from 'react';
import SidebarNew from '../Components/SidebarNew';
import OverviewCard from '../Components/OverviewCard';
import Button from '../Components/Button';
import HomeIcon from '@mui/icons-material/Home';
import gmeet from '../assets/meet-logo-new.svg';
import notion from '../assets/notion.png';
import DataCard from '../Components/DataCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden ">this is mobile screen</div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          <div className="md:col-span-1 lg:col-span-1">
            <SidebarNew />
          </div>
          <div className="md:grid md:col-span-6 lg:col-span-6 md:grid-rows-5 ">
            <div className="grid row-span-1 grid-cols-3  justify-center items-center pl-3">
              <OverviewCard title="Revenue so far" value="3.56L" style={{h: '3/5'}}/>
              <OverviewCard title="Revenue so far" value="3.56L" style={{h: '3/5'}}/>
              <OverviewCard title="Revenue so far" value="3.56L" style={{h: '3/5'}}/>
            </div>

            <div className="grid row-span-4 grid-rows-11 items-center pr-4">
              <div className='row-span-1 h-full flex justify-end gap-10'>
                  <button className='flex items-center gap-4'>
                    <img src={gmeet} className='h-2/5 w-2/5' />
                    <h4 className='text-xl font-semibold'>Meet</h4>
                  </button>
                  <button className='flex items-center gap-4'>
                    <img src={notion} className='h-2/5 w-2/5' />
                    <h4 className='text-xl font-semibold'>Notion</h4>
                  </button>
              </div>
              <div className='row-span-5 h-full grid grid-rows-11'>
                <div className='row-span-1 px-7'>
                  <h4 className='text-2xl font-semibold'>Recent transactions</h4>
                </div>
                <div className='row-span-3 flex items-center pl-7 py-2'>
                  <DataCard type='transactions' title='Admission Fee' subTitle='John Doe' tailData='SSLC' style={{h: 'full'}}/>
                </div>
                <div className='row-span-3 flex items-center pl-7 py-2'>
                  <DataCard type='transactions' title='Exam Fee' subTitle='John Doe' tailData='SSLC' style={{h: 'full'}}/>
                </div>
                <div className='row-span-3 flex items-center pl-7 py-2'>
                  <DataCard type='transactions' title='Tuition Fee' subTitle='John Doe' tailData='SSLC' style={{h: 'full'}}/>
                </div>
                <div className='row-span-1 text-xl text-blue-600 flex justify-end '>View more</div>
                
              </div>
              

              <div className='row-span-5 h-full grid grid-rows-11'>
                <div className='row-span-1 px-7'>
                  <h4 className='text-2xl font-semibold'>Recent transactions</h4>
                </div>
                <div className='row-span-3 flex items-center pl-7 py-2'>
                  <DataCard type='admissions' title='Berlin' tailData='SSLC' style={{h: 'full'}}/>
                </div>
                <div className='row-span-3 flex items-center pl-7 py-2'>
                  <DataCard type='admissions' title='Denver' tailData='SSLC' style={{h: 'full'}}/>
                </div>
                <div className='row-span-3 flex items-center pl-7 py-2'>
                  <DataCard type='admissions' title='Professor' tailData='SSLC' style={{h: 'full'}}/>
                </div>
                <div className='row-span-1 text-xl text-blue-600 flex justify-end '>View more</div>
                
              </div>
            </div>
            {/* Content for the remaining portion */}
              
          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen">
          {/* <SidebarComponent /> */}
          <div className='col-span-2 bg-red-100'>
            <SidebarNew />
          </div>
          <div className='col-span-9 grid grid-rows-5'>
            <div className='row-span-1 grid grid-cols-3 pl-4 pr-2 pb-2 items-center'>
                <OverviewCard title='Revenue so far' value='13.5L' style={{h: 'full'}}/>
                <OverviewCard title='Admissions so far' value='13.5L' style={{h: 'full'}}/>
                <OverviewCard title='Expenses so far' value='13.5L' style={{h: 'full'}}/>
            </div>
            <div className='row-span-4  pt-2 grid grid-cols-3'>
              <div className='col-span-2  grid grid-rows-2'>
                <div className=' grid grid-rows-8'>
                  <div className='row-span-1 flex items-center'>
                    <h3 className='text-md font-semibold px-9'>Recent transactions</h3>
                  </div>
                  <div className=' row-span-2 pl-9 pr-4 pb-2'>
                    <DataCard type='transactions' title='Admission Fees' subTitle='John doe' tailData='SSLC'/>
                  </div>
                  <div className='row-span-2 pl-9 pr-4 pb-2'>
                    <DataCard type='transactions' title='Admission Fees' subTitle='John doe' tailData='SSLC' />
                  </div>
                  <div className='row-span-2 pl-9 pr-4 pb-2'>
                    <DataCard type='transactions' title='Admission Fees' subTitle='John doe' tailData='SSLC' />
                  </div>
                  <div className='row-span-1 flex justify-end pr-4'>
                    <h3 className='text-sm text-blue-500'>View more</h3>
                  </div>    
                </div>
                <div className='grid grid-rows-8'>
                  <div className='row-span-1 flex items-center'>
                    <h3 className='text-md font-semibold px-9'>Recent admissions</h3>
                  </div>
                  <div className=' row-span-2 pl-9 pr-4 pb-2'>
                    <DataCard type='admissions' title='Berlin' tailData='SSLC'/>
                  </div>
                  <div className='row-span-2 pl-9 pr-4 pb-2'>
                    <DataCard type='admissions' title='Denver' tailData='SSLC' />
                  </div>
                  <div className='row-span-2 pl-9 pr-4 pb-2'>
                    <DataCard type='admissions' title='Professor' tailData='SSLC' />
                  </div>
                  <div className='row-span-1 flex justify-end pr-4'>
                    <h3 className='text-sm text-blue-500'>View more</h3>
                  </div>   
                </div>
              </div>
              <div className='col-span-1  grid grid-rows-8'>
                <div className='row-span-1 flex justify-center items-end gap-5 w-full rounded-lg py-2'>
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <h3 className='text-md font-semibold'>Meet now</h3>
                    <img src={gmeet} className='h-1/5 w-1/5' />
                  </div>
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <h3 className='text-md font-semibold'>Notion</h3>
                    <img src={notion} className='h-1/5 w-1/5' />
                  </div>
                </div>
                <div className='row-span-6'>
                  <div className='w-full h-full flex items-center justify-start py-4 pl-20'>
                    <DatePicker
                      inline
                      calendarClassName=''
                      // calendarContainer='pr-2 border'
                      
                    />
                  </div>
                </div>
                <div className='row-span-1 flex justify-center items-center gap-4 w-full rounded-lg py-2'>
                  {/* <h3 className='text-md font-semibold'>Notion</h3>
                  <img src={notion} className='h-3/5 w-3//5' /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
