import React from 'react'
import Sidebar from '../Components/Sidebar'
import SidebarNew from '../Components/SidebarNew'
import MobileNavigation from '../Components/MobileNavigation'
import MobileDateSwitch from '../Components/MobileDateSwitch'
import MobileOverviewCard from '../Components/MobileOverviewCard'
import DataCard from '../Components/DataCard'
import { useNavigate } from 'react-router-dom'
import OverviewCard from '../Components/OverviewCard'
import DatePicker from '../Components/DatePicker'
import Button from '../Components/Button'
import Select from 'react-select'

function ExpenseTracker() {

  const naviagte = useNavigate()
  const options = [
    { value: 'salary', label: 'Salary' },
    { value: 'rent', label: 'Rent' },
    { value: 'printing_stationary', label: 'Printing & Stationary' },
    { value: 'refreshment', label: 'Refreshment' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'repairs', label: 'Repairs' },
    { value: 'equipments', label: 'Equipments' },
    { value: 'miscellaneous', label: 'Miscellaneous Expense' },
  ]
  return (

    <>
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
        <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
          {/* mobile screens */}
          <div className=" block md:hidden ">
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
                <button className='bg-[#2740CD] text-white text-sm px-3 py-1 rounded-xl' onClick={() => naviagte('/add-expense')}>Add</button>
              </div>

              <div className='px-3 flex flex-col gap-3  overflow-y-auto max-h-full mb-3'>
                <DataCard title={'Rent'} subTitle={'11.00am'} tailData={'$500'} type={'rent'} />
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
          <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen"> {/* Parent div contains 2 cols */}
            <div className="md:col-span-1 lg:col-span-1"> {/* First col is acquired by the sidebar component */}
              <SidebarNew />
            </div>
            <div className="md:col-span-6 lg:col-span-6 bg-red-100 h-full "> {/* First col is acquired by the sidebar component */}
              <div className='p-10'>
                <div className='flex flex-col justify-center items-center'>
                  <h1 className="text-3xl font-bold ">Expense Tracker</h1>
                  
                  <h2 className="text-lg font-semibold ">Your expenses at a glance</h2>
                  <div className=''>
                    <MobileDateSwitch />
                  </div>
                </div>
                <div className='py-3'>
                  <OverviewCard title={'Spend so far'} value={'5000'} style={'py-10'} />
                </div>
                <div className='flex justify-between p-5'>
                  <h1 className='font-medium text-md'>Today, 12 Mar 2024</h1>
                  <button className='bg-[#2740CD] text-white text-md px-3 py-1 rounded-xl' onClick={() => naviagte('/add-expense')}>Add</button>
                </div>
                <div className='flex flex-col gap-3  overflow-y-auto h-auto   '>
                  <div className='grid grid-rows-5 space-y-2 overflow-y-auto h-full'>
                    <div className='row-span-1'><DataCard title={'Rent'} subTitle={'11.00am'} tailData={'$500'} type={'rent'} /></div>
                    <div className='row-span-1'><DataCard title={'Stationary'} subTitle={'11.00am'} tailData={'$500'} type={'stationary'} /></div>
                    <div className='row-span-1'><DataCard title={'Refreshment'} subTitle={'11.00am'} tailData={'$500'} type={'refreshment'} /></div>
                    <div className='row-span-1'><DataCard title={'Electricity'} subTitle={'11.00am'} tailData={'$500'} type={'electricity'} /></div>
                    <div className='row-span-1'><DataCard title={'Repair'} subTitle={'11.00am'} tailData={'$500'} type={'repair'} /></div>
                    <div className='row-span-1'><DataCard title={'Equipments'} subTitle={'11.00am'} tailData={'$500'} type={'equipments'} /></div>
                    <div className='row-span-1'><DataCard title={'Miscallaneous'} subTitle={'11.00am'} tailData={'$500'} type={'miscallaneous'} /></div>
                    
                    
                    
                  </div>
                  
                  
                </div>
                

              </div>
            </div>
          </div>

          {/* pc screens */}
          <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen"> {/* Total 2 cols for pc screens */}
            <div className="col-span-2 "> {/* 1st col */}
              <SidebarNew />
            </div>
            <div className="col-span-6   "> {/* 2nd col */}
              <div className=" col-span-6 grid grid-rows-5  p-10  h-screen">
                {/* Expense Tracker Heading */}
                <div className='row-span-1  '>
                  <h1 className="text-3xl font-bold ">Expense Tracker</h1>
                  {/* Subheading */}
                  <h2 className="text-lg font-semibold ">Your expenses at a glance</h2>
                  <div className='p-5'>
                    <MobileDateSwitch />
                  </div>

                </div>

                <div className='row-span-4 flex flex-col gap-3  overflow-y-auto h-full  '>

                  <DataCard title={'Rent'} subTitle={'11.00am'} tailData={'$500'} type={'rent'} />
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
              </div>


            </div>
            <div className=" col-span-3 grid grid-rows-5 pt-5">
              <div className='row-span-1'>
                <OverviewCard title={'Spend so far'} value={'5000'} />
              </div>
              <div className='flex flex-col h-screen row-span-4 p-5 '>


                <div className='pt-8'>
                  <div className='bg-white rounded-2xl '>
                    <div className='flex flex-col items-start  px-8  pt-20 '>
                      <h1 className='text-2xl sm:text-2xl  font-bold '>Add new expense</h1>
                      <h2 className='text-[#66666] text-sm sm:text-lg  '>Please add details for expense tracking.</h2>
                    </div>

                    <div className='px-8 flex flex-col gap-2  py-10 '>
                      <div>
                        <label
                          for="amount"
                          class="block text-sm font-medium text-gray-600"
                        >
                          Amount
                        </label>
                        <input
                          type="text"
                          id="amount"
                          class="bg-white border text-gray-600 text-sm  rounded-md block w-full p-2 md:p-4 xl:p-2"
                          placeholder="Enter the amount"
                          required


                        />
                      </div>
                      <div>
                        <label
                          for="description"
                          class="block text-sm font-medium text-gray-600"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          id="description"
                          class="bg-white border text-gray-600 text-sm  rounded-md block w-full p-2 md:p-4 xl:p-2"
                          placeholder="Describe the expense"
                          required


                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Category
                        </label>
                        <Select
                          options={options}
                          id='category'
                          isSearchable={false}

                        />
                      </div>
                      <div>
                        <label
                          for="date"
                          class="block text-sm font-medium text-gray-600"
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          className="bg-white px-3 border text-gray-600 text-sm  rounded-md w-full p-2 md:p-4 xl:p-2"
                          required
                          placeholder='Select date'

                        />
                      </div>

                      <div className='py-5'>
                        <Button
                          buttonStyle={'bg-[#2740CD] text-white p-3 rounded-xl w-full'}
                          text={'Add Expense'}
                        />
                      </div>


                    </div>
                  </div>
                </div>

              </div>

              {/* Expense Form Container */}

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


    </>
  )
}

export default ExpenseTracker
