import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import SidebarNew from '../Components/SidebarNew';
import SearchBar from '../Components/SeachBar';
import axios from 'axios';
import DataCard from '../Components/DataCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '../Components/Button';
import MobileNavigation from '../Components/MobileNavigation';
import { useNavigate } from 'react-router-dom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useSelector, useDispatch } from 'react-redux';

function ModifyStudent() {
   const navigate = useNavigate();

   const [studentData, setStudentData] = useState([]);
   const [error, setError] = useState(null);
   const [name, setName] = useState('');
   const [subjects, setSubjects] = useState([]);
   const [optionalSubjectsExam, setOptionalSubjectsExam] = useState(null);
   const [toc, setToc] = useState(null);
   const [tocSubjects, setTocSubjects] = useState([]);
   const [tocSubmitted, setTocSubmitted] = useState(null);
   const [optionalSubjects, setOptionalSubjects] = useState([]);
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [parentPhone, setParentPhone] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [previousNiosResult, setPreviousNiosResult] = useState('');
   const [referenceNo, setReferenceNo] = useState('');
   const [registrationFee, setRegistrationFee] = useState('');
   const [examFee, setExamFee] = useState('');
   const [tocRecieved, setTocRecieved] = useState(null);
   const [loading, setLoading] = useState(false);
   const [academicStatus, setAcademicStatus] = useState(null);

   const teacherLoginData = useSelector((state) => state.teacherLogin);
   const { teacherInfo } = teacherLoginData;

   const animatedComponents = makeAnimated();

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
   ];

   const courseOptions = [
      {
         label: 'SSLC',
         value: 'SSLC',
      },
      {
         label: 'Plustwo',
         value: 'Plustwo',
      },
   ];

   const batchOptions = [
      {
         label: 'Science',
         value: 'Science',
      },
      {
         label: 'Commerce',
         value: 'Commerce',
      },
      {
         label: 'Humanities',
         value: 'Humanities',
      },
   ];

   const intakeOptions = [
      {
         label: 'March',
         value: 'March',
      },
      {
         label: 'September',
         value: 'September',
      },
   ];

   const modeOptions = [
      {
         label: 'Online',
         value: 'Online',
      },
      {
         label: 'Offline',
         value: 'Offline',
      },
      // {
      //    label: 'Correspondent',
      //    value: 'Correspondent',
      // },
   ];

   const branchOptions = [
      {
         label: 'Kumaranellur',
         value: 'Kumaranellur',
      },
   ];

   const ssclSubjects = [
      {
         label: 'English',
         value: 'English',
      },
      {
         label: 'Malayalam',
         value: 'Malayalam',
      },
      {
         label: 'Social Science',
         value: 'Social Science',
      },
      {
         label: 'Home Science',
         value: 'Home Science',
      },
      {
         label: 'Business Studies',
         value: 'Business Studies',
      },
      {
         label: 'Maths',
         value: 'Maths',
      },
   ];

   const plsuTwoScienceSubjects = [
      {
         label: 'English',
         value: 'English',
      },
      {
         label: 'Malayalam',
         value: 'Malayalam',
      },
      {
         label: 'Physics',
         value: 'Physics',
      },
      {
         label: 'Chemistry',
         value: 'Chemistry',
      },
      {
         label: 'Biology',
         value: 'Biology',
      },
      {
         label: 'Maths',
         value: 'Maths',
      },
   ];

   const plsuTwoHumanitiesSubjects = [
      {
         label: 'English',
         value: 'English',
      },
      {
         label: 'Malayalam',
         value: 'Malayalam',
      },
      {
         label: 'History',
         value: 'History',
      },
      {
         label: 'Political Science',
         value: 'Political Science',
      },
      {
         label: 'Sociology',
         value: 'Sociology',
      },
   ];

   const plsuTwoCommerceSubjects = [
      {
         label: 'English',
         value: 'English',
      },
      {
         label: 'Malayalam',
         value: 'Malayalam',
      },
      {
         label: 'Accountancy',
         value: 'Accountancy',
      },
      {
         label: 'Business Studies',
         value: 'Business Studies',
      },
      {
         label: 'Political Science',
         value: 'Political Science',
      },
      {
         label: 'Economics',
         value: 'Economics',
      },
   ];

   const subjectsOptions = [
      {
         label: 'Science',
         value: 'Science',
      },
      {
         label: 'English',
         value: 'English',
      },
      {
         label: 'Malayalam',
         value: 'Malayalam',
      },
      {
         label: 'Physics',
         value: 'Physics',
      },
      {
         label: 'Chemistry',
         value: 'Chemistry',
      },
      {
         label: 'Biology',
         value: 'Biology',
      },
      {
         label: 'Maths',
         value: 'Maths',
      },
      {
         label: 'Humanities',
         value: 'Humanities',
      },
      {
         label: 'Politics',
         value: 'Politics',
      },
      {
         label: 'Sociology',
         value: 'Sociology',
      },
      {
         label: 'Commerce',
         value: 'Commerce',
      },
      {
         label: 'Accountancy',
         value: 'Accountancy',
      },
      {
         label: 'Business Studies',
         value: 'Business Studies',
      },
      {
         label: 'Economics',
         value: 'Economics',
      },
   ];

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

   const streamOptions = [
      {
         label: 'Stream 1',
         value: 'Stream1',
      },
      {
         label: 'Stream 2',
         value: 'Stream2',
      },
      {
         label: 'Stream 3',
         value: 'Stream3',
      },
      {
         label: 'Stream 4',
         value: 'Stream4',
      },
   ];

   const examMonthOptions = [
      {
         label: 'January',
         value: 'January',
      },
      {
         label: 'February',
         value: 'February',
      },
      {
         label: 'March',
         value: 'March',
      },
      {
         label: 'April',
         value: 'April',
      },
      {
         label: 'May',
         value: 'May',
      },
      {
         label: 'June',
         value: 'June',
      },
      {
         label: 'July',
         value: 'July',
      },
      {
         label: 'August',
         value: 'August',
      },
      {
         label: 'September',
         value: 'September',
      },
      {
         label: 'October',
         value: 'October',
      },
      {
         label: 'November',
         value: 'November',
      },
      {
         label: 'December',
         value: 'December',
      },
   ];

   const academicStatusOptions = [
      {
         label: 'Pass',
         value: 'Pass',
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

   const registrationStatusOptions = [
      {
         label: 'Registered',
         value: 'Registered',
      },
      {
         value: 'NotRegistered',
         label: 'NotRegistered',
      },
   ];

   const performSearch = async (query) => {
      try {
         // const { data } = await axios.get(
         //   `https://lobster-app-yjjm5.ondigitalocean.app/api/students/search/${query}`
         // );

         // const { data } = await axios.get(
         //   `http://127.0.0.1:5000/api/students/search/${query}`
         // );

         const { data } = await axios.get(
            `https://lms-backend-0hls.onrender.com/api/students/search/${query}`
         );
         setStudentData(data);
      } catch (error) {
         window.alert(error.response.data.message);
         // Set studentData to an empty array in case of an error
         setStudentData([]);
      }
   };

   const submitHandler = async () => {
      //check if passwords are matching, if yes throw an error
      //else save that in a modifyStudentRequestObject

      if (password !== confirmPassword) {
         window.alert(`passwords doesn't match`);
         return;
      }

      if (!studentData.optionalSubjectsExam) {
         studentData.optionalSubjects = [];
      }

      if (!studentData.toc) {
         studentData.tocSubjects = [];
         studentData.tocSubmitted = false;
         studentData.tocReceived = false;
      }

      if (studentData.course === 'SSLC') {
         studentData.batch = undefined;
      }

      const modifyStudentRequestObject = {
         ...studentData,
         password,
      };

      console.log(`printing the modified student`);
      console.log(studentData.academicStatus);

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      setLoading(true);

      try {
         // const { data } = await axios.put(
         //   'https://lobster-app-yjjm5.ondigitalocean.app/api/students/updateExisting',
         //   modifyStudentRequestObject,
         //   config
         // );

         //  const { data } = await axios.put(
         //     'http://127.0.0.1:5000/api/students/updateExisting',
         //     modifyStudentRequestObject,
         //     config
         //  );

         const { data } = await axios.put(
            'https://lms-backend-0hls.onrender.com/api/students/updateExisting',
            modifyStudentRequestObject,
            config
         );
         if (data.name) {
            window.alert('Student modified successfully');
         }

         //navigate to the home page
         setTimeout(() => {
            if (teacherInfo.role === 'Tutor') {
               navigate('/updatefee');
            } else {
               navigate('/');
            }
         }, 1000);
      } catch (error) {
         window.alert(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (studentData.password) {
         setPassword(studentData.password);
         setConfirmPassword(studentData.password);
      }
   }, [studentData]);

   return (
      <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
         <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
            {/* mobile screens */}
            <div className="block md:hidden  ">
               <div className="flex flex-col h-screen">
                  <div className="pt-10 px-5 flex flex-col">
                     <h1 className="text-xl text-[#2740CD] font-bold">
                        Modify Student
                     </h1>
                     <p className="text-gray-500">
                        Enter details to update student
                     </p>
                  </div>
                  <div className="p-5">
                     <SearchBar onSearch={performSearch} />
                  </div>
                  {studentData._id ? (
                     <div className="flex flex-col gap-1 px-5 overflow-y-auto">
                        <div className="pt-0">
                           <label
                              htmlFor="name"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Name
                           </label>
                           <input
                              type="text"
                              id="name"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="John"
                              value={studentData.name}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    name: e.target.value,
                                 })
                              }
                              required
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="email"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Email
                           </label>
                           <input
                              type="email"
                              id="email"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder=""
                              value={studentData.email}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    name: e.target.value,
                                 })
                              }
                              required
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="phone"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Phone
                           </label>
                           <input
                              type="tel"
                              id="phone"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder=""
                              value={studentData.phoneNumber}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    phoneNumber: e.target.value,
                                 })
                              }
                              required
                           />
                        </div>
                        <div className="pt-1">
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={yearOptions.find(
                                 (option) => option.value === studentData.year
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    year: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={courseOptions.find(
                                 (option) => option.value === studentData.course
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    course: e.value,
                                 })
                              }
                           />
                        </div>

                        <div
                           className={`pt-1 ${
                              studentData.course === 'SSLC' ? 'hidden' : 'block'
                           }`}
                        >
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={batchOptions.find(
                                 (option) => option.value === studentData.batch
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    batch: e.value,
                                 })
                              }
                           />
                        </div>

                        <div className="pt-1">
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={intakeOptions.find(
                                 (option) => option.value === studentData.intake
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    intake: e.value,
                                 })
                              }
                           />
                        </div>

                        <div className="pt-1">
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={modeOptions.find(
                                 (option) => option.value === studentData.mode
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    mode: e.value,
                                 })
                              }
                           />
                        </div>

                        <div className="pt-1">
                           <label
                              htmlFor="branch"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Branch
                           </label>
                           <Select
                              options={branchOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={branchOptions.find(
                                 (option) => option.value === studentData.branch
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    branch: e.value,
                                 })
                              }
                           />
                        </div>

                        <div className="pt-1">
                           <label
                              htmlFor="password"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Password
                           </label>
                           <input
                              type="text"
                              id="password"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="******"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="confirmPassword"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Confirm Password
                           </label>
                           <input
                              type="text"
                              id="confirmPassword"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="******"
                              required
                              value={confirmPassword}
                              onChange={(e) =>
                                 setConfirmPassword(e.target.value)
                              }
                           />
                        </div>

                        <div className="pt-1">
                           <label
                              htmlFor="referenceNo"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Reference No
                           </label>
                           <input
                              type="text"
                              id="referenceNo"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="Reference No"
                              required
                              value={studentData.referenceNumber}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    referenceNumber: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="registrationFee"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Registration Fees
                           </label>
                           <input
                              type="text"
                              id="registrationFee"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="Registration Fees"
                              required
                              value={studentData.feeDetails.registrationFees}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    feeDetails: {
                                       ...studentData.feeDetails,
                                       registrationFees: e.target.value,
                                    },
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="examFee"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Exam Fees
                           </label>
                           <input
                              type="text"
                              id="examFee"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="Exam Fees"
                              required
                              value={studentData.feeDetails.examFees}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    feeDetails: {
                                       ...studentData.feeDetails,
                                       examFees: e.target.value,
                                    },
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="subjects"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Subjects
                           </label>
                           <Select
                              options={
                                 studentData.course === 'SSLC'
                                    ? ssclSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Science'
                                    ? plsuTwoScienceSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Commerce'
                                    ? plsuTwoCommerceSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Humanities'
                                    ? plsuTwoHumanitiesSubjects
                                    : null
                              }
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={false}
                              isMulti
                              value={studentData.subjects.map((subject) => ({
                                 value: subject,
                                 label: subject, // Assuming the subject value is the same as the label
                              }))}
                              onChange={(selectedOptions) => {
                                 const selectedValues = selectedOptions.map(
                                    (option) => option.value
                                 );
                                 setStudentData({
                                    ...studentData,
                                    subjects: selectedValues,
                                 });
                                 // setSubjects(selectedValues);
                              }}
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="optionalSubjects"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Optional Subjects
                           </label>
                           <Select
                              options={booleanOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={booleanOptions.find(
                                 (option) =>
                                    option.value ===
                                    studentData.optionalSubjectsExam
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    optionalSubjectsExam: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="toc"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              TOC
                           </label>
                           <Select
                              options={booleanOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={booleanOptions.find(
                                 (option) => option.value === studentData.toc
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    toc: e.value,
                                 })
                              }
                           />
                        </div>
                        <div
                           className={`pt-1 ${
                              !studentData.optionalSubjectsExam
                                 ? 'hidden'
                                 : 'block'
                           }`}
                        >
                           <label
                              htmlFor="subjects"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Optional Subjects
                           </label>
                           <Select
                              options={
                                 studentData.course === 'SSLC'
                                    ? ssclSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Science'
                                    ? subjectsOptions
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Commerce'
                                    ? subjectsOptions
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Humanities'
                                    ? subjectsOptions
                                    : null
                              }
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              value={studentData.optionalSubjects.map(
                                 (subject) => ({
                                    value: subject,
                                    label: subject, // Assuming the subject value is the same as the label
                                 })
                              )}
                              onChange={(selectedOptions) => {
                                 const selectedValues = selectedOptions.map(
                                    (option) => option.value
                                 );
                                 setStudentData({
                                    ...studentData,
                                    optionalSubjects: selectedValues,
                                 });
                                 // setSubjects(selectedValues);
                              }}
                           />
                        </div>
                        <div
                           className={`pt-1 ${
                              !studentData.toc ? 'hidden' : 'block'
                           }`}
                        >
                           <label
                              htmlFor="tocSubjects"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              TOC Subjects
                           </label>
                           <Select
                              options={
                                 studentData.course === 'SSLC'
                                    ? ssclSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Science'
                                    ? plsuTwoScienceSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Commerce'
                                    ? plsuTwoCommerceSubjects
                                    : studentData.course === 'Plustwo' &&
                                      studentData.batch === 'Humanities'
                                    ? plsuTwoHumanitiesSubjects
                                    : null
                              }
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              value={studentData.tocSubjects.map((subject) => ({
                                 value: subject,
                                 label: subject, // Assuming the subject value is the same as the label
                              }))}
                              onChange={(selectedOptions) => {
                                 const selectedValues = selectedOptions.map(
                                    (option) => option.value
                                 );
                                 setStudentData({
                                    ...studentData,
                                    tocSubjects: selectedValues,
                                 });
                              }}
                           />
                        </div>
                        <div
                           className={`pt-1 ${
                              !studentData.toc ? 'hidden' : 'block'
                           }`}
                        >
                           <label
                              htmlFor="tocSubmitted"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              TOC Submitted
                           </label>
                           <Select
                              options={booleanOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={booleanOptions.find(
                                 (option) =>
                                    option.value === studentData.tocSubmitted
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    tocSubmitted: e.value,
                                 })
                              }
                           />
                        </div>
                        <div
                           className={`pt-1 ${
                              !studentData.toc ? 'hidden' : 'block'
                           }`}
                        >
                           <label
                              htmlFor="tocRecieved"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              TOC Recieved
                           </label>
                           <Select
                              options={booleanOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={booleanOptions.find(
                                 (option) =>
                                    option.value === studentData.tocReceived
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    tocReceived: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className={`pt-1`}>
                           <label
                              htmlFor="stream"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Choose Stream
                           </label>
                           <Select
                              options={streamOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={streamOptions.filter(
                                 (option) =>
                                    option.value ===
                                    studentData.registrationStream
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    registrationStream: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="enrollmentNo"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Enrollment number
                           </label>
                           <input
                              type="text"
                              id="enrollmentNo"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="UIX677"
                              required
                              value={studentData.enrollmentNumber}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    enrollmentNumber: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={academicStatusOptions.find(
                                 (option) =>
                                    option.value === studentData.academicStatus
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    academicStatus: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              value={registrationStatusOptions.find(
                                 (option) =>
                                    option.value ===
                                    studentData.registrationStatus
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    registrationStatus: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className={`pt-1`}>
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
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={examMonthOptions.filter(
                                 (option) =>
                                    option.value === studentData.examMonth
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    examMonth: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="examCentre"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Exam Centre
                           </label>
                           <input
                              type="text"
                              id="examCentre"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="Kochi"
                              required
                              value={studentData.examCentre}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    examCentre: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1">
                           <label
                              htmlFor="lastNiosYear"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              Last NIOS exam year
                           </label>
                           <input
                              type="text"
                              id="examCentre"
                              className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                              placeholder="2020"
                              required
                              value={studentData.lastExamYear}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    lastExamYear: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className={`pt-1`}>
                           <label
                              htmlFor="tmaReceived"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              TMA Recieved
                           </label>
                           <Select
                              options={booleanOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={booleanOptions.find(
                                 (option) =>
                                    option.value === studentData.tmaReceived
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    tmaReceived: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className={`pt-1`}>
                           <label
                              htmlFor="tmaSubmitted"
                              className="block text-base font-medium text-gray-500 pb-1"
                           >
                              TMA Submitted
                           </label>
                           <Select
                              options={booleanOptions}
                              styles={{
                                 control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '12px',
                                    padding: '0.05rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                 }),
                              }}
                              closeMenuOnSelect={true}
                              isSearchable={false}
                              value={booleanOptions.find(
                                 (option) =>
                                    option.value === studentData.tmaSubmitted
                              )}
                              onChange={(e) =>
                                 setStudentData({
                                    ...studentData,
                                    tmaSubmitted: e.value,
                                 })
                              }
                           />
                        </div>
                        <div className="pt-1 pb-20">
                           <Button
                              buttonStyle="bg-[#2740CD] text-white rounded-lg text-base font-semibold w-full p-3 mt-5"
                              onClick={submitHandler}
                              Icon={HourglassEmptyIcon}
                              loading={loading}
                              text={'Modify Student'}
                           />
                        </div>
                     </div>
                  ) : (
                     <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                        <img
                           src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                           className="mix-blend-multiply w-4/6"
                           alt=""
                        />
                        <h1 className="text-center text-md font-normal text-gray-500">
                           No student data available
                        </h1>
                     </div>
                  )}
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
               <div className="col-span-6 h-full  px-12 grid grid-rows-12 3xl:grid-rows-12 overflow-hidden ">
                  <div className="row-span-1 3xl:row-span-2 flex flex-col justify-center 3xl:justify-center px-4 ">
                     <h1 className="text-xl md:text-3xl lg:text-4xl 3xl:text-4xl font-semibold pt-10">
                        Modify students
                     </h1>
                     <h1 className="text-md lg:text-xl 3xl:text-xl font-medium text-[#333333]">
                        Modify the student based on Admn No / Mob No
                     </h1>
                  </div>

                  <div className="row-span-1 p-6">
                     <SearchBar onSearch={performSearch} />
                  </div>

                  {studentData._id ? (
                     <div className="  h-full">
                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="name"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Name
                                 </label>
                                 <input
                                    type="text"
                                    id="name"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="John"
                                    value={studentData.name}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          name: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="email"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Email
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder=""
                                    value={studentData.email}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          email: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="phone"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Phone
                                 </label>
                                 <input
                                    type="tel"
                                    id="phone"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder=""
                                    value={studentData.phoneNumber}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          phoneNumber: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>

                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="parentPhone"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Parent Phone
                                 </label>
                                 <input
                                    type="tel"
                                    id="parentPhone"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder=""
                                    value={studentData.parentNumber}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          parentNumber: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
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
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={courseOptions.find(
                                       (option) =>
                                          option.value === studentData.course
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          course: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div
                              className={`col-span-6 ${
                                 studentData.course === 'SSLC'
                                    ? 'hidden'
                                    : 'block'
                              }`}
                           >
                              <div className="pt-2">
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
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value === studentData.batch
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          batch: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
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
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={intakeOptions.find(
                                       (option) =>
                                          option.value === studentData.intake
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          intake: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className={`col-span-6`}>
                              <div className="pt-2">
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
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={modeOptions.find(
                                       (option) =>
                                          option.value === studentData.mode
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          mode: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-12">
                              <div className="pt-2">
                                 <label
                                    htmlFor="branch"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Branch
                                 </label>
                                 <Select
                                    options={branchOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={branchOptions.find(
                                       (option) =>
                                          option.value === studentData.branch
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          branch: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="password"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Password
                                 </label>
                                 <input
                                    type="password"
                                    id="password"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) =>
                                       setPassword(e.target.value)
                                    }
                                    required
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="confirmPassword"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Confirm Password
                                 </label>
                                 <input
                                    type="password"
                                    id="confirmPassword"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="******"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                       setConfirmPassword(e.target.value)
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-12">
                              <div className="pt-2">
                                 <label
                                    htmlFor="referenceNo"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Reference No
                                 </label>
                                 <input
                                    type="text"
                                    id="referenceNo"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="Reference No"
                                    value={studentData.referenceNumber}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          referenceNumber: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="registrationFee"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Registration Fees
                                 </label>
                                 <input
                                    type="text"
                                    id="registrationFee"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="Registration Fees"
                                    value={
                                       studentData.feeDetails.registrationFees
                                    }
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          feeDetails: {
                                             ...studentData.feeDetails,
                                             registrationFees: e.target.value,
                                          },
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="examFee"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Exam Fees
                                 </label>
                                 <input
                                    type="text"
                                    id="examFee"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="Exam Fees"
                                    value={studentData.feeDetails.examFees}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          feeDetails: {
                                             ...studentData.feeDetails,
                                             examFees: e.target.value,
                                          },
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="row-span-1">
                           <div className="pt-2">
                              <label
                                 htmlFor="subjects"
                                 className="block text-base font-medium text-gray-500 pb-1"
                              >
                                 Subjects
                              </label>
                              <Select
                                 options={subjectsOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '12px',
                                       padding: '0.05rem',
                                       borderWidth: '1px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 isMulti
                                 value={studentData.subjects.map((subject) => ({
                                    value: subject,
                                    label: subject, // Assuming the subject value is the same as the label
                                 }))}
                                 onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(
                                       (option) => option.value
                                    );
                                    setStudentData({
                                       ...studentData,
                                       subjects: selectedValues,
                                    });
                                    // setSubjects(selectedValues);
                                 }}
                              />
                           </div>
                        </div>

                        <div className="row-span-1 grid grid-cols-12 gap-4">
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="toc"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    TOC
                                 </label>
                                 <Select
                                    options={booleanOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value ===
                                          studentData.optionalSubjectsExam
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          optionalSubjectsExam: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="optionalSubjects"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Optional Subjects
                                 </label>
                                 <Select
                                    options={booleanOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value ===
                                          studentData.optionalSubjectsExam
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          optionalSubjectsExam: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div
                           className={`row-span-1 ${
                              !studentData.optionalSubjectsExam
                                 ? 'hidden'
                                 : 'block'
                           }`}
                        >
                           <div className="pt-2">
                              <label
                                 htmlFor="optionalSubjectsOptions"
                                 className="block text-base font-medium text-gray-500 pb-1"
                              >
                                 Optional Subjects Options
                              </label>
                              <Select
                                 options={optionalSubjectsOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '12px',
                                       padding: '0.05rem',
                                       borderWidth: '1px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 isMulti
                                 value={studentData.optionalSubjects.map(
                                    (subject) => ({
                                       value: subject,
                                       label: subject, // Assuming the subject value is the same as the label
                                    })
                                 )}
                                 onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(
                                       (option) => option.value
                                    );
                                    setStudentData({
                                       ...studentData,
                                       optionalSubjects: selectedValues,
                                    });
                                    // setSubjects(selectedValues);
                                 }}
                              />
                           </div>
                        </div>

                        <div
                           className={`row-span-1 ${
                              !studentData.toc ? 'hidden' : 'block'
                           }`}
                        >
                           <div className="pt-2">
                              <label
                                 htmlFor="tocSubjects"
                                 className="block text-base font-medium text-gray-500 pb-1"
                              >
                                 TOC Subjects
                              </label>
                              <Select
                                 options={subjectsOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '12px',
                                       padding: '0.05rem',
                                       borderWidth: '1px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 isMulti
                                 value={studentData.tocSubjects.map(
                                    (subject) => ({
                                       value: subject,
                                       label: subject, // Assuming the subject value is the same as the label
                                    })
                                 )}
                                 onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(
                                       (option) => option.value
                                    );
                                    setStudentData({
                                       ...studentData,
                                       tocSubjects: selectedValues,
                                    });
                                    // setSubjects(selectedValues);
                                 }}
                              />
                           </div>
                        </div>

                        <div
                           className={`row-span-1 grid grid-cols-12 gap-4 ${
                              !studentData.toc ? 'hidden' : 'block'
                           }`}
                        >
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="tocSubmitted"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    TOC Submitted
                                 </label>
                                 <Select
                                    options={booleanOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value ===
                                          studentData.tocSubmitted
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          tocSubmitted: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="tocRecieved"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    TOC Recieved
                                 </label>
                                 <Select
                                    options={booleanOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value ===
                                          studentData.tocReceived
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          tocReceived: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div className={`row-span-1 grid grid-cols-12 gap-4`}>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="Stream"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Stream
                                 </label>
                                 <Select
                                    options={streamOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={streamOptions.filter(
                                       (option) =>
                                          option.value ===
                                          studentData.registrationStream
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          registrationStream: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="enrollmentNo"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Enrollment Number
                                 </label>
                                 <input
                                    type="text"
                                    id="enrollmentNo"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="UIUX1023"
                                    value={studentData.enrollmentNumber}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          enrollmentNumber: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className={`row-span-1 grid grid-cols-12 gap-4`}>
                           <div className="col-span-6">
                              <div className="pt-2">
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
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={examMonthOptions.filter(
                                       (option) =>
                                          option.value === studentData.examMonth
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          examMonth: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="examCentre"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Exam centre
                                 </label>
                                 <input
                                    type="text"
                                    id="examCentre"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="Kochi"
                                    value={studentData.examCentre}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          examCentre: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div className={`row-span-1 grid grid-cols-12 gap-4`}>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="tmaReceived"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    TMA received
                                 </label>
                                 <Select
                                    options={booleanOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value ===
                                          studentData.tmaReceived
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          tmaReceived: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="tmaSubmitted"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    TMA submitted
                                 </label>
                                 <Select
                                    options={booleanOptions}
                                    styles={{
                                       control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '12px',
                                          padding: '0.05rem',
                                          borderWidth: '1px',
                                          backgroundColor: 'RGB(255, 255, 255)',
                                       }),
                                    }}
                                    closeMenuOnSelect={true}
                                    isSearchable={false}
                                    value={booleanOptions.find(
                                       (option) =>
                                          option.value ===
                                          studentData.tmaSubmitted
                                    )}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          tmaSubmitted: e.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <div className={`row-span-1 grid grid-cols-12 gap-4`}>
                           <div className="col-span-6">
                              <div className="pt-2">
                                 <label
                                    htmlFor="niosExamYear"
                                    className="block text-base font-medium text-gray-500 pb-1"
                                 >
                                    Last NIOS exam year
                                 </label>
                                 <input
                                    type="text"
                                    id="niosExamYear"
                                    className="bg-white border border-white text-gray-800 text-base rounded-lg block w-full p-2.5"
                                    placeholder="2020"
                                    value={studentData.lastExamYear}
                                    onChange={(e) =>
                                       setStudentData({
                                          ...studentData,
                                          lastExamYear: e.target.value,
                                       })
                                    }
                                    required
                                 />
                              </div>
                           </div>
                           <div className="col-span-6"></div>
                        </div>

                        <div className="lg:row-span-2 md:row-span-1 pt-4  float-end justify-end">
                           <div className="pt-2 pb-10 ">
                              <Button
                                 buttonStyle="bg-[#2740CD] text-white rounded-lg text-base font-semibold w-full p-3 mt-5"
                                 onClick={submitHandler}
                                 text={'Modify student'}
                                 Icon={HourglassEmptyIcon}
                                 loading={loading}
                              />
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="row-span-10 text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center ">
                        <img
                           src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                           className="mix-blend-multiply flex justify-center items-center w-full"
                           alt=""
                        />
                        <h1 className="text-center text-md font-normal text-gray-500">
                           No student data available
                        </h1>
                     </div>
                  )}
               </div>
            </div>

            {/* pc screens */}
            <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen overflow-hidden">
               <div className="col-span-2 ">
                  <SidebarNew />
               </div>
               <div className="col-span-9 overflow-auto ">
                  <div className="w-full flex justify-between pt-7 px-12">
                     <div className="">
                        <h1 className="text-xl 3xl:text-2xl font-semibold">
                           Modify student
                        </h1>
                        <h2 className="text-gray-500 text-sm 3xl:text-base">
                           Enter admission number to view student details
                        </h2>
                     </div>
                     <div className="w-1/2">
                        <SearchBar onSearch={performSearch} />
                     </div>
                  </div>
                  {studentData._id ? (
                     <div>
                        <div className="grid grid-cols-3 gap-3 px-12 pt-9">
                           <div className="">
                              <label
                                 for="name"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Name
                              </label>
                              <input
                                 type="text"
                                 id="name"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="John doe"
                                 value={studentData.name}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       name: e.target.value,
                                    })
                                 }
                                 required
                              />
                           </div>
                           <div className="">
                              <label
                                 for="email"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 email
                              </label>
                              <input
                                 type="text"
                                 id="email"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="somehing@gmail.com"
                                 value={studentData.email}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       email: studentData.email,
                                    })
                                 }
                                 required
                              />
                           </div>
                           <div className="">
                              <label
                                 for="phoneNumber"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Phone number
                              </label>
                              <input
                                 type="text"
                                 id="phoneNumber"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="967335361"
                                 value={studentData.phoneNumber}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       phoneNumber: e.target.value,
                                    })
                                 }
                                 required
                              />
                           </div>
                           <div className="">
                              <label
                                 htmlFor="course"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
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
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={courseOptions.find(
                                    (option) =>
                                       option.value === studentData.course
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       course: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div
                              className={`${
                                 studentData.course === 'SSLC'
                                    ? 'hidden'
                                    : 'block'
                              }`}
                           >
                              <label
                                 htmlFor="batch"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
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
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={batchOptions.find(
                                    (option) =>
                                       option.value === studentData.batch
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       batch: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="">
                              <label
                                 htmlFor="intake"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
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
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={intakeOptions.find(
                                    (option) =>
                                       option.value === studentData.intake
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       intake: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="">
                              <label
                                 htmlFor="mode"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
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
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={modeOptions.find(
                                    (option) =>
                                       option.value === studentData.mode
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       mode: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="col-span-2">
                              <label
                                 htmlFor="branch"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Branch
                              </label>
                              <Select
                                 options={branchOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0.2rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={branchOptions.find(
                                    (option) =>
                                       option.value === studentData.branch
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       branch: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="">
                              <label
                                 for="password"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Password
                              </label>
                              <input
                                 type="text"
                                 id="password"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="**********"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                              />
                           </div>
                           <div className="">
                              <label
                                 for="confirmPassword"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Confirm password
                              </label>
                              <input
                                 type="text"
                                 id="confirmPassword"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="**********"
                                 value={confirmPassword}
                                 onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                 }
                                 required
                              />
                           </div>
                           <div className="">
                              <label
                                 for="refNo"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Reference no
                              </label>
                              <input
                                 type="text"
                                 id="refNo"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="UIXO89654"
                                 value={studentData.referenceNumber}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       referenceNumber: e.target.value,
                                    })
                                 }
                                 required
                              />
                           </div>
                           <div className="col-span-3">
                              <label
                                 htmlFor="subjects"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Subjects
                              </label>
                              <Select
                                 options={subjectsOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0.2rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 isMulti
                                 value={studentData.subjects.map((subject) => ({
                                    value: subject,
                                    label: subject,
                                 }))}
                                 onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(
                                       (option) => option.value
                                    );
                                    setStudentData({
                                       ...studentData,
                                       subjects: selectedValues,
                                    });
                                 }}
                              />
                           </div>
                           <div className="">
                              <label
                                 htmlFor="optionalSubjects"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Optional subjects
                              </label>
                              <Select
                                 options={booleanOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0.15rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 value={booleanOptions.find(
                                    (option) =>
                                       option.value ===
                                       studentData.optionalSubjectsExam
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       optionalSubjectsExam: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="">
                              <label
                                 for="examFee"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Exam fee
                              </label>
                              <input
                                 type="text"
                                 id="examFee"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="1500"
                                 value={studentData.feeDetails.examFees}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       feeDetails: {
                                          examFees: e.target.value,
                                       },
                                    })
                                 }
                                 required
                              />
                           </div>
                           <div className="">
                              <label
                                 for="regFee"
                                 class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                              >
                                 Registration fee
                              </label>
                              <input
                                 type="text"
                                 id="regFee"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="1500"
                                 value={studentData.feeDetails.registrationFees}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       feeDetails: {
                                          registrationFees: e.target.value,
                                       },
                                    })
                                 }
                                 required
                              />
                           </div>
                           <div
                              className={`${
                                 studentData.optionalSubjectsExam
                                    ? 'block col-span-3'
                                    : 'hidden'
                              }`}
                           >
                              <label
                                 htmlFor="optionalSubjects"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Optional subjects
                              </label>
                              <Select
                                 options={optionalSubjectsOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 isMulti
                                 value={studentData.optionalSubjects.map(
                                    (subject) => ({
                                       value: subject,
                                       label: subject,
                                    })
                                 )}
                                 onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(
                                       (option) => option.value
                                    );
                                    setStudentData({
                                       ...studentData,
                                       optionalSubjects: selectedValues,
                                    });
                                 }}
                              />
                           </div>
                           <div className="">
                              <label
                                 htmlFor="toc"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Toc
                              </label>
                              <Select
                                 options={booleanOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 isSearchable={false}
                                 value={booleanOptions.find(
                                    (option) => option.value === studentData.toc
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       toc: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div
                              className={`${
                                 studentData.toc ? 'block' : 'hidden'
                              }`}
                           >
                              <label
                                 htmlFor="tocReceived"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Toc received
                              </label>
                              <Select
                                 options={booleanOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 isSearchable={false}
                                 value={booleanOptions.find(
                                    (option) =>
                                       option.value === studentData.tocReceived
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       tocReceived: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div
                              className={`${
                                 studentData.toc ? 'block' : 'hidden'
                              }`}
                           >
                              <label
                                 htmlFor="tocSubmitted"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Toc submitted
                              </label>
                              <Select
                                 options={booleanOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 isSearchable={false}
                                 value={booleanOptions.find(
                                    (option) =>
                                       option.value === studentData.tocSubmitted
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       tocSubmitted: e.value,
                                    })
                                 }
                              />
                           </div>
                           <div
                              className={`${
                                 studentData.toc ? 'block col-span-3' : 'hidden'
                              }`}
                           >
                              <label
                                 htmlFor="tocSubjets"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 TOC subjects
                              </label>
                              <Select
                                 options={subjectsOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 isMulti
                                 value={studentData.tocSubjects.map(
                                    (subject) => ({
                                       value: subject,
                                       label: subject,
                                    })
                                 )}
                                 onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(
                                       (option) => option.value
                                    );
                                    setStudentData({
                                       ...studentData,
                                       tocSubjects: selectedValues,
                                    });
                                 }}
                              />
                           </div>

                           <div className={`block col-span-1`}>
                              <label
                                 htmlFor="stream"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Registration stream
                              </label>
                              <Select
                                 options={streamOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                    }),
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 value={streamOptions.filter(
                                    (option) =>
                                       option.value ===
                                       studentData.registrationStream
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       registrationStream: e.value,
                                    })
                                 }
                              />
                           </div>

                           <div className={`block col-span-2`}>
                              <label
                                 htmlFor="enrollmentNo"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Enrollment Number
                              </label>
                              <input
                                 type="text"
                                 id="enrollmentNo"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="UIUX45HY"
                                 value={studentData.enrollmentNumber}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       enrollmentNumber: e.target.value,
                                    })
                                 }
                                 required
                              />
                           </div>

                           <div className={`block col-span-1`}>
                              <label
                                 htmlFor="examMonth"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Exam month
                              </label>
                              <Select
                                 options={examMonthOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                       color: 'blue',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={examMonthOptions.filter(
                                    (option) =>
                                       option.value === studentData.examMonth
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       examMonth: e.value,
                                    })
                                 }
                              />
                           </div>

                           <div className={`block col-span-1`}>
                              <label
                                 htmlFor="examCenter"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Exam center
                              </label>
                              <input
                                 type="text"
                                 id="examCenter"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="Kochi"
                                 value={studentData.examCentre}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       examCentre: e.target.value,
                                    })
                                 }
                                 required
                              />
                           </div>

                           <div className={`block col-span-1`}>
                              <label
                                 htmlFor="niosExamYear"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 Last NIOS exam year
                              </label>
                              <input
                                 type="text"
                                 id="niosExamYear"
                                 class="bg-white border border-white text-gray-800 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                 placeholder="Kochi"
                                 value={studentData.lastExamYear}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       lastExamYear: e.target.value,
                                    })
                                 }
                                 required
                              />
                           </div>

                           <div className={`block col-span-1`}>
                              <label
                                 htmlFor="tmaReceived"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 TMA received
                              </label>
                              <Select
                                 options={booleanOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                       color: 'blue',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={booleanOptions.find(
                                    (option) =>
                                       option.value === studentData.tmaReceived
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       tmaReceived: e.value,
                                    })
                                 }
                              />
                           </div>

                           <div className={`block col-span-1`}>
                              <label
                                 htmlFor="tmaSubmitted"
                                 className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                              >
                                 TMA submitted
                              </label>
                              <Select
                                 options={booleanOptions}
                                 styles={{
                                    control: (baseStyles, state) => ({
                                       ...baseStyles,
                                       borderRadius: '.5rem',
                                       padding: '0rem',
                                       borderWidth: '0px',
                                       backgroundColor: 'RGB(255, 255, 255)',
                                       fontSize: '14px',
                                       color: 'blue',
                                    }),
                                 }}
                                 closeMenuOnSelect={true}
                                 components={animatedComponents}
                                 value={booleanOptions.find(
                                    (option) =>
                                       option.value === studentData.tmaSubmitted
                                 )}
                                 onChange={(e) =>
                                    setStudentData({
                                       ...studentData,
                                       tmaSubmitted: e.value,
                                    })
                                 }
                              />
                           </div>

                           <div className="float-end flex  justify-end col-span-3 pt-1">
                              <div>
                                 <Button
                                    buttonStyle="bg-[#2740CD] text-white rounded-lg text-sm 3xl:text-lg font-semibold w-full p-3 mt-5"
                                    onClick={submitHandler}
                                    text={'Modify student'}
                                    Icon={HourglassEmptyIcon}
                                    loading={loading}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                        <img
                           src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                           className="mix-blend-multiply w-4/6"
                           alt=""
                        />
                        <h1 className="text-center text-md font-normal text-gray-500">
                           No student data available
                        </h1>
                     </div>
                  )}
               </div>

               {/* <SidebarComponent /> */}
            </div>
         </div>
      </div>
   );
}

export default ModifyStudent;
