import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import SidebarNew from '../Components/SidebarNew'
import SearchBar from '../Components/SeachBar';
import axios from 'axios';
import DataCard from '../Components/DataCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '../Components/Button';
import MobileNavigation from '../Components/MobileNavigation';


function ModifyStudent() {

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

  const animatedComponents = makeAnimated();




  const subjectsOptions = [
    {
      label: 'History',
      value: 'History'
    },
    {
      label: 'Politics',
      value: 'Politics'
    },
    {
      label: 'Geography',
      value: 'Geography'
    },
    {
      label: 'Mathematics',
      value: 'Mathematics'
    },
    {
      label: 'Chemistry',
      value: 'Chemistry'
    }
  ]

  const optionalSubjectsOptions = [
    {
      label: 'History',
      value: 'History'
    },
    {
      label: 'Politics',
      value: 'Politics'
    },
    {
      label: 'Geography',
      value: 'Geography'
    },
    {
      label: 'Mathematics',
      value: 'Mathematics'
    },
    {
      label: 'Chemistry',
      value: 'Chemistry'
    }
  ]

  const booleanOptions = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]


  const valuesOnlyArraySubjects = (e) => {
    const newSubjects = e.map(obj => obj.value);
    setSubjects(newSubjects)

  }

  const valuesOnlyOptionalSubjects = (e) => {
    const newOptionalSubjects = e.map(obj => obj.value)
    setOptionalSubjects(newOptionalSubjects)
  }

  const valuesOnlyArrayTocSubjects = (e) => {
    const newToc = e.map(obj => obj.value)
    setTocSubjects(newToc)
  }

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
      // Set studentData to an empty array in case of an error
      setStudentData([]);
    }
  };

  // console.log(studentData);




  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden  ">


          <div className="flex flex-col h-screen">
            <div className="pt-14 px-5 flex flex-col">
              <h1 className="text-2xl font-semibold">Modify Student</h1>
              <h1 className="text-[#333333] text-sm text-nowrap">
                Modify the student based on Admn No / Mob No
              </h1>
            </div>
            <div className='p-5'>
              <SearchBar onSearch={performSearch} />
            </div>

            {/* <div className='p-5'>
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
           </div> */}
            {studentData.length > 0 ? (<div className='flex flex-col gap-2 px-5 overflow-y-auto'>
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
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="John"
                  value={studentData[0]?.name}
                  required
                />
              </div>
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
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="" value={studentData[0]?.email} required />
              </div>
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
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder=""
                  value={studentData[0]?.phoneNumber}
                  required
                />
              </div>
              <div className="pt-2">
                <label
                  htmlFor='parentPhone'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  Parent Phone
                </label>
                <input
                  type="tel"
                  id="parentPhone"
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder=""
                  value={studentData[0]?.parentNumber}
                  required
                />
              </div>
              <div className="pt-2">
                <label htmlFor="password"
                  className="block text-base font-medium text-gray-500 pb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="******"
                  required
                />
              </div>
              <div className="pt-2">
                <label htmlFor="confirmPassword"
                  className="block text-base font-medium text-gray-500 pb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="******"
                  required
                />
              </div>
              <div className="pt-2">
                <label
                  htmlFor="previousNiosResult"
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  Previous NIOS Result
                </label>
                <input
                  type="text"
                  id="previousNiosResult"
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="www.nios.com/result?"
                  required
                />
              </div>
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
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="Reference No"
                  required
                />
              </div>
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
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="Registration Fees"
                  required
                />
              </div>
              <div className="pt-2">
                <label
                  htmlFor='examFee'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  Exam Fees
                </label>
                <input
                  type="text"
                  id="examFee"
                  className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                  placeholder="Exam Fees"
                  required
                />
              </div>
              <div className="pt-2">
                <label
                  htmlFor='subjects'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  Subjects
                </label>
                <Select options={subjectsOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={false} components={animatedComponents} isMulti onChange={(e) => valuesOnlyArraySubjects(e)} onBlur={() => console.log('Blur')} onFocus={() => console.log('Focus')} />
              </div>
              <div className="pt-2">
                <label
                  htmlFor='optionalSubjects'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  Optional Subjects
                </label>
                <Select options={booleanOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setOptionalSubjectsExam(e.value)} controlShouldRenderValue={optionalSubjectsExam !== null ? true : false} />
              </div>
              <div className="pt-2">
                <label
                  htmlFor='toc'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  TOC
                </label>
                <Select options={booleanOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setToc(e.value)} controlShouldRenderValue={toc !== null ? true : false} />
              </div>
              <div className={`pt-2 ${!optionalSubjectsExam ? 'hidden' : 'block'}`}>
                <label
                  htmlFor='optionalSubjectsOptions'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  Optional Subjects Options
                </label>
                <Select options={optionalSubjectsOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={false} components={animatedComponents} isMulti onChange={(e) => valuesOnlyOptionalSubjects(e)} onBlur={() => console.log('Blur')} onFocus={() => console.log('Focus')} />
              </div>
              <div className={`pt-2 ${!toc ? 'hidden' : 'block'}`}>
                <label
                  htmlFor='tocSubjects'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  TOC Subjects
                </label>
                <Select options={subjectsOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={false} components={animatedComponents} isMulti onChange={(e) => valuesOnlyArrayTocSubjects(e)} onBlur={() => console.log('Blur')} onFocus={() => console.log('Focus')} />
              </div>
              <div className={`pt-2 ${!toc ? 'hidden' : 'block'}`}>
                <label
                  htmlFor='tocSubmitted'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  TOC Submitted
                </label>
                <Select options={booleanOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocSubmitted(e.value)} controlShouldRenderValue={tocSubmitted !== null ? true : false} />
              </div>
              <div className={`pt-2 ${!toc ? 'hidden' : 'block'}`}>
                <label
                  htmlFor='tocRecieved'
                  className="block text-base font-medium text-gray-500 pb-1"
                >
                  TOC Recieved
                </label>
                <Select options={booleanOptions} styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '12px',
                    padding: '0.05rem',
                    borderWidth: '1px',
                    backgroundColor: 'RGB(255, 255, 255)',
                  }),
                }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocRecieved(e.value)} controlShouldRenderValue={tocRecieved !== null ? true : false} />
              </div>
              <div className="pt-2 pb-20">
                <button className="bg-[#2740CD] text-white rounded-lg text-base font-semibold w-full p-3 mt-5">Modify Student</button>
              </div>


            </div>)
              : (
                <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                  <img
                    src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                    className="mix-blend-multiply w-4/6"
                    alt=""
                  />
                  <h1 className="text-center">No student data available</h1>
                </div>
              )
            }

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

            {
              studentData.length > 0 ?
                (
                  <div className='  h-full'>
                    <div className='row-span-1 grid grid-cols-12 gap-4'>
                      <div className='col-span-6'>
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
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="John"
                            value={studentData[0]?.name}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-span-6'>
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
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="" value={studentData[0]?.email} required />
                        </div>
                      </div>
                    </div>

                    <div className='row-span-1 grid grid-cols-12 gap-4'>
                      <div className='col-span-6'>
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
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder=""
                            value={studentData[0]?.phoneNumber}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor='parentPhone'
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            Parent Phone
                          </label>
                          <input
                            type="tel"
                            id="parentPhone"
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder=""
                            value={studentData[0]?.parentNumber}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row-span-1 grid grid-cols-12 gap-4'>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label htmlFor="password"
                            className="block text-base font-medium text-gray-500 pb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="******"
                            required
                          />
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label htmlFor="confirmPassword"
                            className="block text-base font-medium text-gray-500 pb-1">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="******"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row-span-1 grid grid-cols-12 gap-4'>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor="previousNiosResult"
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            Previous NIOS Result
                          </label>
                          <input
                            type="text"
                            id="previousNiosResult"
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="www.nios.com/result?"
                            required
                          />
                        </div>
                      </div>
                      <div className='col-span-6'>
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
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="Reference No"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row-span-1 grid grid-cols-12 gap-4'>
                      <div className='col-span-6'>
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
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="Registration Fees"
                            required
                          />
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor='examFee'
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            Exam Fees
                          </label>
                          <input
                            type="text"
                            id="examFee"
                            className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                            placeholder="Exam Fees"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row-span-1'>
                      <div className="pt-2">
                        <label
                          htmlFor='subjects'
                          className="block text-base font-medium text-gray-500 pb-1"
                        >
                          Subjects
                        </label>
                        <Select options={subjectsOptions} styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '12px',
                            padding: '0.05rem',
                            borderWidth: '1px',
                            backgroundColor: 'RGB(255, 255, 255)',
                          }),
                        }} closeMenuOnSelect={false} components={animatedComponents} isMulti onChange={(e) => valuesOnlyArraySubjects(e)} onBlur={() => console.log('Blur')} onFocus={() => console.log('Focus')} />
                      </div>
                    </div>

                    <div className='row-span-1 grid grid-cols-12 gap-4'>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor='toc'
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            TOC
                          </label>
                          <Select options={booleanOptions} styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '12px',
                              padding: '0.05rem',
                              borderWidth: '1px',
                              backgroundColor: 'RGB(255, 255, 255)',
                            }),
                          }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setToc(e.value)} controlShouldRenderValue={toc !== null ? true : false} />
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor='optionalSubjects'
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            Optional Subjects
                          </label>
                          <Select options={booleanOptions} styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '12px',
                              padding: '0.05rem',
                              borderWidth: '1px',
                              backgroundColor: 'RGB(255, 255, 255)',
                            }),
                          }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setOptionalSubjectsExam(e.value)} controlShouldRenderValue={optionalSubjectsExam !== null ? true : false} />
                        </div>
                      </div>
                    </div>

                    <div className={`row-span-1 ${!optionalSubjectsExam ? 'hidden' : 'block'}`}>
                      <div className="pt-2">
                        <label
                          htmlFor='optionalSubjectsOptions'
                          className="block text-base font-medium text-gray-500 pb-1"
                        >
                          Optional Subjects Options
                        </label>
                        <Select options={optionalSubjectsOptions} styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '12px',
                            padding: '0.05rem',
                            borderWidth: '1px',
                            backgroundColor: 'RGB(255, 255, 255)',
                          }),
                        }} closeMenuOnSelect={false} components={animatedComponents} isMulti onChange={(e) => valuesOnlyOptionalSubjects(e)} onBlur={() => console.log('Blur')} onFocus={() => console.log('Focus')} />
                      </div>
                    </div>


                    <div className={`row-span-1 ${!toc ? 'hidden' : 'block'}`}>
                      <div className="pt-2">
                        <label
                          htmlFor='tocSubjects'
                          className="block text-base font-medium text-gray-500 pb-1"
                        >
                          TOC Subjects
                        </label>
                        <Select options={subjectsOptions} styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '12px',
                            padding: '0.05rem',
                            borderWidth: '1px',
                            backgroundColor: 'RGB(255, 255, 255)',
                          }),
                        }} closeMenuOnSelect={false} components={animatedComponents} isMulti onChange={(e) => valuesOnlyArrayTocSubjects(e)} onBlur={() => console.log('Blur')} onFocus={() => console.log('Focus')} />
                      </div>
                    </div>

                    <div className={`row-span-1 grid grid-cols-12 gap-4 ${!toc ? 'hidden' : 'block'}`}>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor='tocSubmitted'
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            TOC Submitted
                          </label>
                          <Select options={booleanOptions} styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '12px',
                              padding: '0.05rem',
                              borderWidth: '1px',
                              backgroundColor: 'RGB(255, 255, 255)',
                            }),
                          }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocSubmitted(e.value)} controlShouldRenderValue={tocSubmitted !== null ? true : false} />
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className="pt-2">
                          <label
                            htmlFor='tocRecieved'
                            className="block text-base font-medium text-gray-500 pb-1"
                          >
                            TOC Recieved
                          </label>
                          <Select options={booleanOptions} styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: '12px',
                              padding: '0.05rem',
                              borderWidth: '1px',
                              backgroundColor: 'RGB(255, 255, 255)',
                            }),
                          }} closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocRecieved(e.value)} controlShouldRenderValue={tocRecieved !== null ? true : false} />

                        </div>
                      </div>
                    </div>

                    <div className='lg:row-span-2 md:row-span-1 pt-10  float-end justify-end'>
                      <div className="pt-2 pb-10 ">
                        <Button
                          text="Modify Student"
                          buttonStyle={"bg-[#2740CD] text-white rounded-lg text-base font-semibold p-3"}
                        >Modify Student</Button>
                      </div>
                    </div>

                  </div>
                )
                :
                (
                  <div className="row-span-10 text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center ">
                    <img
                      src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                      className="mix-blend-multiply flex justify-center items-center w-full"
                      alt=""

                    />
                    <h1 className="text-center">No student data available</h1>
                  </div>
                )
            }


          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen">
          <div className='col-span-2 bg-red-100'>
            <SidebarNew />
          </div>
          {/* <SidebarComponent /> */}
        </div>

      </div>
      {/* <div className='grid grid-cols-5'>
            <div className='w-full '>
                <Sidebar />
            </div>
            <div>Home</div>
        </div> */}
    </div>
  )
}

export default ModifyStudent