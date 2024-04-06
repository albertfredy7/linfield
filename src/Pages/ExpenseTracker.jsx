import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import MobileNavigation from '../Components/MobileNavigation';
import MobileDateSwitch from '../Components/MobileDateSwitch';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import DataCard from '../Components/DataCard';
import { Navigate, useNavigate } from 'react-router-dom';
import OverviewCard from '../Components/OverviewCard';
import DatePicker from '../Components/DatePicker';
import Button from '../Components/Button';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

function ExpenseTracker() {
  const navigate = useNavigate();

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
    // { value: 'PrintingandStationary', label: 'Printing & Stationary' },
    { value: 'Refreshment', label: 'Refreshment' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Repairs', label: 'Repairs' },
    { value: 'Equipments', label: 'Equipments' },
    { value: 'Miscellaneous Expense', label: 'Miscellaneous Expense' },
  ];

  const currentDate = new Date(Date.now());
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    currentDate
  );

  const handleDurationChange = (duration) => {
    console.log(duration);
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
        'https://lobster-app-yjjm5.ondigitalocean.app/api/expense/add',
        { category, description, amount, date },
        config
      );

      if (data.transaction && data.transaction.type) {
        window.alert('Expense added successfully');
      }
    } catch (error) {
      if (error.response) {
        // Extracting the error message from the response
        console.log(error.response.data.message);
        const errorMessage = error.response.data.message;
        window.alert(errorMessage);
      } else {
        // Handling other types of errors
        console.error('An error occurred:', error.message);
      }
    }
  };

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M'; // Convert to millions
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + 'L'; // Convert to lakhs
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K'; // Convert to thousands
    } else {
      return number;
    }
  };

  const fetchData = async () => {
    if (
      selectedDuration === 'today' ||
      selectedDuration === 'this_week' ||
      selectedDuration === 'this_month'
    ) {
      const { data } = await axios.get(
        `https://lobster-app-yjjm5.ondigitalocean.app/api/expense?duration=${selectedDuration}`
      );
      console.log(data);
      setExpenseData(data.expenses);
      setTotalExpense(formatNumber(data.totalAmount));
    } else {
      const { data } = await axios.get(
        `https://lobster-app-yjjm5.ondigitalocean.app/api/expense?duration=custom&start_date=${selectedDuration}&end_date=${selectedDuration}`
      );
      setExpenseData(data.expenses);
      setTotalExpense(formatNumber(data.totalAmount));
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDuration]);

  const formattedTodayDate = () => {
    const today = new Date();

    const options = {
      weekday: 'long', // Specify the full name of the weekday
      day: '2-digit', // Specify the day of the month as two digits
      month: 'short', // Specify the abbreviated month name
      year: 'numeric', // Specify the year as four digits
    };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    let formattedDate = dateFormatter.format(today);

    // Remove the comma between the day and month
    formattedDate = formattedDate.replace(',', '');

    return formattedDate;
  };

  return (
    <>
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
        <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6 ">
          {/* mobile screens */}
          <div className=" block md:hidden w-screen ">
            <div className="flex flex-col h-screen">
              <div className="flex flex-col pt-10 px-5 py-3 ">
                <h1 className="text-xl sm:text-2xl text-[#2740CD] font-bold ">
                  Hey Nishad 👋
                </h1>
                <h2 className="text-[#66666] text-sm text-nowrap pt-1">
                  Track your expenses, start your day right
                </h2>
                <div className="flex justify-center pt-2">
                  <MobileDateSwitch
                    duration={selectedDuration}
                    onSelect={handleDurationChange}
                  />
                </div>
              </div>
              <div>
                <MobileOverviewCard
                  title={'Spend so far'}
                  subtitle={totalExpense}
                />
              </div>
              <div className="flex justify-between items-center p-5 ">
                <h1 className="font-medium text-sm">{formattedTodayDate()}</h1>
                <button
                  className="bg-[#2740CD] text-white text-sm px-3 py-1 rounded-xl"
                  onClick={() => navigate('/add-expense')}
                >
                  Add
                </button>
              </div>
              <div className="px-3 flex flex-col gap-3  overflow-y-auto pb-32">
                {expenseData.length > 0 ? (
                  expenseData.map((x, idx) => (
                    <DataCard
                      title={x.category}
                      tailData={x.amount}
                      type={x.category.toLowerCase()}
                    />
                  ))
                ) : (
                  <div className="text-center text-base font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                    <img
                      src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                      className="mix-blend-multiply w-4/6"
                      alt=""
                    />
                    <h1 className="text-center text-gray-500">
                      No expense to show
                    </h1>
                  </div>
                )}
                {/* {expenseData.map((x, idx) => {
                  return (
                    <DataCard
                      title={x.category}
                      tailData={x.amount}
                      type={x.category.toLowerCase()}
                    />
                  );
                })} */}
                {/* <DataCard
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
                  type={'miscallaneous'} */}
                {/* /> */}
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
                    onClick={() => navigate('/add-expense')}
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
                            type={x.category.toLowerCase()}
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
                    </div> */}

                    {/* Add other DataCard components */}
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
                  onSelect={handleDurationChange}
                />
                {console.log(selectedDuration)}
              </div>
              <div className="row-span-3 3xl:row-span-4 pb-3 px-3 h-full">
                <div className=" w-full h-full overflow-y-auto">
                  <div className="space-y-3">
                    {expenseData.map((x, idx) => {
                      return (
                        <DataCard
                          title={x.category}
                          tailData={x.amount}
                          type={x.category.toLowerCase()}
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
                <OverviewCard title={'Spend so far'} value={'5000'} />
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
                      required
                      onChange={(e) => setDescription(e.target.value)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpenseTracker;
