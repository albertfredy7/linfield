import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import MobileNavigation from '../Components/MobileNavigation';
import MobileDateSwitch from '../Components/MobileDateSwitch';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import DataCard from '../Components/DataCard';
import { useNavigate } from 'react-router-dom';
import OverviewCard from '../Components/OverviewCard';
import DatePicker from '../Components/DatePicker';
import Button from '../Components/Button';
import Select from 'react-select';
import axios from 'axios';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import { duration } from '@mui/material';

function ExpenseTracker() {
  const naviagte = useNavigate();

  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('today');

  const [expenseData, setExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const options = [
    { value: 'Salary', label: 'Salary' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Stationary', label: 'Printing & Stationary' },
    { value: 'Refreshment', label: 'Refreshment' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Repairs', label: 'Repairs' },
    { value: 'Equipments', label: 'Equipments' },
    { value: 'Miscellaneous Expense', label: 'Miscellaneous Expense' },
    { value: 'Exam Fees', label: 'Exam Fees' },
    { value: 'Registration Fees', label: 'Registration Fees' },
    { value: 'Error value', label: 'Error value' },
  ];

  const currentDate = new Date(Date.now());
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    currentDate
  );

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleDateRangeSelect = (dateRange) => {
    console.log(`the date range is ${dateRange}`);
  };

  const addExpenseHandler = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://127.0.0.1:5000/api/expense/add',
        { category, description, amount, date },
        config
      );

      if (data.transaction && data.transaction.type) {
        toast.success('Expense added successfully');
      }
    } catch (error) {
      if (error.response) {
        // Extracting the error message from the response
        console.log(error.response.data.message);
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        // Handling other types of errors
        console.error('An error occurred:', error.message);
      }
    }
  };

  const formatNumber = (number) => {
    if (number >= 100000) {
      return (number / 100000).toFixed(1) + 'L'; // Convert to lakhs
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K'; // Convert to thousands
    } else {
      return number.toString();
    }
  };

  const fetchData = async () => {
    if (
      selectedDuration === 'today' ||
      selectedDuration === 'this_week' ||
      selectedDuration === 'this_month'
    ) {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/expense?duration=${selectedDuration}`
      );
      setExpenseData(data.expenses);
      setTotalExpense(formatNumber(data.totalAmount));
    } else {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/expense?duration=custom&start_date=${selectedDuration}&end_date=${selectedDuration}`
      );
      setExpenseData(data.expenses);
      setTotalExpense(formatNumber(data.totalAmount));
    }
  };

  useEffect(() => {
    fetchData();
    console.log(expenseData);
  }, [selectedDuration]);

  return (
    <>
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
        <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6 ">
          {/* mobile screens */}
          <div className=" block md:hidden w-screen ">
            <div className="flex flex-col h-screen">
              <div className="flex flex-col items-center pt-10 px-8 py-3">
                <h1 className="text-xl sm:text-2xl text-[#2740CD] font-bold ">
                  Hey Nishad 👋
                </h1>
                <h2 className="text-[#66666] text-sm text-nowrap ">
                  Track your expenses, start your day right
                </h2>
                <div className=" bg-red-100 justify-center flex items-center">
                  <MobileDateSwitch />
                </div>
              </div>

              <div>
                <MobileOverviewCard
                  title={'Spend so far'}
                  subtitle={totalExpense}
                />
              </div>

              <div className="flex justify-between p-5">
                <h1 className="font-medium text-sm">Today, 12 Mar 2024</h1>
                <button
                  className="bg-[#2740CD] text-white text-sm px-3 py-1 rounded-xl"
                  onClick={() => naviagte('/add-expense')}
                >
                  Add
                </button>
              </div>

              <div className="px-3 flex flex-col gap-3  overflow-y-auto pb-20">
                <DataCard
                  title={'Rent'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'rent'}
                />
                <DataCard
                  title={'Stationary'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'stationary'}
                />
                <DataCard
                  title={'Refreshment'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'refreshment'}
                />
                <DataCard
                  title={'Electricity'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'electricity'}
                />
                <DataCard
                  title={'Repair'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'repair'}
                />
                <DataCard
                  title={'Equipments'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'equipments'}
                />
                <DataCard
                  title={'Miscallaneous'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'miscallaneous'}
                />
                <DataCard
                  title={'Miscallaneous'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'miscallaneous'}
                />
                <DataCard
                  title={'Miscallaneous'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'miscallaneous'}
                />
                <DataCard
                  title={'Miscallaneous'}
                  subTitle={'11.00am'}
                  tailData={'$500'}
                  type={'miscallaneous'}
                />
              </div>

              <div className="fixed bottom-0 right-0 w-full">
                <MobileNavigation />
              </div>
            </div>
          </div>

          {/* tablet screens */}
          <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
            {/* Parent div contains 2 cols */}
            <div className="md:col-span-1 lg:col-span-1">
              {/* First col is acquired by the sidebar component */}
              <SidebarNew />
            </div>
            <div className="md:col-span-6 lg:col-span-6  overflow-hidden">
              {/* First col is acquired by the sidebar component */}
              <div className="py-4 px-6 h-full flex flex-col">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl lg:text-3xl font-semibold ">
                    Expense Tracker
                  </h1>
                  <h2 className="text-lg lg:text-xl font-semibold ">
                    Your expenses at a glance
                  </h2>
                  <div className="p-3">
                    <MobileDateSwitch
                      duration={selectedDuration}
                      onSelectDateRange={handleDateRangeSelect}
                      onSelect={handleDurationChange}
                    />
                  </div>
                </div>
                {console.log(`current duration ${selectedDuration}`)}
                <div className="py-3">
                  <OverviewCard
                    title={'Spend so far'}
                    value={totalExpense}
                    style={'py-10'}
                  />
                </div>
                <div className="flex justify-between items-center py-5">
                  <h1 className="font-medium text-md md:text-lg lg:text-xl xl:text-md">
                    Today, {formattedDate}
                  </h1>
                  <button
                    className="bg-[#2740CD] text-white text-md lg:text-xl xl:text-md px-4 py-2 rounded-xl"
                    onClick={() => naviagte('/add-expense')}
                  >
                    Add
                  </button>
                </div>
                {/* Set a fixed height and overflow-y-auto for the scrollable area */}
                <div className="flex-grow overflow-y-auto">
                  <div className="space-y-2">
                    {expenseData.map((x, idx) => {
                      return (
                        <div className="row-span-1">
                          <DataCard
                            title={x.category}
                            tailData={x.amount}
                            type={x.category.toLowerCase().replace(/\s/g, '')}
                          />
                        </div>
                      );
                    })}
                    {/* <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div>
                    <div className="row-span-1">
                      <DataCard
                        title={'Rent'}
                        subTitle={'11.00am'}
                        tailData={'$500'}
                        type={'rent'}
                      />
                    </div> */}

                    {/* Add other DataCard components */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* pc screens */}
          <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen">
            {' '}
            {/* Total 2 cols for pc screens */}
            <div className="col-span-2 ">
              {' '}
              {/* 1st col */}
              <SidebarNew />
            </div>
            <div className="col-span-6 px-8 grid grid-rows-4 3xl:grid-rows-5 overflow-hidden">
              <div className="row-span-1 flex flex-col justify-center px-4 space-y-3">
                <div className="3xl:space-y-1">
                  <h1 className="text-xl 3xl:text-2xl font-semibold">
                    Expense Tracker
                  </h1>
                  <h2 className="text-md 3xl:text-xl font-semibold">
                    Your expenses at a glance
                  </h2>
                </div>
                <MobileDateSwitch
                  duration={selectedDuration}
                  onSelectDateRange={handleDateRangeSelect}
                  onSelect={handleDurationChange}
                />
              </div>
              <div className="row-span-3 3xl:row-span-4 pb-3 px-3 h-full">
                <div className=" w-full h-full overflow-y-auto">
                  <div className="space-y-3">
                    {expenseData.map((x, idx) => {
                      return (
                        <DataCard
                          title={x.category}
                          tailData={x.amount}
                          type={x.category.toLowerCase().replace(/\s/g, '')}
                        />
                      );
                    })}
                    {/* <DataCard
                      title={'Rent'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'rent'}
                    />
                    <DataCard
                      title={'Stationary'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'stationary'}
                    />
                    <DataCard
                      title={'Refreshment'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'refreshment'}
                    />
                    <DataCard
                      title={'Electricity'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'electricity'}
                    />
                    <DataCard
                      title={'Repair'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'repair'}
                    />
                    <DataCard
                      title={'Equipments'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'equipments'}
                    />
                    <DataCard
                      title={'Miscallaneous'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'miscallaneous'}
                    />
                    <DataCard
                      title={'Miscallaneous'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'miscallaneous'}
                    />
                    <DataCard
                      title={'Miscallaneous'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'miscallaneous'}
                    />
                    <DataCard
                      title={'Miscallaneous'}
                      subTitle={'11.00am'}
                      tailData={'$500'}
                      type={'miscallaneous'}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 grid grid-rows-12 gap-10 overflow-hidden">
              <div className="row-span-3 py-4 px-2">
                <OverviewCard title={'Spend so far'} value={totalExpense} />
              </div>
              <div className="row-span-9 bg-white  px-10 py-6 rounded-xl overflow-y-auto">
                <div className="row-span-1 flex flex-col justify-center space-y-1 overflow-hidden 3xl:pb-4">
                  <h3 className="text-lg 3xl:text-xl font-semibold">
                    Add Expense
                  </h3>
                  <h3 className="text-sm 3xl:text-lg">
                    Enter expense info to track your spending
                  </h3>
                </div>
                <div className="row-span-5 gap-2 py-4 3xl:grid 3x:grid-rows-5">
                  <div className="3xl:row-span-1  3xl:space-y-2 pb-3 3xl:pb-0">
                    <label
                      for="amount"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      {' '}
                      Amount{' '}
                    </label>
                    <input
                      type="text"
                      id="amount"
                      className="bg-[#f0f0f0] text-gray-600 bg text-sm 3xl:text-lg  rounded-md block w-full p-2 3xl:p-3 md:p-4 xl:p-2"
                      placeholder="Enter the amount"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="2xl:block 3xl:hidden pb-3 3xl:pb-0">
                    <label
                      htmlFor="category"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      {' '}
                      Category{' '}
                    </label>
                    <Select
                      options={options}
                      id="category"
                      isSearchable={false}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'blue' : 'white',
                          borderRadius: '8px',
                          padding: '0.05rem',
                          backgroundColor: '#f0f0f0',
                          fontSize: '14px',
                        }),
                      }}
                      onChange={(e) => setCategory(e.value)}
                    />
                  </div>
                  <div className="hidden 3xl:block 3xl:space-y-2 pb-3 3xl:pb-0">
                    <label
                      htmlFor="category"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      {' '}
                      Category{' '}
                    </label>
                    <Select
                      options={options}
                      id="category"
                      isSearchable={false}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'blue' : 'white',
                          borderRadius: '8px',
                          padding: '0.4rem',
                          backgroundColor: '#f0f0f0',
                          fontSize: '18px',
                        }),
                      }}
                      onChange={(e) => setCategory(e.value)}
                    />
                  </div>
                  <div className="3xl:space-y-2 pb-3 3xl:pb-0">
                    <label
                      for="description"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="bg-[#f0f0f0] text-gray-600 text-sm 3xl:text-lg rounded-md block w-full h-16 3xl:h-32 p-2 md:p-4 xl:p-2"
                      placeholder="Describe the expense"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="3xl:space-y-2 pb-3 3xl:pb-0">
                    <label
                      for="date"
                      className="block text-sm 3xl:text-lg font-medium text-gray-600"
                    >
                      {' '}
                      Date{' '}
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="bg-[#f0f0f0] px-3 border text-gray-600 text-sm 3xl:text-lg rounded-md w-full p-2 md:p-4 xl:p-2"
                      required
                      placeholder="Select date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  {console.log(date)}
                </div>
                <div className="row-span-1 w-full  flex flex-col justify-center 3xl:pt-8">
                  <Button
                    buttonStyle={`w-full bg-[#5266D7] text-white text-md 3xl:text-xl p-2 md:p-3 xl:p-2 3xl:p-3 rounded-lg`}
                    text={`Add`}
                    onClick={addExpenseHandler}
                  />
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />{' '}
              </div>
              {console.log(expenseData)}
              {console.log(totalExpense)}
            </div>
            {/* <div className=" col-span-3 grid grid-rows-5 pt-5">
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
            </div> */}
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
  );
}

export default ExpenseTracker;
