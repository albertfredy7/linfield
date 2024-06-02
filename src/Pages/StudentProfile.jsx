import React, { useState, useEffect } from 'react';
import SidebarNew from '../Components/SidebarNew';
import SearchBar from '../Components/SeachBar';
import SwitchButton from '../Components/SwitchButton';
import FeeStatus from '../Components/FeeStatus';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { set } from 'date-fns';
import MobileNavigation from '../Components/MobileNavigation';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      performSearch(number);
    }
  }, []);

  const [studentData, setStudentData] = useState(null);
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
  const [intake, setIntake] = useState(null);
  const [mode, setMode] = useState(null);
  const [branch, setBranch] = useState(null);
  const [referenceNo, setReferenceNo] = useState(null);
  const [enrollmentNo, setEnrollmentNo] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [stream, setStream] = useState(null);
  const [onDemandExams, setOnDemandExams] = useState(false);

  const [academicStatus, setAcademicStatus] = useState('cancelled');
  const [selectedCategory, setSelectedCategory] = useState('personal details');

  const [subjects, setSubjects] = useState([]);
  const [ondemandSubjects, setOndemandSubjects] = useState([]);
  const [toc, setToc] = useState(false);
  const [tocReceived, setTocReceived] = useState(false);
  const [tocSubmitted, setTocSubmitted] = useState(false);
  const [optionalExams, setOptionalExams] = useState(false);
  const [optionalSubjects, setOptionalSubjects] = useState([]);
  const [tocSubjects, setTocSubjects] = useState([]);
  const [tma, setTma] = useState(false);
  const [tmaReceived, setTmaReceived] = useState(false);
  const [tmaSubmitted, setTmaSubmitted] = useState(false);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const animatedComponents = makeAnimated();

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

  const selectedCourseOption = courseOptions.find(
    (option) => option.value === course
  );

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

  const selectedBatchOption = batchOptions.find(
    (option) => option.value === batch
  );

  const intakeOptions = [
    {
      value: 'April',
      label: 'April',
    },
    {
      value: 'September',
      label: 'September',
    },
  ];

  const selectedIntakeOption = intakeOptions.find(
    (option) => option.value === intake
  );

  const subjectsOptions = [
    {
      label: 'History',
      value: 'History',
    },
    {
      label: 'Politics',
      value: 'Politics',
    },
    {
      label: 'Geography',
      value: 'Geography',
    },
    {
      label: 'Mathematics',
      value: 'Mathematics',
    },
    {
      label: 'Chemistry',
      value: 'Chemistry',
    },
  ];

  const selectedSubjectsOption = subjectsOptions.filter((option) =>
    subjects.includes(option.value)
  );

  const optionalSubjectsOptions = [
    {
      label: 'History',
      value: 'History',
    },
    {
      label: 'Politics',
      value: 'Politics',
    },
    {
      label: 'Geography',
      value: 'Geography',
    },
    {
      label: 'Mathematics',
      value: 'Mathematics',
    },
    {
      label: 'Chemistry',
      value: 'Chemistry',
    },
  ];

  const booleanOptions = [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ];

  const branchOptions = [
    {
      label: 'Kumaranellur',
      value: 'Kumaranellur',
    },
  ];

  const selectedBranchOption = branchOptions.find(
    (option) => option.value === branch
  );

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
      value: 'Correspondent',
      label: 'Correspondent',
    },
  ];

  const selectedModeOption = modeOptions.find(
    (option) => option.value === mode
  );

  const streamOptions = [
    {
      value: 'Stream1',
      label: 'Stream 1',
    },
    {
      value: 'Stream2',
      label: 'Stream 2',
    },
    {
      value: 'Stream3',
      label: 'Stream 3',
    },
    {
      value: 'Stream4',
      label: 'Stream 4',
    },
  ];

  const academicStatusOptions = [
    { value: 'Pass', label: 'Pass' },
    { value: 'Fail', label: 'Fail' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'PartiallyCancelled', label: 'PartiallyCancelled' },
    { value: 'Pursuing', label: 'Pursuing' },
  ];

  const selectedAcademicStatusOption = academicStatusOptions.find(
    (option) => option.value === academicStatus
  );

  const selectedStreamOption = streamOptions.find(
    (option) => option.value === stream
  );
  const selectedTocOption = booleanOptions.find(
    (option) => option.value === toc
  );
  const selectedTocRecievedOption = booleanOptions.find(
    (option) => option.value === tocReceived
  );
  const selectedTocSubmittedOption = booleanOptions.find(
    (option) => option.value === tocSubmitted
  );
  const selectedtmaSubmittedOption = booleanOptions.find(
    (option) => option.value === tmaSubmitted
  );
  const selectedtmaReceivedOption = booleanOptions.find(
    (option) => option.value === tmaReceived
  );
  const selectedOptionalSubjectsExam = booleanOptions.find(
    (option) => option.value === optionalExams
  );
  const selectedOptionalSubjectsOption = optionalSubjectsOptions.filter(
    (option) => optionalSubjects.includes(option.value)
  );

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
      window.alert(error.response.data.message);
      // Set studentData to an empty array in case of an error

      setStudentData([]);
    }
  };

  useEffect(() => {
    setCourse(studentData ? studentData[0].course : '');
    setBatch(studentData ? studentData[0].batch : '');
    setIntake(studentData ? studentData[0].intake : '');
    setMode(studentData ? studentData[0].mode : '');
    setBranch(studentData ? studentData[0].branch : '');
    setReferenceNo(studentData ? studentData[0].referenceNumber : '');
    setEnrollmentNo(studentData ? studentData[0].enrollmentNumber : '');
    setRegistrationStatus(studentData ? studentData[0].registrationStatus : '');
    setAcademicStatus(studentData ? studentData[0].academicStatus : '');
    setStream(studentData ? studentData[0].registrationStream : '');
    setSubjects(studentData ? studentData[0].subjects : []);
    setToc(studentData && studentData[0].toc);
    setTocSubjects(studentData && studentData[0].tocSubjects);
    setTocReceived(studentData && studentData[0].tocReceived);
    setTocSubmitted(studentData && studentData[0].tocSubmitted);
    setTma(studentData && studentData[0].tma);
    setTmaReceived(studentData && studentData[0].tmaReceived);
    setTmaSubmitted(studentData && studentData[0].tmaSubmitted);
    setAcademicStatus(studentData ? studentData[0].academicStatus : '');
    setOnDemandExams(studentData ? studentData[0].onDemandExam : false);
    setOptionalExams(studentData ? studentData[0].optionalSubjectsExam : false);
    setOptionalSubjects(studentData ? studentData[0].optionalSubjects : []);
  }, [studentData]);

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* Mobile screens */}
        {/* mobile screen */}
        <div className="block md:hidden bg-[#f0f0f0]">
          <div className="flex flex-col h-screen">
            <div className="flex flex-col px-5 pt-10">
              <h1 className="text-xl font-bold">Filter Students</h1>
              <h1 className="text-sm text-gray-500">
                Filter students based on your criteria
              </h1>
            </div>
            <div className="p-3">
              <SwitchButton
                category={selectedCategory}
                onSelect={handleCategorySelect}
              />
            </div>
            <div className="flex flex-col gap-3 px-6 overflow-y-auto scroll-smooth pt-6 pb-20">
              {selectedCategory === 'personal details' && (
                <div className="flex flex-col gap-2">
                  {/* name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="John"
                      value={studentData ? studentData[0].name : ''}
                      required
                    />
                  </div>

                  {/* place */}
                  <div>
                    <label
                      htmlFor="place"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Place
                    </label>
                    <input
                      type="text"
                      id="place"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="Kochi"
                      value={studentData ? studentData[0].place : ''}
                    />
                  </div>

                  {/* dob */}
                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      value={
                        studentData
                          ? new Date(studentData[0].dob)
                              .toISOString()
                              .split('T')[0]
                          : ''
                      }
                    />
                  </div>

                  {/* phone no */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="9876543210"
                      value={studentData ? studentData[0].phoneNumber : ''}
                    />
                  </div>

                  {/* parent phone no */}
                  <div>
                    <label
                      htmlFor="parentPhone"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Parent Phone
                    </label>
                    <input
                      type="text"
                      id="parentPhone"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="9876543210"
                      value={studentData ? studentData[0].parentNumber : ''}
                    />
                  </div>

                  {/* email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder=""
                      value={studentData ? studentData[0].email : ''}
                    />
                  </div>
                </div>
              )}

              {selectedCategory === 'academic details' && (
                <div className="flex flex-col gap-2">
                  {/* admn no */}
                  <div>
                    <label
                      htmlFor="admnNo"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Admission Number
                    </label>
                    <input
                      type="text"
                      id="admnNo"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="123456"
                      value={studentData ? studentData[0].admissionNumber : ''}
                    />
                  </div>

                  {/* admission coordinator */}
                  <div>
                    <label
                      htmlFor="admnCoordinator"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Admission Coordinator
                    </label>
                    <input
                      type="text"
                      id="admnCoordinator"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="John Doe"
                      value={
                        studentData ? studentData[0].admissionCoordinator : ''
                      }
                    />
                  </div>

                  {/* year */}
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Year
                    </label>
                    <input
                      type="text"
                      id="year"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="2022"
                      value={studentData ? studentData[0].year : ''}
                    />
                  </div>

                  {/* intake */}
                  <div>
                    <label
                      htmlFor="intake"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Intake
                    </label>
                    <Select
                      options={intakeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setIntake(e.value)}
                      name="intake"
                      value={selectedIntakeOption}
                      controlShouldRenderValue={
                        intake ? true : intake === false ? true : false
                      }
                    />
                  </div>

                  {/* course */}
                  <div>
                    <label
                      htmlFor="course"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Course
                    </label>
                    <Select
                      options={courseOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      value={selectedCourseOption}
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setCourse(e.value)}
                      name="feeType"
                      controlShouldRenderValue={
                        course ? true : course === false ? true : false
                      }
                    />
                  </div>

                  {/* if course === pluatwo then batch */}
                  {course === 'Plustwo' && (
                    <div>
                      <label
                        htmlFor="batch"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Batch
                      </label>
                      <Select
                        options={batchOptions}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '.5rem',
                            padding: '0.4rem',
                            borderWidth: '0px',
                            backgroundColor: 'RGB(255, 255, 255)',
                          }),
                        }}
                        className="border-white text-sm lg:text-lg"
                        value={selectedBatchOption}
                        closeMenuOnSelect={true}
                        isSearchable={false}
                        onChange={(e) => setBatch(e.value)}
                        name="batch"
                        controlShouldRenderValue={
                          batch ? true : batch === false ? true : false
                        }
                      />
                    </div>
                  )}

                  {/* mode */}
                  <div>
                    <label
                      htmlFor="mode"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Mode
                    </label>
                    <Select
                      options={modeOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setMode(e.value)}
                      name="mode"
                      value={selectedModeOption}
                      controlShouldRenderValue={
                        mode ? true : mode === false ? true : false
                      }
                    />
                  </div>

                  {/* branch */}
                  <div>
                    <label
                      htmlFor="branch"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Branch
                    </label>
                    <Select
                      options={branchOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setBranch(e.value)}
                      name="branch"
                      value={selectedBranchOption}
                      controlShouldRenderValue={
                        branch ? true : branch === false ? true : false
                      }
                    />
                  </div>

                  {/* reference no */}
                  <div>
                    <label
                      htmlFor="referenceNo"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Reference Number
                    </label>
                    <input
                      type="text"
                      id="referenceNo"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="123456"
                      value={referenceNo}
                      onChange={(e) => setReferenceNo(e.target.value)}
                    />
                  </div>

                  {/* enrollment no */}
                  <div>
                    <label
                      htmlFor="enrollmentNo"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      id="enrollmentNo"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="123456"
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                    />
                  </div>

                  {/* registration status */}
                  <div>
                    <label
                      htmlFor="registrationStatus"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Registration Status
                    </label>
                    <input
                      type="text"
                      id="registrationStatus"
                      className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                      placeholder="Registered"
                      value={registrationStatus}
                      onChange={(e) => setRegistrationStatus(e.target.value)}
                    />
                  </div>

                  {/* academic status */}
                  <div>
                    <label
                      htmlFor="academicStatus"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Academic Status
                    </label>
                    <Select
                      options={academicStatusOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setAcademicStatus(e.value)}
                      name="academicStatus"
                      value={selectedAcademicStatusOption}
                      controlShouldRenderValue={
                        academicStatus
                          ? true
                          : academicStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  {/* stream */}
                  <div>
                    <label
                      htmlFor="stream"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Stream
                    </label>
                    <Select
                      options={streamOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setStream(e.value)}
                      name="stream"
                      value={selectedStreamOption}
                      controlShouldRenderValue={
                        stream ? true : stream === false ? true : false
                      }
                    />
                  </div>

                  {academicStatus === 'Cancelled' && (
                    <div>
                      <label
                        htmlFor="reason"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Reason
                      </label>
                      <input
                        type="text"
                        id="reason"
                        className="bg-white border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="Reason for cancellation"
                      />
                    </div>
                  )}
                </div>
              )}

              {selectedCategory === 'subjects & assignments' && (
                <div className="flex flex-col gap-2">
                  {/* subjects */}
                  <div>
                    <label
                      htmlFor="subjects"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Subjects
                    </label>
                    <Select
                      options={subjectsOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setSubjects(e.map((sub) => sub.value))}
                      name="subjects"
                      value={selectedSubjectsOption}
                      controlShouldRenderValue={
                        subjects ? true : subjects === false ? true : false
                      }
                      isMulti
                      components={animatedComponents}
                    />
                  </div>

                  {onDemandExams && (
                    <div>
                      <label
                        htmlFor="ondemandSubjects"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        On Demand Subjects
                      </label>
                      <Select
                        options={subjectsOptions}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '.5rem',
                            padding: '0.4rem',
                            borderWidth: '0px',
                            backgroundColor: 'RGB(255, 255, 255)',
                          }),
                        }}
                        className="border-white text-sm lg:text-lg"
                        closeMenuOnSelect={true}
                        isSearchable={false}
                        onChange={(e) =>
                          setOndemandSubjects(e.map((sub) => sub.value))
                        }
                        name="ondemandSubjects"
                        value={ondemandSubjects}
                        controlShouldRenderValue={
                          ondemandSubjects
                            ? true
                            : ondemandSubjects === false
                            ? true
                            : false
                        }
                        isMulti
                        components={animatedComponents}
                      />
                    </div>
                  )}

                  {/* toc */}
                  <div>
                    <label
                      htmlFor="toc"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TOC
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setToc(e.value)}
                      name="toc"
                      value={selectedTocOption}
                      controlShouldRenderValue={
                        toc ? true : toc === false ? true : false
                      }
                    />
                  </div>

                  {/* toc subjects */}
                  <div>
                    <label
                      htmlFor="tocSubjects"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TOC Subjects
                    </label>
                    <Select
                      options={subjectsOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) =>
                        setTocSubjects(e.map((sub) => sub.value))
                      }
                      name="tocSubjects"
                      value={tocSubjects}
                      controlShouldRenderValue={
                        tocSubjects
                          ? true
                          : tocSubjects === false
                          ? true
                          : false
                      }
                      isMulti
                      components={animatedComponents}
                    />
                  </div>

                  {/* toc received */}
                  <div>
                    <label
                      htmlFor="tocReceived"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TOC Received
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setTocReceived(e.value)}
                      name="tocReceived"
                      value={selectedTocRecievedOption}
                      controlShouldRenderValue={
                        tocReceived
                          ? true
                          : tocReceived === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  {/* toc submitted */}
                  <div>
                    <label
                      htmlFor="tocSubmitted"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TOC Submitted
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setTocSubmitted(e.value)}
                      name="tocSubmitted"
                      value={selectedTocSubmittedOption}
                      controlShouldRenderValue={
                        tocSubmitted
                          ? true
                          : tocSubmitted === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  {/* tma */}
                  <div>
                    <label
                      htmlFor="tma"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TMA
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setTma(e.value)}
                      name="tma"
                      value={selectedTocSubmittedOption}
                      controlShouldRenderValue={
                        tma ? true : tma === false ? true : false
                      }
                    />
                  </div>

                  {/* tma received */}
                  <div>
                    <label
                      htmlFor="tmaReceived"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TMA Received
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setTmaReceived(e.value)}
                      name="tmaReceived"
                      value={selectedtmaReceivedOption}
                      controlShouldRenderValue={
                        tmaReceived
                          ? true
                          : tmaReceived === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  {/* tma submitted */}
                  <div>
                    <label
                      htmlFor="tmaSubmitted"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      TMA Submitted
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setTmaSubmitted(e.value)}
                      name="tmaSubmitted"
                      value={selectedtmaSubmittedOption}
                      controlShouldRenderValue={
                        tmaSubmitted
                          ? true
                          : tmaSubmitted === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  {/* optional exams */}
                  <div>
                    <label
                      htmlFor="optionalExams"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Optional Exams
                    </label>
                    <Select
                      options={booleanOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) => setOptionalExams(e.value)}
                      name="optionalExams"
                      value={selectedOptionalSubjectsExam}
                      controlShouldRenderValue={
                        optionalExams
                          ? true
                          : optionalExams === false
                          ? true
                          : false
                      }
                    />
                  </div>

                  {/* optional subjects */}
                  <div>
                    <label
                      htmlFor="optionalSubjects"
                      className="block text-sm lg:text-lg font-medium text-gray-900"
                    >
                      Optional Subjects
                    </label>
                    <Select
                      options={optionalSubjectsOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      className="border-white text-sm lg:text-lg"
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      onChange={(e) =>
                        setOptionalSubjects(e.map((sub) => sub.value))
                      }
                      name="optionalSubjects"
                      value={selectedOptionalSubjectsOption}
                      controlShouldRenderValue={
                        optionalSubjects
                          ? true
                          : optionalSubjects === false
                          ? true
                          : false
                      }
                      isMulti
                      components={animatedComponents}
                    />
                  </div>
                </div>
              )}

              {selectedCategory === 'fees & payments' && (
                <FeeStatus studentData={studentData} />
              )}
            </div>
          </div>

          <div className="fixed bottom-0 right-0 w-full">
            <MobileNavigation />
          </div>
        </div>

        {/* Tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          <div className="md:col-span-1 lg:col-span-1">
            {/* <SidebarComponent /> */}
            <SidebarNew />
          </div>
          <div className="col-span-6 h-full  px-12  overflow-hidden ">
            <div className="  flex flex-col justify-center 3xl:justify-center px-4 ">
              <h1 className="text-xl md:text-3xl lg:text-4xl 3xl:text-4xl font-semibold pt-10">
                Student Profile
              </h1>
              <h1 className="text-md lg:text-xl 3xl:text-xl font-medium text-[#333333]">
                View and verify the details of the student
              </h1>
            </div>
            <div className=" h-full flex flex-col gap-3">
              <div className="p-5">
                <SwitchButton
                  category={selectedCategory}
                  onSelect={handleCategorySelect}
                />
              </div>

              <div className="bg-white rounded-xl overflow-y-auto  p-10">
                {selectedCategory === 'personal details' ? (
                  <div className="grid grid-cols-2  items-center gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="John"
                        value={studentData ? studentData[0].name : ''}
                        required
                      />
                    </div>
                    {/* place */}
                    <div>
                      <label
                        htmlFor="place"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Place
                      </label>
                      <input
                        type="text"
                        id="place"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="Kochi"
                        value={studentData ? studentData[0].place : ''}
                      />
                    </div>
                    {/* dob */}
                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        value={
                          studentData
                            ? new Date(studentData[0].dob)
                                .toISOString()
                                .split('T')[0]
                            : ''
                        }
                      />
                    </div>
                    {/* phone no */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="9876543210"
                        value={studentData ? studentData[0].phoneNumber : ''}
                      />
                    </div>
                    {/* parent phone no */}
                    <div>
                      <label
                        htmlFor="parentPhone"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Parent Phone
                      </label>
                      <input
                        type="text"
                        id="parentPhone"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="9876543210"
                        value={studentData ? studentData[0].parentNumber : ''}
                      />
                    </div>
                    {/* email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="student@gmail.com"
                        value={studentData ? studentData[0].email : ''}
                      />
                    </div>
                    {/* password */}
                    {/* <div>
                        <label
                          htmlFor="password"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="password"
                          value={studentData ? studentData[0].password : ''}
                        />
                      </div> */}
                  </div>
                ) : selectedCategory === 'academic details' ? (
                  <div>
                    <div className="grid grid-cols-2 items-center gap-5">
                      {/* admn no */}
                      <div>
                        <label
                          htmlFor="admnNo"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Admission Number
                        </label>
                        <input
                          type="text"
                          id="admnNo"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="123456"
                          value={
                            studentData ? studentData[0].admissionNumber : ''
                          }
                        />
                      </div>
                      {/* admission coordinator */}
                      <div>
                        <label
                          htmlFor="admnCoordinator"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Admission Coordinator
                        </label>
                        <input
                          type="text"
                          id="admnCoordinator"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="John Doe"
                          value={
                            studentData
                              ? studentData[0].admissionCoordinator
                              : ''
                          }
                        />
                      </div>
                      {/* year */}
                      <div>
                        <label
                          htmlFor="year"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Year
                        </label>
                        <input
                          type="text"
                          id="year"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="2022"
                          value={studentData ? studentData[0].year : ''}
                        />
                      </div>
                      {/* intake */}
                      <div>
                        <label
                          htmlFor="intake"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Intake
                        </label>
                        <Select
                          options={intakeOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                            }),
                          }}
                          className="border-white text-sm lg:text-lg"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setIntake(e.value)}
                          name="intake"
                          value={selectedIntakeOption}
                          controlShouldRenderValue={
                            intake ? true : intake === false ? true : false
                          }
                        />
                      </div>

                      {/* course */}
                      <div>
                        <label
                          htmlFor="course"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Course
                        </label>
                        <Select
                          options={courseOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base "
                          value={selectedCourseOption}
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setCourse(e.value)}
                          name="feeType"
                          controlShouldRenderValue={
                            course ? true : course === false ? true : false
                          }
                        />
                      </div>

                      {/* if course === pluatwo then batch */}
                      {course === 'Plustwo' && (
                        <div>
                          <label
                            htmlFor="batch"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Batch
                          </label>
                          <Select
                            options={batchOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                                fontSize: '1rem',
                              }),
                              singleValue: (baseStyles) => ({
                                ...baseStyles,
                                color: '#000000', // Change the color of the text inside the input container
                              }),
                            }}
                            className="border-white text-base text-gray-500"
                            value={selectedBatchOption}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setBatch(e.value)}
                            name="batch"
                            controlShouldRenderValue={
                              batch ? true : batch === false ? true : false
                            }
                          />
                        </div>
                      )}

                      {/* mode */}
                      <div>
                        <label
                          htmlFor="mode"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Mode
                        </label>
                        <Select
                          options={modeOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setMode(e.value)}
                          name="feeType"
                          value={selectedModeOption}
                          controlShouldRenderValue={
                            mode ? true : mode === false ? true : false
                          }
                        />
                      </div>

                      {/* branch */}
                      <div>
                        <label
                          htmlFor="branch"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Branch
                        </label>
                        <Select
                          options={branchOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setBranch(e.value)}
                          name="branch"
                          value={selectedBranchOption}
                          controlShouldRenderValue={
                            branch ? true : branch === false ? true : false
                          }
                        />
                      </div>

                      {/* reference no */}
                      <div>
                        <label
                          htmlFor="referenceNo"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Reference Number
                        </label>
                        <input
                          type="text"
                          id="referenceNo"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="123456"
                          value={referenceNo}
                          onChange={(e) => setReferenceNo(e.target.value)}
                        />
                      </div>

                      {/* enrollment no */}
                      <div>
                        <label
                          htmlFor="enrollmentNo"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Enrollment Number
                        </label>
                        <input
                          type="text"
                          id="enrollmentNo"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="123456"
                          value={enrollmentNo}
                          onChange={(e) => setEnrollmentNo(e.target.value)}
                        />
                      </div>

                      {/* registration status */}
                      <div>
                        <label
                          htmlFor="registrationStatus"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Registration Status
                        </label>
                        <input
                          type="text"
                          id="registrationStatus"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="Registered"
                          value={registrationStatus}
                          onChange={(e) =>
                            setRegistrationStatus(e.target.value)
                          }
                        />
                      </div>

                      {/* academic status */}
                      <div>
                        <label
                          htmlFor="academicStatus"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Academic Status
                        </label>
                        <Select
                          options={academicStatusOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setAcademicStatus(e.value)}
                          value={selectedAcademicStatusOption}
                        />
                      </div>

                      {/* stream */}
                      <div>
                        <label
                          htmlFor="stream"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Stream
                        </label>
                        <Select
                          options={streamOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setStream(e.value)}
                          name="stream"
                          value={selectedStreamOption}
                        />
                      </div>

                      {/* if academic status is cancelled, then reason for cancellation */}
                      {academicStatus === 'cancelled' && (
                        <div>
                          <label
                            htmlFor="reasonForCancellation"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Reason for Cancellation
                          </label>
                          <input
                            type="text"
                            id="reasonForCancellation"
                            className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                            placeholder="Not interested"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedCategory === 'subjects & assignments' ? (
                  <div>
                    <div className="grid grid-cols-2 items-center gap-5">
                      {/* subjects */}
                      {/* use react select for subjects */}
                      <div
                        className={
                          onDemandExams === false ? 'col-span-2' : 'col-span-1'
                        }
                      >
                        <label
                          htmlFor="subjects"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Subjects
                        </label>
                        <Select
                          options={subjectsOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                            }),
                          }}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          onChange={(e) => setSubjects(e.value)}
                          value={selectedSubjectsOption}
                        />
                      </div>

                      {/* ondemand subjects */}
                      {onDemandExams === 'true' && (
                        <div>
                          <label
                            htmlFor="ondemandSubjects"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            On-demand subjects
                          </label>
                          <Select
                            options={subjectsOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={(e) => setOndemandSubjects(e.value)}
                          />
                        </div>
                      )}

                      <div className="col-span-3 grid grid-cols-2 gap-5">
                        {/* toc -yes or no */}
                        <div>
                          <label
                            htmlFor="toc"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TOC
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setToc(e.value)}
                            value={selectedTocOption}
                          />
                        </div>

                        {/* toc recieved */}
                        <div>
                          <label
                            htmlFor="tocRecieved"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TOC Recieved
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTocRecieved(e.value)}
                            value={selectedTocRecievedOption}
                          />
                        </div>

                        {/* toc submitted */}
                        <div>
                          <label
                            htmlFor="tocSubmitted"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TOC Submitted
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTocSubmitted(e.value)}
                            value={selectedTocSubmittedOption}
                          />
                        </div>

                        {/* optional exam */}
                        <div className="col-span-1">
                          <label
                            htmlFor="optionalExams"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Optional Exams
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setOptionalExams(e.value)}
                            value={selectedOptionalSubjectsExam}
                          />
                        </div>
                      </div>

                      <div className="col-span-3 grid grid-cols-2 gap-5">
                        {/* optional subjects */}
                        <div className="col-span-2">
                          <label
                            htmlFor="optionalSubjects"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Optional Subjects
                          </label>
                          <Select
                            options={optionalSubjectsOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={(e) => setOptionalSubjects(e.value)}
                            value={selectedOptionalSubjectsOption}
                          />
                        </div>
                      </div>

                      {/* toc subjects */}
                      <div className="col-span-2">
                        <label
                          htmlFor="tocSubjects"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          TOC Subjects
                        </label>
                        <Select
                          options={subjectsOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                            }),
                          }}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          onChange={(e) => setTocSubjects(e.value)}
                          // value={selectedTocSubjectsOption}
                        />
                      </div>

                      <div className="col-span-3 grid grid-cols-2 gap-5">
                        {/* tma recieved */}
                        <div>
                          <label
                            htmlFor="tmaRecieved"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TMA Recieved
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTmaRecieved(e.value)}
                            value={selectedtmaReceivedOption}
                          />
                        </div>

                        {/* tma submitted */}
                        <div>
                          <label
                            htmlFor="tmaSubmitted"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TMA Submitted
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTmaSubmitted(e.value)}
                            value={selectedtmaSubmittedOption}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedCategory === 'fee details' ? (
                  <div>
                    <FeeStatus studentData={studentData} />
                  </div>
                ) : (
                  <div>No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PC screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen ">
          <div className="col-span-2">
            <SidebarNew />
          </div>
          <div className="col-span-9  px-12 pt-6 3xl:pt-14 pb-6 overflow-hidden">
            <div className="flex justify-between">
              <div className=" pb-6">
                <h1 className="text-xl 3xl:text-2xl font-semibold">
                  Student profile
                </h1>
                <h3 className="text-gray-500 text-md 3xl:text-lg ">
                  View and verify the details of the student
                </h3>
              </div>
              <div className="w-1/2 flex items-center">
                <SearchBar onSearch={performSearch} />
              </div>
            </div>
            <div className="h-full flex flex-col  ">
              {/* {!studentData ? (
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
              ) : (
                <div>Student data available </div>
              )} */}
              <div className="pt-3 pb-10">
                <SwitchButton
                  category={selectedCategory}
                  onSelect={handleCategorySelect}
                />
              </div>

              <div className="bg-white rounded-xl overflow-y-auto  p-10">
                {selectedCategory === 'personal details' ? (
                  <div className="grid grid-cols-2  items-center gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="John"
                        value={studentData ? studentData[0].name : ''}
                        required
                      />
                    </div>
                    {/* place */}
                    <div>
                      <label
                        htmlFor="place"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Place
                      </label>
                      <input
                        type="text"
                        id="place"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="Kochi"
                        value={studentData ? studentData[0].place : ''}
                      />
                    </div>
                    {/* dob */}
                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        value={
                          studentData
                            ? new Date(studentData[0].dob)
                                .toISOString()
                                .split('T')[0]
                            : ''
                        }
                      />
                    </div>
                    {/* phone no */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="9876543210"
                        value={studentData ? studentData[0].phoneNumber : ''}
                      />
                    </div>
                    {/* parent phone no */}
                    <div>
                      <label
                        htmlFor="parentPhone"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Parent Phone
                      </label>
                      <input
                        type="text"
                        id="parentPhone"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="9876543210"
                        value={studentData ? studentData[0].parentNumber : ''}
                      />
                    </div>
                    {/* email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm lg:text-lg font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                        placeholder="student@gmail.com"
                        value={studentData ? studentData[0].email : ''}
                      />
                    </div>
                  </div>
                ) : selectedCategory === 'academic details' ? (
                  <div>
                    <div className="grid grid-cols-3 items-center gap-5">
                      {/* admn no */}
                      <div>
                        <label
                          htmlFor="admnNo"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Admission Number
                        </label>
                        <input
                          type="text"
                          id="admnNo"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="123456"
                          value={
                            studentData ? studentData[0].admissionNumber : ''
                          }
                        />
                      </div>
                      {/* admission coordinator */}
                      <div>
                        <label
                          htmlFor="admnCoordinator"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Admission Coordinator
                        </label>
                        <input
                          type="text"
                          id="admnCoordinator"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="John Doe"
                          value={
                            studentData
                              ? studentData[0].admissionCoordinator
                              : ''
                          }
                        />
                      </div>
                      {/* year */}
                      <div>
                        <label
                          htmlFor="year"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Year
                        </label>
                        <input
                          type="text"
                          id="year"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="2022"
                          value={studentData ? studentData[0].year : ''}
                        />
                      </div>
                      {/* intake */}
                      <div>
                        <label
                          htmlFor="intake"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Intake
                        </label>
                        <Select
                          options={intakeOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                            }),
                          }}
                          className="border-white text-sm lg:text-lg"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setIntake(e.value)}
                          name="intake"
                          value={selectedIntakeOption}
                          controlShouldRenderValue={
                            intake ? true : intake === false ? true : false
                          }
                        />
                      </div>

                      {/* course */}
                      <div>
                        <label
                          htmlFor="course"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Course
                        </label>
                        <Select
                          options={courseOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base "
                          value={selectedCourseOption}
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setCourse(e.value)}
                          name="feeType"
                          controlShouldRenderValue={
                            course ? true : course === false ? true : false
                          }
                        />
                      </div>

                      {/* if course === pluatwo then batch */}
                      {course === 'Plustwo' && (
                        <div>
                          <label
                            htmlFor="batch"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Batch
                          </label>
                          <Select
                            options={batchOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                                fontSize: '1rem',
                              }),
                              singleValue: (baseStyles) => ({
                                ...baseStyles,
                                color: '#000000', // Change the color of the text inside the input container
                              }),
                            }}
                            className="border-white text-base text-gray-500"
                            value={selectedBatchOption}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setBatch(e.value)}
                            name="batch"
                            controlShouldRenderValue={
                              batch ? true : batch === false ? true : false
                            }
                          />
                        </div>
                      )}

                      {/* mode */}
                      <div>
                        <label
                          htmlFor="mode"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Mode
                        </label>
                        <Select
                          options={modeOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setMode(e.value)}
                          name="feeType"
                          value={selectedModeOption}
                          controlShouldRenderValue={
                            mode ? true : mode === false ? true : false
                          }
                        />
                      </div>

                      {/* branch */}
                      <div>
                        <label
                          htmlFor="branch"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Branch
                        </label>
                        <Select
                          options={branchOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setBranch(e.value)}
                          name="branch"
                          value={selectedBranchOption}
                          controlShouldRenderValue={
                            branch ? true : branch === false ? true : false
                          }
                        />
                      </div>

                      {/* reference no */}
                      <div>
                        <label
                          htmlFor="referenceNo"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Reference Number
                        </label>
                        <input
                          type="text"
                          id="referenceNo"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="123456"
                          value={referenceNo}
                          onChange={(e) => setReferenceNo(e.target.value)}
                        />
                      </div>

                      {/* enrollment no */}
                      <div>
                        <label
                          htmlFor="enrollmentNo"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Enrollment Number
                        </label>
                        <input
                          type="text"
                          id="enrollmentNo"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="123456"
                          value={enrollmentNo}
                          onChange={(e) => setEnrollmentNo(e.target.value)}
                        />
                      </div>

                      {/* registration status */}
                      <div>
                        <label
                          htmlFor="registrationStatus"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Registration Status
                        </label>
                        <input
                          type="text"
                          id="registrationStatus"
                          className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                          placeholder="Registered"
                          value={registrationStatus}
                          onChange={(e) =>
                            setRegistrationStatus(e.target.value)
                          }
                        />
                      </div>

                      {/* academic status */}
                      <div>
                        <label
                          htmlFor="academicStatus"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Academic Status
                        </label>
                        <Select
                          options={academicStatusOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setAcademicStatus(e.value)}
                          value={selectedAcademicStatusOption}
                        />
                      </div>

                      {/* stream */}
                      <div>
                        <label
                          htmlFor="stream"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Stream
                        </label>
                        <Select
                          options={streamOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                              fontSize: '1rem',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#000000', // Change the color of the text inside the input container
                            }),
                          }}
                          className="border-white text-base text-gray-500"
                          closeMenuOnSelect={true}
                          isSearchable={false}
                          onChange={(e) => setStream(e.value)}
                          name="stream"
                          value={selectedStreamOption}
                        />
                      </div>

                      {/* if academic status is cancelled, then reason for cancellation */}
                      {academicStatus === 'cancelled' && (
                        <div>
                          <label
                            htmlFor="reasonForCancellation"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Reason for Cancellation
                          </label>
                          <input
                            type="text"
                            id="reasonForCancellation"
                            className="bg-[#f0f0f0] border border-white text-gray-900 text-sm lg:text-lg rounded-lg block w-full p-2.5"
                            placeholder="Not interested"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedCategory === 'subjects & assignments' ? (
                  <div>
                    <div className="grid grid-cols-2 items-center gap-5">
                      {/* subjects */}
                      {/* use react select for subjects */}
                      <div
                        className={
                          onDemandExams === false ? 'col-span-2' : 'col-span-1'
                        }
                      >
                        <label
                          htmlFor="subjects"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          Subjects
                        </label>
                        <Select
                          options={subjectsOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                            }),
                          }}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          onChange={(e) => window.alert(e)}
                          value={selectedSubjectsOption}
                        />
                      </div>

                      {/* ondemand subjects */}
                      {onDemandExams === 'true' && (
                        <div>
                          <label
                            htmlFor="ondemandSubjects"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            On-demand subjects
                          </label>
                          <Select
                            options={subjectsOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={(e) => setOndemandSubjects(e.value)}
                          />
                        </div>
                      )}

                      <div className="col-span-3 grid grid-cols-3 gap-5">
                        {/* toc -yes or no */}
                        <div>
                          <label
                            htmlFor="toc"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TOC
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setToc(e.value)}
                            value={selectedTocOption}
                          />
                        </div>

                        {/* toc recieved */}
                        <div>
                          <label
                            htmlFor="tocRecieved"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TOC Recieved
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTocRecieved(e.value)}
                            value={selectedTocRecievedOption}
                          />
                        </div>

                        {/* toc submitted */}
                        <div>
                          <label
                            htmlFor="tocSubmitted"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TOC Submitted
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTocSubmitted(e.value)}
                            value={selectedTocSubmittedOption}
                          />
                        </div>
                      </div>

                      <div className="col-span-3 grid grid-cols-3 gap-5">
                        {/* optional exam */}
                        <div className="col-span-1">
                          <label
                            htmlFor="optionalExams"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Optional Exams
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setOptionalExams(e.value)}
                            value={selectedOptionalSubjectsExam}
                          />
                        </div>

                        {/* optional subjects */}
                        <div className="col-span-2">
                          <label
                            htmlFor="optionalSubjects"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            Optional Subjects
                          </label>
                          <Select
                            options={optionalSubjectsOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={(e) => setOptionalSubjects(e.value)}
                            value={selectedOptionalSubjectsOption}
                          />
                        </div>
                      </div>

                      {/* toc subjects */}
                      <div className="col-span-2">
                        <label
                          htmlFor="tocSubjects"
                          className="block text-sm lg:text-lg font-medium text-gray-900"
                        >
                          TOC Subjects
                        </label>
                        <Select
                          options={subjectsOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '.5rem',
                              padding: '0.4rem',
                              borderWidth: '0px',
                              backgroundColor: 'RGB(240, 240, 240)',
                            }),
                          }}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          onChange={(e) => setTocSubjects(e.value)}
                        />
                      </div>

                      <div className="col-span-3 grid grid-cols-3 gap-5">
                        {/* tma recieved */}
                        <div>
                          <label
                            htmlFor="tmaRecieved"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TMA Recieved
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTmaRecieved(e.value)}
                            value={selectedtmaReceivedOption}
                          />
                        </div>

                        {/* tma submitted */}
                        <div>
                          <label
                            htmlFor="tmaSubmitted"
                            className="block text-sm lg:text-lg font-medium text-gray-900"
                          >
                            TMA Submitted
                          </label>
                          <Select
                            options={booleanOptions}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '12px',
                                padding: '0.4rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(240, 240, 240)',
                              }),
                            }}
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            onChange={(e) => setTmaSubmitted(e.value)}
                            value={selectedtmaSubmittedOption}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedCategory === 'fee details' ? (
                  <div>
                    <FeeStatus studentData={studentData} />
                  </div>
                ) : (
                  <div>No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
