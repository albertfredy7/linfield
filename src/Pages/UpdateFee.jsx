import React, { useEffect, useState } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function UpdateFee() {
  const [feeType, setFeeType] = useState(null);
  const [feeName, setFeeName] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  const [studentDetails, setStudentDetails] = useState(null);
  const [amount, setAmount] = useState(null);
  const [utrNumber, setUtrNumber] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [number, setNumber] = useState(null);
  const [student, setStudent] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  //defining the navigate for navigation purposes
  const navigate = useNavigate();

  const searchValueHandler = (value) => {
    setNumber(value);
  };

  const allFeeOptions = [
    {
      label: 'Admission fee',
      value: 'admissionFees',
    },
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

  const performSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://lobster-app-yjjm5.ondigitalocean.app/api/students/search/${query}`
      );
      const data = response.data;
      setSearchValue(query);

      // Validate the response data
      if (Array.isArray(data)) {
        setStudentData(data);
        if (data.length > 0) {
          // Extract the admissionNumber from the first result
          const admissionNumber = data[0].admissionNumber;
          // Perform the second API call using the admissionNumber
          const transactionsResponse = await axios.get(
            `https://lobster-app-yjjm5.ondigitalocean.app/api/students/studentTransactions/${admissionNumber}`
          );
          // Assuming the response contains the transactions data
          setTransactions(transactionsResponse.data);
        } else {
          // Clear transactions if no student data is found
          setTransactions([]);
        }
      } else if (typeof data === 'object' && data !== null) {
        // If the response is an object, wrap it in an array
        setStudentData([data]);
        if (data.admissionNumber) {
          // Perform the second API call using the admissionNumber from the object
          const transactionsResponse = await axios.get(
            `https://lobster-app-yjjm5.ondigitalocean.app/api/students/studentTransactions/${data.admissionNumber}`
          );
          // Assuming the response contains the transactions data
          setTransactions(transactionsResponse.data);
        } else {
          // Clear transactions if the object does not contain a valid admissionNumber
          setTransactions([]);
        }
      } else {
        setStudentData([]);
        // Clear transactions if the response is not valid
        setTransactions([]);
      }
    } catch (error) {
      window.alert('No student data available');
      setStudentData([]);
      // Clear transactions on error
      setTransactions([]);
    }
  };

  const updateFeeHandler = async () => {
    // the conditions to satisfy stuffs
    if (feeType === 'examFees') {
      if (studentData[0].feeDetails.installments[0].isPaid === false) {
        window.alert('Please pay first term fees first to continue');
        return;
      } else if (
        studentData[0].feeDetails.examFees === null ||
        studentData[0].feeDetails.examFees === undefined
      ) {
        window.alert(
          'Exam fee for the student is not recorded. Please connect admin'
        );
        return;
      }
    } else if (feeType === 'registrationFees') {
      if (!studentData[0].feeDetails.registrationFees) {
        window.alert(
          'Registration fee for the student is not recorded. Please connect admin'
        );
      }
      return;
    }

    let feeBody = {};

    feeBody.number = studentData[0].admissionNumber;

    if (!studentData[0].admissionNumber || !feeType || !amount || !utrNumber) {
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
      feeBody.amount = parseInt(amount);
      feeBody.utrNumber = utrNumber;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading(true);

    try {
      console.log('Sending request with body:', feeBody);
      const { data } = await axios.put(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/students/fees/nios',
        feeBody,
        config
      );
      console.log('Response received:', data);

      if (data.status === 'success') {
        window.alert('Fee info updated successfully');
        navigate('/');
      } else {
        // This handles any case where the status is not 'success'
        console.log('Unexpected status received:', data.status);
        window.alert('Something went wrong: ' + data.message);
      }
    } catch (error) {
      // Log the error to understand what went wrong
      console.error('An error occurred:', error);
      window.alert('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  let feeOptions = allFeeOptions;

  if (studentData.length > 0) {
    const mode = studentData[0].mode;

    if (mode === 'Correspondent') {
      feeOptions = feeOptions.filter((option) =>
        ['examFees', 'registrationFees', 'admissionFees'].includes(option.value)
      );
    } else if (mode === 'Offline') {
      feeOptions = feeOptions.filter((option) =>
        [
          'admissionFees',
          'registrationFees',
          'examFees',
          'firstTerm',
          'secondTerm',
        ].includes(option.value)
      );
    }
  }

  useEffect(() => {
    const changeAmount = () => {
      if (
        studentData &&
        studentData.length > 0 &&
        feeType === 'admissionFees' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData[0].feeDetails.admissionFees -
            studentData[0].feeDetails.admissionFeePaidAmount
        );
      } else if (
        studentData &&
        studentData.length > 0 &&
        feeType === 'firstTerm' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData[0].feeDetails.installments[0].amount -
            studentData[0].feeDetails.installments[0].paidAmount
        );
      } else if (
        studentData &&
        studentData.length > 0 &&
        feeType === 'secondTerm' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData[0].feeDetails.installments[1].amount -
            studentData[0].feeDetails.installments[1].paidAmount
        );
      } else if (
        studentData &&
        studentData.length > 0 &&
        studentData[0].mode === 'Online' &&
        feeType === 'thirdTerm' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData[0].feeDetails.installments[2].amount -
            studentData[0].feeDetails.installments[2].paidAmount
        );
      } else {
        // Set a default value or handle the case when none of the conditions match
        return;
      }
    };

    changeAmount();
  }),
    [feeType, paymentType];

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden">
          <div className="h-screen pt-10 pb-4 px-5 overflow-hidden ">
            <div className="h-full w-full  grid grid-rows-9 space-y-2">
              <div className="row-span-1  flex justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold ">Update fee</h1>
                  <h2 className="text-[#333333] text-sm pt-1 text-nowrap">
                    Update the fees of stduents
                  </h2>
                </div>
                <div
                  className={`${
                    studentData.length > 0 ? 'block' : 'hidden'
                  } flex items-center pb-5`}
                >
                  <Button
                    text={'Update'}
                    buttonStyle={`bg-[#2740CD] text-white rounded-lg px-4 py-2 text-xs ${
                      studentData[0]?.admissionNumber ? 'block' : 'block'
                    }`}
                    navigateUrl={`/feeUpdate/${studentData[0]?.admissionNumber}`}
                  />
                </div>
              </div>
              <div className="row-span-2 ">
                <div className="h-full w-full grid grid-rows-2 space-y-1">
                  <div className=" pt-3">
                    <SeachBar onSearch={performSearch} />
                  </div>
                  <div className="">
                    {studentData.length > 0 ? (
                      studentData.map((student, index) => (
                        <DataCard
                          key={index}
                          type="admissions"
                          title={student.name}
                          tailData={student.course}
                        />
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center">
                        <h1 className="text-lg font-semibold text-gray-500">
                          No student data available
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row-span-2  grid grid-rows-6 ">
                <div className="row-span-5">
                  <FeeStatus studentData={studentData} />
                </div>
                <div
                  className={`${
                    studentData.length > 0 ? 'flex' : 'hidden'
                  } text-gray-500  justify-start items-center pt-5 pb-2 space-x-5 text-sm`}
                >
                  <h2>
                    Paid:{' '}
                    <span className="text-green-500">
                      {studentData.length > 0 &&
                        studentData[0].feeDetails.paidAmount}
                    </span>
                  </h2>
                  <h2>
                    Outstanding:{' '}
                    <span className="text-red-500">
                      {studentData.length > 0 &&
                        studentData[0].feeDetails.totalAmount -
                          (studentData[0].feeDetails.installments[0]
                            .paidAmount +
                            studentData[0].feeDetails.installments[1]
                              .paidAmount +
                            studentData[0].feeDetails.installments[2]
                              .paidAmount +
                            studentData[0].feeDetails.admissionFeePaidAmount)}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row-span-4  overflow-hidden pb-12">
                <div className="h-full w-full p-2 overflow-y-auto space-y-2">
                  {transactions && transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <DataCard
                        key={index}
                        type="transactions"
                        title={transaction.purpose}
                        subTitle={format(
                          new Date(transaction.date),
                          'dd MMM yy, hh:mm'
                        )}
                        midData={transaction.utrNumber}
                        tailData={`+ ${transaction.amount}`}
                        tailDataStyle={`${'text-green-600 font-semibold'}`}
                      />
                    ))
                  ) : (
                    <div className="text-center text-base font-semibold overflow-y-hidden flex flex-col justify-center items-center bg-[#f0f0f0]">
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply"
                        alt=""
                      />
                      <h1 className="text-center text-lg font-semibold text-gray-500">
                        No transactions available
                      </h1>
                    </div>
                  )}
                </div>
              </div>
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
          <div className="col-span-6 h-full  px-12 grid grid-rows-9 3xl:grid-rows-12 overflow-hidden ">
            <Toaster position="top-center" reverseOrder={false} />
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
                    text={'Update'}
                    buttonStyle={`bg-[#2740CD] text-white rounded-lg px-4 py-2 text-xs ${
                      studentData[0]?.admissionNumber ? 'block' : 'hidden'
                    }`}
                    navigateUrl={`/feeUpdate/${studentData[0]?.admissionNumber}`}
                  />
                </div>
              </div>
            </div>

            <div className="row-span-1  pt-5 lg:pt-8 px-5 ">
              <div className="">
                <SeachBar onSearch={performSearch} />
              </div>
            </div>

            <div className="row-span-1 h-4/5   ">
              {studentData.length > 0 ? (
                studentData.map((student, index) => (
                  <DataCard
                    key={index}
                    type="admissions"
                    title={student.name}
                    tailData={student.course}
                  />
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <h1 className="text-lg font-semibold text-[#333333]">
                    No student data available
                  </h1>
                </div>
              )}
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
              <FeeStatus studentData={studentData} />
            </div>

            <div className="row-span-4 pt-10">
              <h1 className="text-lg lg:text-xl pb-2">Recent Transactions</h1>
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
                  {transactions && transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <DataCard
                        key={index}
                        type="transactions"
                        title={transaction.purpose}
                        subTitle={format(
                          new Date(transaction.date),
                          'dd MMM yyyy , hh:mm a'
                        )}
                        midData={transaction.utrNumber}
                        tailData={transaction.amount}
                      />
                    ))
                  ) : (
                    <div>
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply"
                        alt=""
                      />
                      <h1 className="text-center text-lg font-semibold lead text-[#333333]">
                        No transactions available
                      </h1>
                    </div>
                  )}
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
          <div className="col-span-6 px-8 grid  3xl:grid-rows-10 xl:grid-rows-8  space-y-4 overflow-hidden pt-6 4xl:pt-10">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="row-span-1 ">
              <div className="flex flex-col gap-0  px-5  ">
                <h1 className="text-xl 3xl:text-2xl font-semibold">
                  Update Fee
                </h1>
                <h1 className="text-md 3xl:text-lg font-medium text-[#333333]">
                  Update the fee of the student
                </h1>
              </div>
            </div>
            <div className="row-span-1 h-full`   px-5 ">
              {studentData.length > 0 ? (
                studentData.map((student, index) => (
                  <DataCard
                    key={index}
                    type="admissions"
                    title={student.name}
                    tailData={student.course}
                  />
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <h1 className="text-lg font-semibold text-[#333333]">
                    No student data available
                  </h1>
                </div>
              )}
            </div>
            <div className="3xl:row-span-8 xl:row-span-6  h-full grid grid-rows-8">
              <div className="3xl:row-span-2 4xl:row-span-3 xl:row-span-3 3xl:px-10 xl:px-5 py-2 flex items-center ">
                <FeeStatus studentData={studentData} />
              </div>
              <div className="3xl:row-span-6 4xl:row-span-5 xl:row-span-5 overflow-hidden ">
                <h1 className="text-lg 4xl:text-xl font-semibold pb-2 pt-8 px-5">
                  Recent Transactions{' '}
                </h1>
                <div className="h-full overflow-y-auto space-y-2 px-5  pb-20">
                  {transactions && transactions.length > 0 ? (
                    transactions.map((transaction) => {
                      return (
                        <DataCard
                          key={transaction._id} // Assuming _id is a unique identifier
                          type="transactions"
                          title={transaction.purpose}
                          subTitle={format(
                            new Date(transaction.date),
                            'dd MMM yyyy , hh:mm a'
                          )}
                          midData={transaction.utrNumber}
                          tailData={transaction.amount}
                        />
                      );
                    })
                  ) : (
                    <div className=" xl:flex xl:flex-col justify-center items-center">
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply xl:w-1/2"
                        alt=""
                      />
                      <h1 className="text-center text-lg font-semibold text-[#333333]">
                        No transactions available
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 h-full overflow-hidden flex flex-col justify-center space-y-8 px-6">
            <SeachBar onSearch={performSearch} />

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
                      htmlFor="feeType"
                      className="block xl:text-sm  text-gray-900 "
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
                      htmlFor="feeType"
                      className="block xl:text-sm 3xl:text-lg 4xl:text-lg text-gray-900 "
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
                        paymentType
                          ? true
                          : paymentType === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="space-y-1 3xl:hidden">
                    <label
                      htmlFor="paymentType"
                      className="block 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
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
                        feeType ? true : feeType === false ? true : false
                      }
                    />
                  </div>
                  <div className="space-y-1 hidden 3xl:block">
                    <label
                      htmlFor="paymentType"
                      className="block 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
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
                        feeType ? true : feeType === false ? true : false
                      }
                    />
                  </div>
                  {feeType === 'customFee' && (
                    <div className="space-y-1">
                      <label
                        htmlFor="feeName"
                        className="block text-sm 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
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
                      htmlFor="amount"
                      className="block text-sm 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      className="bg-[#f0f0f0] text-gray-600 text-sm 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
                      placeholder="1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="utrNo"
                      className="block text-sm 2xl:text-sm xl:text-xs 3xl:text-lg font-medium text-gray-900 "
                    >
                      Enter the UTR number
                    </label>
                    <input
                      type="text"
                      id="UtrNo"
                      className="bg-[#f0f0f0] 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-600 text-sm rounded-lg block w-full p-2.5"
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
                      Icon={HourglassEmptyIcon}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateFee;
