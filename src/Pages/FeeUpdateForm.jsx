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
import { useNavigate, useParams } from 'react-router-dom';

function FeeUpdateForm() {
  const { number } = useParams();

  useEffect(() => {
    if (number == undefined) {
      window.alert('Please enter a valid student number');
    }
  }, []);

  const navigate = useNavigate();

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

  const [student, setStudent] = useState(null);
  const [transactions, setTransactions] = useState(null);

  //   const searchValueHandler = (value) => {
  //     setNumber(value);
  //   };

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

  const updateFeeHandler = async () => {
    //the conditions to satisfy stuffs
    if (feeType === 'examFees') {
      if (studentData.feeDetails.installments[0].isPaid === false) {
        window.alert('Please pay first term fees first to continue');
        return;
      } else if (
        studentData.feeDetails.examFees === null ||
        studentData.feeDetails.examFees === undefined
      ) {
        window.alert(
          'Exam fee for the student is not recorded. Please connect admin'
        );
        return;
      }
    } else if (feeType === 'registrationFees') {
      if (
        studentData.feeDetails.registrationFees === null ||
        studentData.feeDetails.registrationFees === undefined
      ) {
        window.alert(
          'Registration fee for the student is not recorded. Please connect admin'
        );
      }
      return;
    }

    let feeBody = {};

    feeBody.number = number;

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
      feeBody.amount = parseInt(amount);
      feeBody.utrNumber = utrNumber;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.put(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/students/fees/nios',
        feeBody,
        config
      );

      if (data.status === 'success') {
        window.alert('success');
        navigate('/');
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  let feeOptions = allFeeOptions;

  if (studentData.name) {
    const mode = studentData.mode;

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
    const fetchStudent = async () => {
      const { data } = await axios.get(
        `https://lobster-app-yjjm5.ondigitalocean.app/api/students/search/${number}`
      );
      if (data.name) {
        setStudentData(data);
      }
    };
    fetchStudent();
  }, []);

  useEffect(() => {
    const changeAmount = () => {
      if (
        studentData.name &&
        feeType === 'admissionFees' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData.feeDetails.admissionFees -
            studentData.feeDetails.admissionFeePaidAmount
        );
      } else if (
        studentData.name &&
        feeType === 'firstTerm' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData.feeDetails.installments[0].amount -
            studentData.feeDetails.installments[0].paidAmount
        );
      } else if (
        studentData.name &&
        feeType === 'secondTerm' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData.feeDetails.installments[1].amount -
            studentData.feeDetails.installments[1].paidAmount
        );
      } else if (
        studentData &&
        studentData.mode === 'Online' &&
        feeType === 'thirdTerm' &&
        paymentType === 'fullPayment'
      ) {
        setAmount(
          studentData.feeDetails.installments[2].amount -
            studentData.feeDetails.installments[2].paidAmount
        );
      } else {
        // Set a default value or handle the case when none of the conditions match
        return;
      }
    };

    changeAmount();
  }, [feeType, paymentType]);

  //   useEffect(() => {
  //     const changeAmount = () => {
  //       if (
  //         studentData &&
  //         studentData.length > 0 &&
  //         feeType === 'admissionFees' &&
  //         paymentType === 'fullPayment'
  //       ) {
  //         setAmount(
  //           studentData[0].feeDetails.admissionFees -
  //             studentData[0].feeDetails.admissionFeePaidAmount
  //         );
  //       } else if (
  //         studentData &&
  //         studentData.length > 0 &&
  //         feeType === 'firstTerm' &&
  //         paymentType === 'fullPayment'
  //       ) {
  //         setAmount(
  //           studentData[0].feeDetails.installments[0].amount -
  //             studentData[0].feeDetails.installments[0].paidAmount
  //         );
  //       } else if (
  //         studentData &&
  //         studentData.length > 0 &&
  //         feeType === 'secondTerm' &&
  //         paymentType === 'fullPayment'
  //       ) {
  //         setAmount(
  //           studentData[0].feeDetails.installments[1].amount -
  //             studentData[0].feeDetails.installments[1].paidAmount
  //         );
  //       } else if (
  //         studentData &&
  //         studentData.length > 0 &&
  //         studentData[0].mode === 'Online' &&
  //         feeType === 'thirdTerm' &&
  //         paymentType === 'fullPayment'
  //       ) {
  //         setAmount(
  //           studentData[0].feeDetails.installments[2].amount -
  //             studentData[0].feeDetails.installments[2].paidAmount
  //         );
  //       } else {
  //         // Set a default value or handle the case when none of the conditions match
  //         return;
  //       }
  //     };

  //     changeAmount();
  //   }),
  //     [feeType, paymentType];

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screen */}
        <div className="block md:hidden ">
          <div className="flex flex-col h-screen">
            <div className="flex flex-col px-5 pt-10">
              <h1 className="text-xl font-bold">Update Fee</h1>
              <h1 className="text-sm text-gray-500">
                Enter fee details to update{' '}
              </h1>
            </div>
            <div className="flex flex-col gap-3 px-6 pt-6 overflow-y-auto scroll-smooth">
              {
                <div className="space-y-2">
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
                          backgroundColor: 'RGB(255, 255, 255)',
                          fontSize: '1rem',
                        }),
                        singleValue: (baseStyles) => ({
                          ...baseStyles,
                          color: '#2E2E2E', // Change the color of the text inside the input container
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
                          backgroundColor: 'RGB(255, 255, 255)',
                          fontSize: '1rem',
                        }),
                        singleValue: (baseStyles) => ({
                          ...baseStyles,
                          color: '#2E2E2E', // Change the color of the text inside the input container
                        }),
                      }}
                      className=" bg-[#f0f0f0] 2xl:text-sm xl:text-xs 3xl:text-md text-gray-600 rounded-xl"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setPaymentType(e.value)}
                      name="feeType"
                      //   controlShouldRenderValue={
                      //     paymentType
                      //       ? true
                      //       : paymentType === false
                      //       ? true
                      //       : false
                      //   }
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
                          backgroundColor: 'RGB(255, 255, 255)',
                          fontSize: '1rem',
                        }),
                        singleValue: (baseStyles) => ({
                          ...baseStyles,
                          color: '#2E2E2E', // Change the color of the text inside the input container
                        }),
                      }}
                      className="border border-gray-200 rounded 2xl:text-sm xl:text-xs 3xl:text-md"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      name="paymentType"
                      onChange={(e) => setFeeType(e.value)}
                      //   controlShouldRenderValue={
                      //     feeType ? true : feeType === false ? true : false
                      //   }
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
                          backgroundColor: 'RGB(255, 255, 255)',
                          fontSize: '1rem',
                        }),
                        singleValue: (baseStyles) => ({
                          ...baseStyles,
                          color: '#2E2E2E', // Change the color of the text inside the input container
                        }),
                      }}
                      className="border border-gray-200 rounded 2xl:text-sm xl:text-xs 3xl:text-md"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      name="paymentType"
                      onChange={(e) => setFeeType(e.value)}
                      //   controlShouldRenderValue={
                      //     feeType ? true : feeType === false ? true : false
                      //   }
                    />
                  </div>
                  {feeType === 'customFee' && (
                    <div className="space-y-1">
                      <label
                        htmlFor="feeName"
                        className="block text-base 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-900 "
                      >
                        Custom fee name
                      </label>
                      <input
                        type="text"
                        id="feeName"
                        className="bg-[#ffffff] text-gray-700 border border-gray-200 text-base 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
                        placeholder="Enter custom fee"
                        onChange={(e) => setFeeName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label
                      htmlFor="amount"
                      className="block text-base 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-600 "
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      className="bg-[#ffffff] text-gray-700 text-base 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
                      placeholder="1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="utrNo"
                      className="block text-base 2xl:text-sm xl:text-xs 3xl:text-lg font-medium text-gray-600 "
                    >
                      Enter the UTR number
                    </label>
                    <input
                      type="text"
                      id="UtrNo"
                      className="bg-[#ffffff] 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-700 text-base rounded-lg block w-full p-2.5"
                      placeholder="CHJSU2UHBSA"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-end pt-3">
                    <Button
                      text={'Update Fee'}
                      buttonStyle={
                        'bg-[#2740CD] text-white rounded-lg  flex items-center justify-center px-2 py-3 text-md lg:text-xl xl:text-sm 3xl:text-lg  w-full'
                      }
                      onClick={() => updateFeeHandler()}
                    />
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="fixed bottom-0 right-0 w-full">
            <MobileNavigation />
          </div>
        </div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen overflow-hidden">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>
          <div className=" col-span-6 h-full px-12  3xl:grid-rows-12 overflow-hidden">
            <div className="pt-14">
              <h1 className="text-3xl lg:text-4xl font-semibold">Update Fee</h1>
              <h1 className="text-sm lg:text-lg font-base text-[#333333]">
                Update the fee of the student
              </h1>
            </div>

            <div className=" pt-10">
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
                      backgroundColor: 'RGB(255, 255, 255)',
                      fontSize: '0.9rem',
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: '#2E2E2E', // Change the color of the text inside the input container
                    }),
                  }}
                  className=" bg-[#ffffff] 2xl:text-sm xl:text-xs 4xl:text-md text-gray-600 rounded-xl"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  onChange={(e) => setPaymentType(e.value)}
                  name="feeType"
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
                      backgroundColor: 'RGB(255, 255, 255)',
                      fontSize: '1.03rem',
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: '#2E2E2E', // Change the color of the text inside the input container
                    }),
                  }}
                  className=" bg-[#f0f0f0] 2xl:text-sm xl:text-xs 3xl:text-md text-gray-600 rounded-xl"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  onChange={(e) => setPaymentType(e.value)}
                  name="feeType"
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
                      backgroundColor: 'RGB(255, 255, 255)',
                      fontSize: '.9rem',
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: '#2E2E2E', // Change the color of the text inside the input container
                    }),
                  }}
                  className="border border-gray-200 rounded 2xl:text-sm xl:text-xs 3xl:text-md"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  name="paymentType"
                  onChange={(e) => setFeeType(e.value)}
                  controlShouldRenderValue={
                    paymentType ? true : paymentType === false ? true : false
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
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: '#2E2E2E', // Change the color of the text inside the input container
                    }),
                  }}
                  className="border border-gray-200 rounded 2xl:text-sm xl:text-xs 3xl:text-md"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  name="paymentType"
                  onChange={(e) => setFeeType(e.value)}
                  controlShouldRenderValue={
                    paymentType ? true : paymentType === false ? true : false
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
                    className="bg-[#ffffff] text-gray-700 border border-gray-200 text-sm 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
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
                  className="bg-[#ffffff] text-gray-700 text-sm 2xl:text-sm xl:text-xs 3xl:text-lg rounded-lg block w-full p-2.5"
                  placeholder="1000"
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
                  className="bg-[#ffffff] 2xl:text-sm xl:text-xs 3xl:text-lg text-gray-700 text-sm rounded-lg block w-full p-2.5"
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
    </div>
  );
}

export default FeeUpdateForm;
