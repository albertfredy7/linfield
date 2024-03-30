import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import SeachBar from '../Components/SeachBar';
import DataCard from '../Components/DataCard';
import Select from 'react-select';
import Button from '../Components/Button';
import MobileNavigation from '../Components/MobileNavigation';
import FeeStatus from '../Components/FeeStatus';
import axios from 'axios';

function UpdateFee() {
  const [feeType, setFeeType] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [feeName, setFeeName] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  const [studentDetails, setStudentDetails] = useState(null);
  const [amount, setAmount] = useState(null);
  const [utrNumber, setUtrNumber] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [number, setNumber] = useState(null);
  const [student, setStudent] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const searchValueHandler = (value) => {
    setNumber(value);
  };

  const feeOptions = [
    {
      label: 'Registration fee',
      value: 'registrationFees',
    },
    {
      label: 'Exam fee',
      value: 'examFees',
    },
    {
      label: 'First term fee',
      value: 'firstTerm',
    },
    {
      label: 'Second term fee',
      value: 'secondTerm',
    },
    {
      label: 'Third term fee',
      value: 'thirdTerm',
    },
    {
      label: 'Custom fee',
      value: 'customFee',
    },
  ];

  const paymentOptions = [
    {
      label: 'Full payment',
      value: 'fullPayment',
    },
    {
      label: 'Partial payment',
      value: 'partialPayment',
    },
  ];

  const paymentOptionsUpdated = [
    {
      label: 'Full payment',
      value: 'fullPayment',
    },
  ];

  const updateFeeHandler = async () => {
    let number = 1063;

    let feeBody = {};

    feeBody.number = 1063;

    if (!number || !feeType || !amount || !utrNumber) {
      window.alert('please enter all details');
      return;
    } else {
      if (feeType === 'firstTerm') {
        feeBody.installmentNumber = 1;
      } else if (feeType === 'secondTerm') {
        feeBody.installmentNumber = 2;
      } else if (feeType === 'thirdTerm') {
        feeBody.installmentNumber = 3;
      }
      if (feeName) {
        feeBody.feeName = feeName;
      }
      feeBody.feeType = feeType;
      feeBody.amount = amount;
      feeBody.utrNumber = utrNumber;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      'http://127.0.0.1:5000/api/students/fees/nios',
      feeBody,
      config
    );

    if (data.status === 'success') {
      window.alert('success');
    } else if (data.message && !data.status) {
      window.alert(data.message);
    }
  };

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden">
          <div className="grid grid-rows-12  h-screen">
            <div className=" row-span-2   flex items-center justify-between px-5">
              <div className=" px-5 flex flex-col">
                <h1 className=" text-xl  font-semibold">Update Fee</h1>
                <h1 className="text-[#333333] text-xs">
                  Update the fee of the student{' '}
                </h1>
              </div>
              <div className="  sm:pt-16">
                <Button
                  text={'Update'}
                  buttonStyle={
                    'bg-[#2740CD] text-white rounded-lg px-4 py-2 text-xs'
                  }
                  navigateUrl={'/feeUpdate'}
                />
              </div>
            </div>

            <div className="row-span-1 flex justify-center items-center ">
              <SeachBar />
            </div>
            {student && (
              <div className="row-span-1 px-5 ">
                <DataCard type="admissions" title="Berlin" tailData="SSLC" />
              </div>
            )}

            <div className="row-span-3  h-full sm:h-4/5 p-3">
              {/* <div className="grid grid-cols-3 gap-5 h-full  bg-white p-6  rounded-2xl">

                <div className="w-full ">
                  <button type="button" className={`w-full ${student && student.feeDetails.admissionFeePaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.admissionFeePaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                    <div><h1 className='text-sm sm:text-md'>Admn</h1></div>
                    <div><h1 className='text-sm sm:text-md'>Fee</h1></div>
                  </button>
                  <label className={`${student && student.feeDetails.admissionFeePaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>
                    {student && student.feeDetails.admissionFeePaid && `${student.feeDetails.admissionFeeAmount - student.feeDetails.admissionFeePaid} bal`}
                  </label>
                </div>


                <div className="w-full p-2">
                  <button type="button" className={`w-full ${student && student.feeDetails.registrationFeePaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.registrationFeePaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                    <div><h1 className='text-sm sm:text-md'>Reg</h1></div>
                    <div><h1 className='text-sm sm:text-md'>Fee</h1></div>
                  </button>
                  <label className={`${student && student.feeDetails.registrationFeePaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>
                    {student && student.feeDetails.registrationFeePaid && `${student.feeDetails.registrationFeeAmount - student.feeDetails.registrationFeePaid} bal`}
                  </label>
                </div>


                <div className="w-full p-2">
                  <button type="button" className={`w-full ${student && student.feeDetails.examFeePaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.examFeePaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                    <div><h1 className='text-sm sm:text-md'>Exam</h1></div>
                    <div><h1 className='text-sm sm:text-md'>Fee</h1></div>
                  </button>
                  <label className={`${student && student.feeDetails.examFeePaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>
                    {student && student.feeDetails.examFeePaid && `${student.feeDetails.examFeeAmount - student.feeDetails.examFeePaid} bal`}
                  </label>
                </div>
                <div className="w-full p-2">

                  <button type="button" className={`w-full ${student && student.feeDetails.installments[0].isPaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.installments[0].isPaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                    <div><h1 className='text-sm sm:text-md'>First</h1></div>
                    <div><h1 className='text-md'>Term</h1></div>
                  </button>

                  <label for="button" className={`${student && student.feeDetails.installments[0].isPaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>{student && student.feeDetails.installments[0].paidAmount > 0 && `${student.feeDetails.installments[0].amount - student.feeDetails.installments[0].paidAmount} bal`}</label>
                </div>
                <div className="w-full p-2">

                  <button type="button" className={`w-full ${student && student.feeDetails.installments[1].isPaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.installments[1].isPaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                    <div><h1 className='text-md'>Second</h1></div>
                    <div><h1 className='text-md'>Term</h1></div>
                  </button>
                  <label for="button" className={`${student && student.feeDetails.installments[1].isPaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>{student && student.feeDetails.installments[1].paidAmount > 0 && `${student.feeDetails.installments[1].amount - student.feeDetails.installments[1].paidAmount} bal`}</label>
                </div>
                <div className="w-full p-2">

                  <button type="button" className={`w-full ${student && student.feeDetails.installments[2].isPaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.installments[2].isPaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                    <div><h1 className='text-md'>Third</h1></div>
                    <div><h1 className='text-md'>Term</h1></div>
                  </button>
                  <label for="button" className={`${student && student.feeDetails.installments[2].isPaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>{student && student.feeDetails.installments[2].paidAmount > 0 && `${student.feeDetails.installments[2].amount - student.feeDetails.installments[2].paidAmount} bal`}</label>
                </div>
              </div> */}

              <FeeStatus />
            </div>

            <div className={` ${student} ? 'row-span-3' : row-span-5  px-3`}>
              <h1 className="text-md p-2 ">Recent Transactions</h1>
              <div className="overflow-y-auto scroll-smooth h-full  pb-10">
                <div className="space-y-3">
                  <DataCard
                    type="transactions"
                    title="Tution Fee"
                    subTitle="24 Mar 2023"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                  <DataCard
                    type="transactions"
                    title="Tution Fee"
                    subTitle="24 Mar 2023"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                  <DataCard
                    type="transactions"
                    title="Tution Fee"
                    subTitle="24 Mar 2023"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                  <DataCard
                    type="transactions"
                    title="Tution Fee"
                    subTitle="24 Mar 2023"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                  <DataCard
                    type="transactions"
                    title="Tution Fee"
                    subTitle="24 Mar 2023"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                  <DataCard
                    type="transactions"
                    title="Tution Fee"
                    subTitle="24 Mar 2023"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 right-0 w-full row-span-1">
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
          <div className="col-span-6 h-full  px-12 grid grid-rows-9 3xl:grid-rows-12 overflow-hidden ">
            <div className="row-span-1 3xl:row-span-2 flex flex-col justify-center 3xl:justify-center px-4 ">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl md:text-3xl lg:text-4xl 3xl:text-4xl font-semibold pt-10">
                    Udpate Fee
                  </h1>
                  <h1 className="text-md lg:text-xl 3xl:text-xl font-medium text-[#333333]">
                    Update the fee of the student
                  </h1>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    text={'Update Fee'}
                    buttonStyle={
                      'bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md lg:text-xl 3xl:text-base'
                    }
                    navigateUrl={'/feeUpdate'}
                  />
                </div>
              </div>
            </div>

            <div className="row-span-1  pt-5 lg:pt-8 px-5 ">
              <div className="">
                <SeachBar />
              </div>
            </div>

            <div className="row-span-1 h-4/5   ">
              <DataCard type="admissions" title="Berlin" tailData="SSLC" />
            </div>

            {/* <div className="row-span-2 grid grid-cols-3 gap-5 h-full bg-white p-8 rounded-2xl lg:p-12 ">
              <div className="w-full p-2">
                <button type="button" className={`w-full ${student && student.feeDetails.admissionFeePaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.admissionFeePaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                  <div><h1 className='text-md lg:text-lg'>Admn</h1></div>
                  <div><h1 className='text-md lg:text-lg'>Fee</h1></div>
                </button>
              </div>
              <div className="w-full p-2">
                <button type="button" className={`w-full ${student && student.feeDetails.registrationFeePaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.registrationFeePaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                  <div><h1 className='text-md lg:text-lg'>Reg</h1></div>
                  <div><h1 className='text-md lg:text-lg'>Fee</h1></div>
                </button>
              </div>
              <div className="w-full p-2">
                <button type="button" className={`w-full ${student && student.feeDetails.examFeePaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.examFeePaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                  <div><h1 className='text-md lg:text-lg'>Exam</h1></div>
                  <div><h1 className='text-md lg:text-lg'>Fee</h1></div>
                </button>
              </div>
              <div className="w-full p-2">
                <button type="button" className={`w-full ${student && student.feeDetails.installments[0].isPaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.installments[0].isPaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                  <div><h1 className='text-md lg:text-lg'>First</h1></div>
                  <div><h1 className='text-md lg:text-lg'>Term</h1></div>
                </button>
                <label for="button" className={`${student && student.feeDetails.installments[0].isPaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>{student && student.feeDetails.installments[0].paidAmount > 0 && `${student.feeDetails.installments[0].amount - student.feeDetails.installments[0].paidAmount} bal`}</label>
              </div>
              <div className="w-full p-2">
                <button type="button" className={`w-full ${student && student.feeDetails.installments[1].isPaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.installments[1].isPaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                  <div><h1 className='text-md lg:text-lg'>Second</h1></div>
                  <div><h1 className='text-md lg:text-lg'>Term</h1></div>
                </button>
                <label for="button" className={`${student && student.feeDetails.installments[1].isPaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>{student && student.feeDetails.installments[1].paidAmount > 0 && `${student.feeDetails.installments[1].amount - student.feeDetails.installments[1].paidAmount} bal`}</label>
              </div>
              <div className="w-full p-2">
                <button type="button" className={`w-full ${student && student.feeDetails.installments[2].isPaid ? 'text-green-500' : 'text-red-500'} border ${student && student.feeDetails.installments[2].isPaid ? 'border-green-500' : 'border-red-500'} font-medium rounded-lg text-sm px-1 py-1`}>
                  <div><h1 className='text-md lg:text-lg'>Third</h1></div>
                  <div><h1 className='text-md lg:text-lg'>Term</h1></div>
                </button>
                <label for="button" className={`${student && student.feeDetails.installments[2].isPaid ? 'hidden' : 'block'} text-xs font-medium text-red-600 mt-2 text-center`}>{student && student.feeDetails.installments[2].paidAmount > 0 && `${student.feeDetails.installments[2].amount - student.feeDetails.installments[2].paidAmount} bal`}</label>
              </div>
            </div> */}
            <div className="row-span-2">
              <FeeStatus />
            </div>

            <div className="row-span-4 pt-10">
              <h1 className="text-lg lg:text-xl pb-2">Recent Transactions</h1>
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid 3xl:grid-cols-11 xl:grid-cols-11 p-4 w-screen h-screen">
          <div className="col-span-2">
            <SidebarNew />
          </div>
          <div className="col-span-6 px-8 grid  3xl:grid-rows-10 xl:grid-rows-8  space-y-4 overflow-hidden pt-6 ">
            <div className="row-span-1 ">
              <div className="flex flex-col gap-0  px-5  ">
                <h1 className="text-xl 3xl:text-3xl font-semibold">
                  Update Fee
                </h1>
                <h1 className="text-md font-medium text-[#333333]">
                  Update the fee of the student
                </h1>
              </div>
            </div>
            <div className="row-span-1 h-full`   px-5 ">
              <DataCard type="admissions" title="Berlin" tailData="SSLC" />
            </div>
            <div className="3xl:row-span-8 xl:row-span-6  h-full grid grid-rows-8">
              <div className="3xl:row-span-4 xl:row-span-4 3xl:p-10 xl:p-5 ">
                <FeeStatus />
              </div>
              <div className="3xl:row-span-4 xl:row-span-4 overflow-hidden ">
                <h1 className="text-lg font-semibold ps-5 pb-2 pt-2">
                  Recent Transactions
                </h1>
                <div className="h-full overflow-y-auto flex flex-col gap-3 px-5 3xl:pb-14  ">
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle={'23 Mar 2024'}
                    midData={'CDHVHJGH122'}
                    tailData="SSLC"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 h-full overflow-hidden flex flex-col justify-center space-y-8 px-6">
            <SeachBar />

            <div className="flex flex-col justify-center">
              <div className="bg-white rounded-2xl p-5">
                <div className="flex flex-col px-3 py-3">
                  <h1 className="xl:text-xl 4xl:text-xl font-semibold">
                    Enter fee details to update
                  </h1>
                  {/* <h1 className="xl:text-sm 3xl:text-lg font-base text-[#333333]">
                    Update the fee of the student
                  </h1> */}
                </div>

                <div className="2xl:gap-1 xl:gap-5 px-3 pt-3 space-y-2 4xl:space-y-4">
                  <div className="space-y-1 3xl:hidden">
                    <label
                      for="feeType"
                      class="block xl:text-sm  text-gray-900 "
                    >
                      Select payment type
                    </label>
                    <Select
                      options={paymentOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(240, 240, 240)',
                          fontSize: '0.9rem',
                        }),
                      }}
                      className=" bg-[#f0f0f0] 2xl:text-sm xl:text-xs 4xl:text-md text-gray-600 rounded-xl"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setPaymentType(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        feeType ? true : feeType === false ? true : false
                      }
                    />
                  </div>
                  <div className="space-y-1 hidden 3xl:block">
                    <label
                      for="feeType"
                      class="block xl:text-sm 3xl:text-lg 4xl:text-lg text-gray-900 "
                    >
                      Select payment type
                    </label>
                    <Select
                      options={paymentOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(240, 240, 240)',
                          fontSize: '1.03rem',
                        }),
                      }}
                      className=" bg-[#f0f0f0] 2xl:text-sm xl:text-xs 3xl:text-md text-gray-600 rounded-xl"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setPaymentType(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        feeType ? true : feeType === false ? true : false
                      }
                    />
                  </div>
                  <div className="space-y-1 3xl:hidden">
                    <label
                      for="paymentType"
                      class="block 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
                    >
                      Select fee type
                    </label>
                    <Select
                      options={feeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.2rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(240, 240, 240)',
                          fontSize: '.9rem',
                        }),
                      }}
                      className="border border-gray-200 rounded 2xl:text-sm xl:text-xs 3xl:text-md"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      name="paymentType"
                      onChange={(e) => setFeeType(e.value)}
                      controlShouldRenderValue={
                        paymentType
                          ? true
                          : paymentType === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="space-y-1 hidden 3xl:block">
                    <label
                      for="paymentType"
                      class="block 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
                    >
                      Select fee type
                    </label>
                    <Select
                      options={feeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.2rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(240, 240, 240)',
                          fontSize: '1.03rem',
                        }),
                      }}
                      className="border border-gray-200 rounded 2xl:text-sm xl:text-xs 3xl:text-md"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      name="paymentType"
                      onChange={(e) => setFeeType(e.value)}
                      controlShouldRenderValue={
                        paymentType
                          ? true
                          : paymentType === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  {feeType === 'customFee' && (
                    <div className="space-y-1">
                      <label
                        for="feeName"
                        class="block text-sm 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
                      >
                        Custom fee name
                      </label>
                      <input
                        type="text"
                        id="feeName"
                        className="bg-[#f0f0f0] text-gray-600 border border-gray-200 text-sm 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
                        placeholder="Enter custom fee"
                        onChange={(e) => setFeeName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label
                      for="amount"
                      class="block text-sm 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      class="bg-[#f0f0f0] text-gray-600 text-sm 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
                      placeholder="1000"
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      for="utrNo"
                      class="block text-sm 2xl:text-sm xl:text-xs 3xl:text-lg font-medium text-gray-900 "
                    >
                      Enter the UTR number
                    </label>
                    <input
                      type="text"
                      id="UtrNo"
                      class="bg-[#f0f0f0] 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-600 text-sm rounded-lg block w-full p-2.5"
                      placeholder="CHJSU2UHBSA"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-end py-3">
                    <Button
                      text={'Update Fee'}
                      buttonStyle={
                        'bg-[#2740CD] text-white rounded-lg  flex items-center justify-center px-2 py-2 text-md lg:text-xl xl:text-sm 3xl:text-lg  w-full'
                      }
                      onClick={updateFeeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-span-3 h-full  grid grid-rows-11 overflow-hidden  pt-12 bg-red-200">
            <div className="  row-span-1 px-5 ">
              <SeachBar />
            </div>
            <div className="row-span-10  3xl:row-span-9 px-8 py-3">
              <div className="bg-white h-full grid grid-rows-6  rounded-2xl p-5 ">
                <div className="flex flex-col p-5 row-span-1 ">
                  <h1 className="xl:text-lg 3xl:text-3xl font-semibold">
                    Update Fee
                  </h1>
                  <h1 className="xl:text-sm 3xl:text-lg font-base text-[#333333]">
                    Update the fee of the student
                  </h1>
                </div>

                <div className=" xl:row-span-5 3xl:row-span-4 grid xl:grid-rows-6 3xl:grid-rows-6 2xl:gap-1 xl:gap-5  px-3 xl:pt-3">
                  <div class=" row-span-1">
                    <label
                      for="feeType"
                      class="block text-sm 2xl:text-sm xl:text-xs font-medium text-gray-900 "
                    >
                      Select payment type
                    </label>
                    <Select
                      options={paymentOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.2rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(240, 240, 240)',
                        }),
                      }}
                      className="border border-gray-200 rounded bg-[#f0f0f0] 2xl:text-sm xl:text-xs text-gray-600"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setFeeType(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        feeType ? true : feeType === false ? true : false
                      }
                    />
                  </div>
                  <div class={` row-span-1`}>
                    <label
                      for="paymentType"
                      class="block 2xl:text-sm xl:text-xs xl: font-medium text-gray-900 "
                    >
                      Select fee type
                    </label>
                    <Select
                      options={feeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.2rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(240, 240, 240)',
                        }),
                      }}
                      className="border border-gray-200 rounded 2xl:text-sm xl:text-xs"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      name="paymentType"
                      onChange={(e) => setPaymentType(e.value)}
                      controlShouldRenderValue={
                        paymentType
                          ? true
                          : paymentType === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  <div class="row-span-1">
                    <label
                      for="amount"
                      class="block text-sm 2xl:text-sm xl:text-xs font-medium text-gray-900 "
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      class="bg-[#f0f0f0] text-gray-600 border border-gray-200   text-sm 2xl:text-sm xl:text-xs rounded-lg block w-full p-2.5 focus:outline-blue-400"
                      placeholder="1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div class="row-span-1">
                    <label
                      for="utrNo"
                      class="block text-sm 2xl:text-sm xl:text-xs font-medium text-gray-900 "
                    >
                      Enter the UTR number
                    </label>
                    <input
                      type="text"
                      id="UtrNo"
                      class="bg-[#f0f0f0] 2xl:text-sm xl:text-xs text-gray-600 border border-gray-200   text-sm rounded-lg block w-full p-2.5 focus:outline-blue-400"
                      placeholder="CHJSU2UHBSA"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div class="row-span-1">
                    <label
                      for="utrNo"
                      class="block text-sm 2xl:text-sm xl:text-xs font-medium text-gray-900 "
                    >
                      Enter the UTR number
                    </label>
                    <input
                      type="text"
                      id="UtrNo"
                      class="bg-[#f0f0f0] 2xl:text-sm xl:text-xs text-gray-600 border border-gray-200   text-sm rounded-lg block w-full p-2.5 focus:outline-blue-400"
                      placeholder="CHJSU2UHBSA"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row-span-1  flex items-end pb-5 ">
                    <Button
                      text={'Update Fee'}
                      buttonStyle={
                        'bg-[#2740CD] text-white rounded-lg  flex items-center justify-center px-2 py-2 text-md lg:text-xl xl:text-sm 2xl:text-md 3xl:text-base  w-full'
                      }
                      onClick={updateFeeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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

export default UpdateFee;
