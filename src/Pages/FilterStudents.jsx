import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import MobileNavigation from '../Components/MobileNavigation';
import SeachBar from '../Components/SeachBar';
import OverviewCard from '../Components/OverviewCard';
import DataCard from '../Components/DataCard';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { set } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { filterStudents } from '../actions/studentFilterActions';

function FilterStudents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterStudentsData = useSelector((state) => state.studentFilter);
  const { loading, filteredStudents } = filterStudentsData;

  const [admYear, setAdmYear] = useState(null);
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
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
  const [studentData, setStudentData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

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
    {
      value: 'Correspondence',
      label: 'Correspondence',
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
    {
      value: 'thirdTerm',
      label: 'Third Term Fee',
    },
  ];

  const registrationStatusOptions = [
    {
      value: 'Registered',
      label: 'Registered',
    },
    {
      value: 'Not Registered',
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
      value: 'PartiallyCancelled',
      label: 'Partially Cancelled',
    },
    {
      value: 'Pursuing',
      label: 'Pursuing',
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
      value: 'Palakkad',
      label: 'Palakkad',
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
  const performSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://lobster-app-yjjm5.ondigitalocean.app/api/students/search/${query}`
      );
      // Check if the response data is an object
      if (typeof response.data === 'object' && response.data !== null) {
        // Wrap the object in an array
        setStudentData([response.data]);
      } else if (Array.isArray(response.data)) {
        // If the response data is an array, set it directly
        setStudentData(response.data);
      } else {
        // If the response data is neither an object nor an array, log an error or set studentData to an empty array
        console.error('Error: response.data is not an object or an array');
        setStudentData([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      toast.error('No student data available');
      // Set studentData to an empty array in case of an error

      setStudentData([]);
    }
  };

  const applyFilter = async () => {
    // Create an object to hold the filter criteria
    const filterCriteria = {};

    // Add filter criteria to the object if they are not null
    if (admYear !== null) filterCriteria.year = admYear;
    if (course !== null) filterCriteria.course = course;
    if (batch !== null) filterCriteria.batch = batch;
    if (mode !== null) filterCriteria.mode = mode;
    if (pendingFee !== null) filterCriteria.pendingFee = pendingFee;
    if (registrationStatus !== null)
      filterCriteria.registrationStatus = registrationStatus;
    if (academicStatus !== null) filterCriteria.academicStatus = academicStatus;
    if (examMonth !== null) filterCriteria.examMonth = examMonth;
    if (examCenter !== null) filterCriteria.examCenter = examCenter;
    if (tmaRecieved !== null) filterCriteria.tmaReceived = tmaRecieved;
    if (tmaSubmitted !== null) filterCriteria.tmaSubmitted = tmaSubmitted;
    if (tocRecieved !== null) filterCriteria.tocRecieved = tocRecieved;
    if (tocSubmitted !== null) filterCriteria.tocSubmitted = tocSubmitted;

    dispatch(filterStudents({ filterObject: filterCriteria }));

    // try {
    //   // Send a POST request to the filter API endpoint with the filter criteria
    //   const response = await axios.post(
    //     'https://lobster-app-yjjm5.ondigitalocean.app/api/students/filterStudents',
    //     filterCriteria
    //   );

    //   // Update the studentData state with the filtered results
    //   setStudentData(response.data);
    // } catch (error) {
    //   console.error('Error applying filter:', error);
    //   toast.error('Failed to apply filter');
    // }
  };

  const fetchTotalStudents = async () => {
    try {
      const response = await axios.get(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/students/totalAdmissions'
      );
      setTotalStudents(response.data.numberOfAdmissions);
    } catch (error) {
      console.error('Error fetching total students:', error);
      window.alert('Failed to fetch total students');
    }
  };

  useEffect(() => {
    fetchTotalStudents();
    // applyFilter();
  }, []);

  useEffect(() => {
    if (filteredStudents && filteredStudents.length > 0) {
      setStudentData(filteredStudents);
    }
  }, [filteredStudents]);

  const changeStatus = () => {
    const updatedStudents = studentData.filter(
      (student) => student.status === academicStatus
    );
    setStudentData(updatedStudents);
  };

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      {console.log(
        filteredStudents && filteredStudents.length > 0 && filteredStudents[0]
      )}
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden  ">
          <Toaster position="top-center" reverseOrder={false} />

          <div className="flex flex-col h-screen">
            <div className="pt-10 px-5 flex flex-col">
              <h1 className="text-xl font-semibold">Filter Student</h1>
              <h1 className="text-[#333333] text-sm pt-1">
                Filter students a/c Admn No / Mobile No{' '}
              </h1>
            </div>

            <div className="pt-5 px-1">
              <MobileOverviewCard
                title={'Total students'}
                subtitle={totalStudents}
              />
            </div>

            <div className="flex justify-between pt-5 pb-5 pl-5 pr-5 gap-8">
              <Button
                text="Filter"
                buttonStyle="bg-[#2740CD] text-white px-3 py-1 rounded-xl"
                navigateUrl={'/applyFilter'}
              />
              <SeachBar onSearch={performSearch} />
            </div>

            <div className="overflow-y-auto flex flex-col gap-3 md:h-[550px] px-5 pt-5">
              {studentData.length > 0 ? (
                studentData.map((student, index) => (
                  <DataCard
                    key={index}
                    type="admissions"
                    title={student.name}
                    tailData={student.course}
                    admissionNumber={student.admissionNumber}
                    callBackFunction={changeStatus}
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
                    No student data available
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 right-0 w-full">
            <MobileNavigation />
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
              <h1 className="text-xl md:text-3xl lg:text-4xl 3xl:text-4xl font-semibold pt-10">
                Filter students
              </h1>
              <h1 className="text-md lg:text-xl 3xl:text-xl font-medium text-[#333333]">
                Filter the student based on Admn No / Mobile No
              </h1>
            </div>

            <div className="row-span-1   ">
              <OverviewCard title={'Total Students'} number={totalStudents} />
            </div>

            <div className="row-span-1 flex justify-between  gap-5 pt-5 lg:pt-8 px-5 items-center">
              <Button
                text="Filter"
                buttonStyle="bg-[#2740CD] h-1/2 text-white px-6 py-2  lg:text-xl rounded-xl"
                navigateUrl={'/applyFilter'}
              />
              <div className="w-3/4">
                <SeachBar onSearch={performSearch} />
              </div>
            </div>

            <div className="row-span-6">
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
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
                    <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply w-4/6"
                        alt=""
                      />
                      <h1 className="text-center">No student data available</h1>
                    </div>
                  )}
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen">
          <div className="col-span-2 ">
            <SidebarNew />
          </div>

          <div className="col-span-6 h-full  px-12 grid grid-rows-7 3xl:grid-rows-12 overflow-hidden">
            <div className="row-span-1 3xl:row-span-2 flex flex-col justify-center 3xl:justify-center px-4">
              <Toaster position="top-center" reverseOrder={false} />
              <h1 className="text-xl 3xl:text-3xl font-semibold">
                Filter students
              </h1>
              <h1 className="text-md 3xl:text-xl font-normal">
                Lorem ipsum some random sub heading
              </h1>
            </div>

            <div className="row-span-2 3xl:row-span-3  py-3">
              <OverviewCard title={'Total Students'} number={totalStudents} />
            </div>

            {console.log(`printing the admissions count${totalStudents}`)}

            <div className="row-span-4 3xl:row-span-8 pt-4">
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
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
                    <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                      <img
                        src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                        className="mix-blend-multiply w-4/6"
                        alt=""
                      />
                      <h1 className="text-center">No student data available</h1>
                    </div>
                  )}
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-full  grid grid-rows-12 overflow-hidden">
            <div className="row-span-2  flex flex-col justify-center items-center px-4">
              <SeachBar onSearch={performSearch} />
            </div>
            <div className="row-span-11  px-5 py-2">
              <div className=" h-full flex flex-col bg-white p-12 rounded-xl">
                <div className="">
                  <h2 className="text-base xl:text-xl 3xl:text-2xl font-semibold">
                    Filter Students
                  </h2>
                  <h2 className="text-sm 3xl:text-md font-normal">
                    Filter the student based on your criteria
                  </h2>
                </div>
                <div className="overflow-y-auto scroll-smooth pt-8 flex flex-col gap-3">
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-md xl:text-base font-medium text-gray-900 mb-2"
                    >
                      Year
                    </label>
                    <Select
                      options={yearOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md  xl:block 3xl:hidden"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setAdmYear(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        admYear ? true : admYear === false ? true : false
                      }
                    />
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
                      className="border border-gray-200 rounded text-md xl:text-sm 3xl:block hidden"
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
                      className="block text-md font-medium text-gray-900 mb-2"
                    >
                      Course
                    </label>
                    <Select
                      options={courseOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md xl:block 3xl:hidden"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setCourse(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        course ? true : course === false ? true : false
                      }
                    />
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
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
                        className="block text-md font-medium text-gray-900 mb-2"
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
                        className="border border-gray-200 rounded text-md 3xl:block hidden"
                        closeMenuOnSelect={true}
                        isSearchable={false}
                        onChange={(e) => setBatch(e.value)}
                        name="feeType"
                        controlShouldRenderValue={
                          batch ? true : batch === false ? true : false
                        }
                      />
                      <Select
                        options={batchOptions}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '.5rem',
                            padding: '0.08rem',
                            borderWidth: '0px',
                            backgroundColor: 'RGB(255, 255, 255)',
                          }),
                        }}
                        className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setMode(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        mode ? true : mode === false ? true : false
                      }
                    />
                    <Select
                      options={modeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                      htmlFor="mode"
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setPendingFee(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        pendingFee ? true : pendingFee === false ? true : false
                      }
                    />
                    <Select
                      options={pendingFeeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setPendingFee(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        pendingFee ? true : pendingFee === false ? true : false
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="registrationStatus"
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
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
                    <Select
                      options={registrationStatusOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
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
                    <Select
                      options={academicStatusOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setExamMonth(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        examMonth ? true : examMonth === false ? true : false
                      }
                    />
                    <Select
                      options={examMonthOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setExamMonth(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        examMonth ? true : examMonth === false ? true : false
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="examCenter"
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setExamCenter(e.value)}
                      name="examCenter"
                      controlShouldRenderValue={
                        examCenter ? true : examCenter === false ? true : false
                      }
                    />
                    <Select
                      options={examCenterOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setExamCenter(e.value)}
                      name="examCenter"
                      controlShouldRenderValue={
                        examCenter ? true : examCenter === false ? true : false
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tmaRecieved"
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
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
                    <Select
                      options={tmaRecievedOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
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
                    <Select
                      options={tmaSubmittedOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden "
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
                    <Select
                      options={tocRecievedOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block "
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
                      className="block text-md font-medium text-gray-900 mb-2"
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
                      className="border border-gray-200 rounded text-md 3xl:block hidden"
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
                    <Select
                      options={tocSubmittedOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border border-gray-200 rounded text-md 3xl:hidden xl:block"
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
                  <div className=" flex w-full pt-5 ">
                    <Button
                      text="Apply Filter"
                      buttonStyle="bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-full"
                      onClick={applyFilter}
                    />
                  </div>
                </div>
              </div>
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

export default FilterStudents;
