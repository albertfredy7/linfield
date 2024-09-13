import React, { useEffect, useState } from 'react';
import MobileNavigation from '../Components/MobileNavigation';
import Select from 'react-select';
import Button from '../Components/Button';
import SidebarNew from '../Components/SidebarNew';
import { useSelector, useDispatch } from 'react-redux';
import { filterStudents } from '../actions/studentFilterActions';
import { useNavigate } from 'react-router-dom';

function Filter() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const filterStudentsData = useSelector((state) => state.studentFilter);
   const { loading, filteredStudents } = filterStudentsData;

   const [admYear, setAdmYear] = useState(null);
   const [course, setCourse] = useState(null);
   const [batch, setBatch] = useState(null);
   const [intake, setIntake] = useState(null);
   const [mode, setMode] = useState(null);
   const [pendingFee, setPendingFee] = useState(null);
   const [registrationStatus, setRegistrationStatus] = useState(null);
   const [academicStatus, setAcademicStatus] = useState(null);
   const [examMonth, setExamMonth] = useState(null);
   const [examCenter, setExamCenter] = useState(null);
   const [tmaRecieved, setTmaRecieved] = useState(null);
   const [tmaSubmitted, setTmaSubmitted] = useState(null);
   const [tocRecieved, setTocRecieved] = useState(null);
   const [tocSubmitted, setTocSubmitted] = useState(null);

   const yearOptions = [
      {
         label: 2024,
         value: 2024,
      },
      {
         label: 2025,
         value: 2025,
      },
      {
         label: 2026,
         value: 2026,
      },
      {
         label: 2027,
         value: 2027,
      },
      {
         label: 2028,
         value: 2028,
      },
   ];
   const courseOptions = [
      {
         value: 'SSLC',
         label: 'SSLC',
      },
      {
         value: 'Plustwo',
         label: 'Plustwo',
      },
   ];
   const batchOptions = [
      {
         value: 'Science',
         label: 'Science',
      },
      {
         value: 'Commerce',
         label: 'Commerce',
      },
      {
         value: 'Humanities',
         label: 'Humanities',
      },
   ];

   const modeOptions = [
      {
         value: 'Online',
         label: 'Online',
      },
      {
         value: 'Offline',
         label: 'Offline',
      },
      // {
      //   value: 'Correspondent',
      //   label: 'Correspondent',
      // },
   ];
   const intakeOptions = [
      {
         value: 'March',
         label: 'March',
      },
      {
         value: 'September',
         label: 'September',
      },
   ];

   const pendingFeeOptions = [
      {
         value: 'admissionFees',
         label: 'Admission Fee',
      },
      {
         value: 'registrationFees',
         label: 'Registration Fee',
      },
      {
         value: 'examFees',
         label: 'Exam Fee',
      },
      {
         value: 'firstTerm',
         label: 'First Term Fee',
      },
      {
         value: 'secondTerm',
         label: 'Second Term Fee',
      },
      // {
      //    value: 'thirdTerm',
      //    label: 'Third Term Fee',
      // },
   ];

   const registrationStatusOptions = [
      {
         value: 'Registered',
         label: 'Registered',
      },
      {
         value: 'NotRegistered',
         label: 'Not Registered',
      },
   ];

   const academicStatusOptions = [
      {
         value: 'Pass',
         label: 'Pass',
      },
      {
         value: 'Fail',
         label: 'Fail',
      },
      {
         value: 'Cancelled',
         label: 'Cancelled',
      },
      {
         value: 'Rejoined',
         label: 'Rejoined',
      },
   ];
   const examMonthOptions = [
      {
         value: 'January',
         label: 'January',
      },
      {
         value: 'February',
         label: 'February',
      },
      {
         value: 'March',
         label: 'March',
      },
      {
         value: 'April',
         label: 'April',
      },
      {
         value: 'May',
         label: 'May',
      },
      {
         value: 'June',
         label: 'June',
      },
      {
         value: 'July',
         label: 'July',
      },
      {
         value: 'August',
         label: 'August',
      },
      {
         value: 'September',
         label: 'September',
      },
      {
         value: 'October',
         label: 'October',
      },
      {
         value: 'November',
         label: 'November',
      },
      {
         value: 'December',
         label: 'December',
      },
   ];
   const examCenterOptions = [
      {
         value: 'center1',
         label: 'Center 1',
      },
      {
         value: 'center2',
         label: 'Center 2',
      },
      {
         value: 'center3',
         label: 'Center 3',
      },
      {
         value: 'center4',
         label: 'Center 4',
      },
      {
         value: 'center5',
         label: 'Center 5',
      },
      {
         value: 'center6',
         label: 'Center 6',
      },
      {
         value: 'center7',
         label: 'Center 7',
      },
      {
         value: 'center8',
         label: 'Center 8',
      },
      {
         value: 'center9',
         label: 'Center 9',
      },
      {
         value: 'center10',
         label: 'Center 10',
      },
   ];

   const tmaRecievedOptions = [
      {
         value: true,
         label: 'True',
      },
      {
         value: false,
         label: 'False',
      },
   ];

   const tmaSubmittedOptions = [
      {
         value: true,
         label: 'True',
      },
      {
         value: false,
         label: 'False',
      },
   ];

   const tocRecievedOptions = [
      {
         value: true,
         label: 'True',
      },
      {
         value: false,
         label: 'False',
      },
   ];
   const tocSubmittedOptions = [
      {
         value: true,
         label: 'True',
      },
      {
         value: false,
         label: 'False',
      },
   ];

   const applyFilter = async () => {
      // Create an object to hold the filter criteria
      const filterCriteria = {};

      // Add filter criteria to the object if they are not null
      if (admYear !== null) filterCriteria.year = admYear;
      if (course !== null) filterCriteria.course = course;
      if (batch !== null) filterCriteria.batch = batch;
      if (mode !== null) filterCriteria.mode = mode;
      if (intake !== null) filterCriteria.intake = intake;
      if (pendingFee !== null) filterCriteria.pendingFee = pendingFee;
      if (registrationStatus !== null)
         filterCriteria.registrationStatus = registrationStatus;
      if (academicStatus !== null)
         filterCriteria.academicStatus = academicStatus;
      if (examMonth !== null) filterCriteria.examMonth = examMonth;
      if (examCenter !== null) filterCriteria.examCenter = examCenter;
      if (tmaRecieved !== null) filterCriteria.tmaReceived = tmaRecieved;
      if (tmaSubmitted !== null) filterCriteria.tmaSubmitted = tmaSubmitted;
      if (tocRecieved !== null) filterCriteria.tocReceived = tocRecieved;
      if (tocSubmitted !== null) filterCriteria.tocSubmitted = tocSubmitted;

      console.log(`${filterCriteria.intake}`);

      dispatch(filterStudents({ filterObject: filterCriteria }));
   };

   return (
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
         <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
            {/* mobile screen */}
            <div className="block md:hidden bg-[#f0f0f0]">
               <div className="flex flex-col h-screen">
                  <div className="flex flex-col px-5 pt-10">
                     <h1 className="text-xl text-[#2740CD] font-bold">
                        Filter Students
                     </h1>
                     <p className="text-gray-500">
                        Filter students based on selected criteria
                     </p>
                  </div>
                  <div className="flex flex-col gap-3 px-6 overflow-y-auto scroll-smooth pt-6">
                     <div>
                        <label
                           htmlFor="year"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Year
                        </label>
                        <Select
                           options={yearOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setAdmYear(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              admYear ? true : admYear === false ? true : false
                           }
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="course"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Course
                        </label>
                        <Select
                           options={courseOptions}
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
                           className="border-white text-sm"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setCourse(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              course ? true : course === false ? true : false
                           }
                        />
                     </div>
                     {course == 'Plustwo' && (
                        <div>
                           <label
                              htmlFor="batch"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Batch
                           </label>
                           <Select
                              options={batchOptions}
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
                              className="border-white text-base text-gray-500"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setBatch(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 batch ? true : batch === false ? true : false
                              }
                           />
                        </div>
                     )}

                     <div>
                        <label
                           htmlFor="mode"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Mode
                        </label>
                        <Select
                           options={modeOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setMode(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              mode ? true : mode === false ? true : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="intake"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Intake
                        </label>
                        <Select
                           options={intakeOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setIntake(e.value)}
                           name="intake"
                           controlShouldRenderValue={
                              intake ? true : intake === false ? true : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="mode"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Pending Fee
                        </label>
                        <Select
                           options={pendingFeeOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setPendingFee(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              pendingFee
                                 ? true
                                 : pendingFee === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="registrationStatus"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Registration Status
                        </label>
                        <Select
                           options={registrationStatusOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setRegistrationStatus(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              registrationStatus
                                 ? true
                                 : registrationStatus === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="academicStatus"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Academic Status
                        </label>
                        <Select
                           options={academicStatusOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setAcademicStatus(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              academicStatus
                                 ? true
                                 : academicStatus === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="examMonth"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Exam Month
                        </label>
                        <Select
                           options={examMonthOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setExamMonth(e.value)}
                           name="feeType"
                           controlShouldRenderValue={
                              examMonth
                                 ? true
                                 : examMonth === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="examCenter"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           Exam Center
                        </label>
                        <Select
                           options={examCenterOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setExamCenter(e.value)}
                           name="examCenter"
                           controlShouldRenderValue={
                              examCenter
                                 ? true
                                 : examCenter === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="tmaRecieved"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           TMA Recieved
                        </label>
                        <Select
                           options={tmaRecievedOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setTmaRecieved(e.value)}
                           name="tmaRecieved"
                           controlShouldRenderValue={
                              tmaRecieved
                                 ? true
                                 : tmaRecieved === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="tmaSubmitted"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           TMA Submitted
                        </label>
                        <Select
                           options={tmaSubmittedOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setTmaSubmitted(e.value)}
                           name="tmaSubmitted"
                           controlShouldRenderValue={
                              tmaSubmitted
                                 ? true
                                 : tmaSubmitted === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="tocRecieved"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           TOC Recieved
                        </label>
                        <Select
                           options={tocRecievedOptions}
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
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setTocRecieved(e.value)}
                           name="tocRecieved"
                           controlShouldRenderValue={
                              tocRecieved
                                 ? true
                                 : tocRecieved === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="tocSubmitted"
                           className="block text-base font-medium text-gray-500 pb-1"
                        >
                           TOC Submitted
                        </label>
                        <Select
                           options={tocSubmittedOptions}
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
                                 color: '#2E2E2E ', // Change the color of the text inside the input container
                              }),
                           }}
                           className="border-white text-base text-gray-500"
                           closeMenuOnSelect={true}
                           isSearchable={false}
                           onChange={(e) => setTocSubmitted(e.value)}
                           name="tocSubmitted"
                           controlShouldRenderValue={
                              tocSubmitted
                                 ? true
                                 : tocSubmitted === false
                                 ? true
                                 : false
                           }
                        />
                     </div>
                     <div className="pb-20 flex w-full pt-5 ">
                        <Button
                           text="Apply Filter"
                           buttonStyle="bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-full"
                           onClick={applyFilter}
                           navigateUrl={'/filter'}
                        />
                     </div>
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
                     <h1 className="text-2xl lg:text-4xl font-bold">
                        Filter Students
                     </h1>
                     <h1 className="text-sm lg:text-lg text-[#333333]">
                        Filter students based on your criteria
                     </h1>
                  </div>
                  <div className=" overflow-y-auto h-full scroll-smooth pt-8  gap-3 grid grid-cols-2 space-x-3  ">
                     <div className="col-span-1 space-y-4 lg:space-y-6">
                        <div>
                           <label
                              htmlFor="year"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Year
                           </label>
                           <Select
                              options={yearOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setAdmYear(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 admYear
                                    ? true
                                    : admYear === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                        {course == 'Plustwo' && (
                           <div>
                              <label
                                 htmlFor="batch"
                                 className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                              >
                                 Batch
                              </label>
                              <Select
                                 options={batchOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0.2rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 className="border border-gray-200 rounded text-md lg:text-xl"
                                 closeMenuOnSelect={true}
                                 isSearchable={false}
                                 onChange={(e) => setBatch(e.value)}
                                 name="feeType"
                                 controlShouldRenderValue={
                                    batch
                                       ? true
                                       : batch === false
                                       ? true
                                       : false
                                 }
                              />
                           </div>
                        )}

                        <div>
                           <label
                              htmlFor="mode"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Pending Fee
                           </label>
                           <Select
                              options={pendingFeeOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setPendingFee(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 pendingFee
                                    ? true
                                    : pendingFee === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="academicStatus"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Academic Status
                           </label>
                           <Select
                              options={academicStatusOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setAcademicStatus(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 academicStatus
                                    ? true
                                    : academicStatus === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="tmaRecieved"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              TMA Recieved
                           </label>
                           <Select
                              options={tmaRecievedOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setTmaRecieved(e.value)}
                              name="tmaRecieved"
                              controlShouldRenderValue={
                                 tmaRecieved
                                    ? true
                                    : tmaRecieved === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="tmaSubmitted"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              TMA Submitted
                           </label>
                           <Select
                              options={tmaSubmittedOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setTmaSubmitted(e.value)}
                              name="tmaSubmitted"
                              controlShouldRenderValue={
                                 tmaSubmitted
                                    ? true
                                    : tmaSubmitted === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="tocSubmitted"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              TOC Submitted
                           </label>
                           <Select
                              options={tocSubmittedOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setTocSubmitted(e.value)}
                              name="tocSubmitted"
                              controlShouldRenderValue={
                                 tocSubmitted
                                    ? true
                                    : tocSubmitted === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                     </div>

                     <div className="col-span-1 space-y-4 lg:space-y-6">
                        <div>
                           <label
                              htmlFor="course"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Course
                           </label>
                           <Select
                              options={courseOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setCourse(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 course ? true : course === false ? true : false
                              }
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="mode"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Mode
                           </label>
                           <Select
                              options={modeOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded lg:text-xl text-md"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setMode(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 mode ? true : mode === false ? true : false
                              }
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="registrationStatus"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Registration Status
                           </label>
                           <Select
                              options={registrationStatusOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setRegistrationStatus(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 registrationStatus
                                    ? true
                                    : registrationStatus === false
                                    ? true
                                    : false
                              }
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="examMonth"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Exam Month
                           </label>
                           <Select
                              options={examMonthOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setExamMonth(e.value)}
                              name="feeType"
                              controlShouldRenderValue={
                                 examMonth
                                    ? true
                                    : examMonth === false
                                    ? true
                                    : false
                              }
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="examCenter"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              Exam Center
                           </label>
                           <Select
                              options={examCenterOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setExamCenter(e.value)}
                              name="examCenter"
                              controlShouldRenderValue={
                                 examCenter
                                    ? true
                                    : examCenter === false
                                    ? true
                                    : false
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="tocRecieved"
                              className="block text-md lg:text-xl font-medium text-gray-900 mb-2"
                           >
                              TOC Recieved
                           </label>
                           <Select
                              options={tocRecievedOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              className="border border-gray-200 rounded text-md lg:text-xl"
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              onChange={(e) => setTocRecieved(e.value)}
                              name="tocRecieved"
                              controlShouldRenderValue={
                                 tocRecieved
                                    ? true
                                    : tocRecieved === false
                                    ? true
                                    : false
                              }
                           />
                        </div>

                        <div
                           className={`${
                              course === 'Plustwo' ? 'pt-28' : 'pt-14'
                           }`}
                        >
                           <Button
                              text="Apply Filter"
                              buttonStyle="bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-full"
                              onClick={applyFilter}
                              navigateUrl={'/filter'}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Filter;
