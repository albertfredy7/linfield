import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../Components/Button';
import SidebarNew from '../Components/SidebarNew';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRevenue() {
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const revenueCategories = [
    {
      value: 'Excess Registration',
      label: 'Excess Registration',
    },
    { value: 'Excess TOC', label: 'Excess TOC' },
    { value: 'Old Students Fee', label: 'Old Students Fee' },
    { value: 'Commissions', label: 'Commissions' },
    { value: 'Others', label: 'Others' },
  ];
  const navigate = useNavigate();

  const handleAddRevenue = async () => {
    try {
      const revenueData = {
        category: category,
        amount: amount,
        description: description,
        date: date,
      };

      const response = await axios.post(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/transactions/addRevenue',
        revenueData
      );

      // Handle the response from the API
      if (response.status >= 200 && response.status < 300) {
        // Successfully added revenue
        console.log('Revenue added successfully:', response.data);
        // You can also update the state or UI here if needed
        setCategory(null);
        setAmount(null);
        setDescription(null);
        setDate(null);

        navigate('/insights');
      } else {
        // Handle error
        console.error('Failed to add revenue:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding revenue:', error);
    }
  };
  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screen */}
        <div className="block md:hidden ">
          <div className="flex flex-col h-screen ">
            <div className="flex flex-col items-start px-5 pt-10">
              <h1 className="text-xl sm:text-2xl  font-bold ">
                Add new revenue
              </h1>
              <h2 className="text-[#66666] text-sm sm:text-lg  ">
                Please add details for revenue tracking.
              </h2>
            </div>

            <div className="px-5 flex flex-col py-5">
              <div className="flex flex-col gap-2">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-base text-gray-600 lg:text-xl pb-1"
                  >
                    Category
                  </label>
                  <Select
                    options={revenueCategories}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255,255,255)',
                      }),
                    }}
                    className="border border-gray-200 text-md lg:text-xl rounded"
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    name="category"
                    onChange={(e) => setCategory(e.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-md lg:text-xl text-gray-900 pb-1"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    id="amount"
                    className="bg-white text-gray-600 text-md border border-gray-200   text-md lg:text-xl rounded-lg block w-full p-2.5 focus:outline-blue-400"
                    placeholder="1000"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-md lg:text-xl text-gray-900 pb-1"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="bg-white text-gray-600 text-md border border-gray-200   text-md lg:text-xl rounded-lg block w-full p-2.5 focus:outline-blue-400"
                    placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-md lg:text-xl text-gray-900 pb-1"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="bg-white text-gray-600 text-md border border-gray-200   text-md lg:text-xl rounded-lg block w-full p-2.5 focus:outline-blue-400"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center pt-5">
                  <Button
                    text="Add Revenue"
                    buttonStyle="bg-[#2740CD] text-white p-3 text-md lg:text-xl rounded-xl w-full"
                    onClick={handleAddRevenue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tablet screen */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen overflow-hidden">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>
          <div className=" col-span-6 h-full px-12  3xl:grid-rows-12 overflow-hidden">
            <div className="pt-14">
              <h1 className="text-3xl lg:text-4xl font-semibold">
                Add new revenue
              </h1>
              <h1 className="text-sm lg:text-lg font-base text-[#333333]">
                Please add details for revenue tracking.
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600 pb-2 pt-8"
                >
                  Category
                </label>
                <Select
                  options={revenueCategories}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: '.5rem',
                      padding: '0.2rem',
                      borderWidth: '0px',
                      backgroundColor: 'RGB(255,255,255)',
                    }),
                  }}
                  className="border border-gray-200 rounded"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  name="category"
                  onChange={(e) => setCategory(e.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-600 pb-2"
                >
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  className="bg-white text-gray-600 border border-gray-200   rounded-lg block w-full p-2.5 focus:outline-blue-400"
                  placeholder="1000"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600 pb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white text-gray-600 border border-gray-200   rounded-lg block w-full p-2.5 focus:outline-blue-400"
                  placeholder="Description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-600 pb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="bg-white text-gray-600 border border-gray-200   rounded-lg block w-full p-2.5 focus:outline-blue-400"
                  placeholder="Date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-center pt-5">
                <Button
                  text="Add Revenue"
                  buttonStyle="bg-[#2740CD] text-white p-3 w-full rounded-xl"
                  onClick={handleAddRevenue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRevenue;
