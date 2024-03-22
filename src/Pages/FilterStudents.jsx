import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import SidebarNew from '../Components/SidebarNew'
import MobileNavigation from '../Components/MobileNavigation'
import SeachBar from '../Components/SeachBar'
import OverviewCard from '../Components/OverviewCard'
import DataCard from '../Components/DataCard'
import MobileOverviewCard from '../Components/MobileOverviewCard'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'




function FilterStudents() {


  const [admYear, setAdmYear] = useState(null)
  const [course, setCourse] = useState(null)
  const [batch, setBatch] = useState(null)
  const [mode, setMode] = useState(null)
  const [pendingFee, setPendingFee] = useState(null)
  const [registrationStatus, setRegistrationStatus] = useState(null)
  const [academicStatus, setAcademicStatus] = useState(null)
  const [examMonth, setExamMonth] = useState(null)
  const [examCenter, setExamCenter] = useState(null)
  const [tmaRecieved, setTmaRecieved] = useState(null)
  const [tmaSubmitted, setTmaSubmitted] = useState(null)
  const [tocRecieved, setTocRecieved] = useState(null)
  const [tocSubmitted, setTocSubmitted] = useState(null)


  const yearOptions = [
    {
      label: 2024,
      value: 2024
    },
    {
      label: 2025,
      value: 2025
    },
    {
      label: 2026,
      value: 2026
    },
    {
      label: 2027,
      value: 2027
    },
    {
      label: 2028,
      value: 2028
    }
  ]
  const courseOptions = [
    {
      value: 'SSLC',
      label: 'SSLC'
    },
    {
      value: 'Plustwo',
      label: 'Plustwo'
    }
  ]
  const batchOptions = [
    {
      value: "Science",
      label: "Science"
    },
    {
      value: "Commerce",
      label: "Commerce"
    },
    {
      value: "Humanities",
      label: "Humanities"
    }
  ]

  const modeOptions = [
    {
      value: 'Online',
      label: 'Online'
    },
    {
      value: 'Offline',
      label: 'Offline'
    },
    {
      value: 'Correspondence',
      label: 'Correspondence'
    }
  ]
  const pendingFeeOptions = [
    {
      value: 'admissionFee',
      label: 'Admission Fee'
    },
    {
      value: 'registrationFee',
      label: 'Registration Fee'
    },
    {
      value: 'examFee',
      label: 'Exam Fee'
    },
    {
      value: 'firstTermFee',
      label: 'First Term Fee'
    },
    {
      value: 'secondTermFee',
      label: 'Second Term Fee'
    },
    {
      value: 'thirdTermFee',
      label: 'Third Term Fee'
    }
  ]

  const registrationStatusOptions = [
    {
      value: 'Registered',
      label: 'Registered'
    },
    {
      value: 'Not Registered',
      label: 'Not Registered'
    }
  ]

  const academicStatusOptions = [
    {
      value: 'pass',
      label: 'Pass'
    },
    {
      value: 'fail',
      label: 'Fail'
    },
    {
      value: 'cancelled',
      label: 'Cancelled'
    },
    {
      value: 'partiallyCancelled',
      label: 'Partially Cancelled'
    }

  ]
  const examMonthOptions = [
    {
      value: 'january',
      label: 'January'
    },
    {
      value: 'february',
      label: 'February'
    },
    {
      value: 'march',
      label: 'March'
    },
    {
      value: 'april',
      label: 'April'
    },
    {
      value: 'may',
      label: 'May'
    },
    {
      value: 'june',
      label: 'June'
    },
    {
      value: 'july',
      label: 'July'
    },
    {
      value: 'august',
      label: 'August'
    },
    {
      value: 'september',
      label: 'September'
    },
    {
      value: 'october',
      label: 'October'
    },
    {
      value: 'november',
      label: 'November'
    },
    {
      value: 'december',
      label: 'December'
    }
  ]
  const examCenterOptions = [
    {
      value: 'center1',
      label: 'Center 1'
    },
    {
      value: 'center2',
      label: 'Center 2'
    },
    {
      value: 'center3',
      label: 'Center 3'
    },
    {
      value: 'center4',
      label: 'Center 4'
    },
    {
      value: 'center5',
      label: 'Center 5'
    },
    {
      value: 'center6',
      label: 'Center 6'
    },
    {
      value: 'center7',
      label: 'Center 7'
    },
    {
      value: 'center8',
      label: 'Center 8'
    },
    {
      value: 'center9',
      label: 'Center 9'
    },
    {
      value: 'center10',
      label: 'Center 10'
    }
  ]

  const tmaRecievedOptions = [
    {
      value: 'yes',
      label: 'Yes'
    },
    {
      value: 'no',
      label: 'No'
    }
  ]

  const tmaSubmittedOptions = [
    {
      value: 'yes',
      label: 'Yes'
    },
    {
      value: 'no',
      label: 'No'
    }
  ]

  const tocRecievedOptions = [
    {
      value: 'yes',
      label: 'Yes'
    },
    {
      value: 'no',
      label: 'No'
    }
  ]
  const tocSubmittedOptions = [
    {
      value: 'yes',
      label: 'Yes'
    },
    {
      value: 'no',
      label: 'No'
    }
  ]

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden  ">

          <div className='flex flex-col h-screen'>
            <div className='pt-14 px-5 flex flex-col'>
              <h1 className='text-2xl font-semibold'>Filter Student</h1>
              <h1 className='text-[#333333] text-sm'>Filter the student based on Admn No / Mobile No </h1>
            </div>

            <div className='pt-5'><MobileOverviewCard title={'Total students'} subtitle={'2500'} /></div>



            <div className='flex justify-between pt-5 pb-5 px-6 gap-8 '>

              <Button text='Filter' buttonStyle='bg-[#2740CD] text-white px-3 py-1 rounded-xl' navigateUrl={'/applyFilter'} />
              <SeachBar />
            </div>

            <div className='overflow-y-auto flex flex-col gap-3 h-[550px] px-5  pt-5'>
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
              <DataCard
                type="admissions"
                title="Professor"
                tailData="SSLC"
                style={{ h: 'full' }} />
            </div>
          </div>





          <div className='fixed bottom-0 right-0 w-full'>
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
            <div className="row-span-1 3xl:row-span-2 flex flex-col justify-center 3xl:justify-center px-4 ">
              <h1 className="text-xl md:text-3xl lg:text-4xl 3xl:text-4xl font-semibold pt-10">
                Filter students
              </h1>
              <h1 className="text-md lg:text-xl 3xl:text-xl font-medium text-[#333333]">
                Filter the student based on Admn No / Mobile No
              </h1>
            </div>

            <div className="row-span-1   ">
              <OverviewCard title={'Total Students'} value={2500} number={true} />
            </div>

            <div className='row-span-1 flex justify-between  gap-5 pt-5 lg:pt-8 px-5 items-center'>
              <Button text='Filter' buttonStyle='bg-[#2740CD] h-1/2 text-white px-6 py-2  lg:text-xl rounded-xl' navigateUrl={'/applyFilter'} />
              <div className='w-3/4'><SeachBar /></div>

            </div>

            

            <div className="row-span-6">
            <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
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
              <h1 className="text-xl 3xl:text-3xl font-semibold">
                Filter students
              </h1>
              <h1 className="text-md 3xl:text-xl font-normal">
                Lorem ipsum some random sub heading
              </h1>
            </div>

            <div className="row-span-2 3xl:row-span-3  py-3">
              <OverviewCard title={'Total Students'} value={2500} number={true} />
            </div>

            <div className="row-span-4 3xl:row-span-8 pt-4">
              <div className="overflow-y-auto h-full p-4">
                <div className="space-y-3">
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-full  grid grid-rows-12 overflow-hidden">
            <div className='row-span-2  flex flex-col justify-center items-center px-4'>
              <SeachBar />
            </div>
            <div className='row-span-11  px-5 py-2'>
              <div className=' h-full flex flex-col bg-white p-12 rounded-xl'>
                <div className=''>
                  <h2 className='text-base xl:text-xl 3xl:text-2xl font-semibold'>Filter Students</h2>
                  <h2 className='text-sm 3xl:text-md font-normal'>Filter the student based on your criteria</h2>
                </div>
                <div className='overflow-y-auto scroll-smooth pt-8 flex flex-col gap-3'>
                  <div>
                    <label htmlFor="year" className="block text-md xl:text-base font-medium text-gray-900 mb-2">Year</label>
                    <Select options={yearOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md  xl:block 3xl:hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setAdmYear(e.value)} name="feeType" controlShouldRenderValue={admYear ? true : admYear === false ? true : false} />
                    <Select options={yearOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md xl:text-sm 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setAdmYear(e.value)} name="feeType" controlShouldRenderValue={admYear ? true : admYear === false ? true : false} />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-md font-medium text-gray-900 mb-2">Course</label>
                    <Select options={courseOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md xl:block 3xl:hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setCourse(e.value)} name="feeType" controlShouldRenderValue={course ? true : course === false ? true : false} />
                    <Select options={courseOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setCourse(e.value)} name="feeType" controlShouldRenderValue={course ? true : course === false ? true : false} />
                  </div>
                  {course == 'Plustwo' &&
                    <div>
                      <label htmlFor="batch" className="block text-md font-medium text-gray-900 mb-2">Batch</label>
                      <Select options={batchOptions} styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.2rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setBatch(e.value)} name="feeType" controlShouldRenderValue={batch ? true : batch === false ? true : false} />
                      <Select options={batchOptions} styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: '.5rem',
                          padding: '0.08rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setBatch(e.value)} name="feeType" controlShouldRenderValue={batch ? true : batch === false ? true : false} />
                    </div>}

                  <div>
                    <label htmlFor="mode" className="block text-md font-medium text-gray-900 mb-2">Mode</label>
                    <Select options={modeOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setMode(e.value)} name="feeType" controlShouldRenderValue={mode ? true : mode === false ? true : false} />
                    <Select options={modeOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setMode(e.value)} name="feeType" controlShouldRenderValue={mode ? true : mode === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="mode" className="block text-md font-medium text-gray-900 mb-2">Pending Fee</label>
                    <Select options={pendingFeeOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setPendingFee(e.value)} name="feeType" controlShouldRenderValue={pendingFee ? true : pendingFee === false ? true : false} />
                    <Select options={pendingFeeOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setPendingFee(e.value)} name="feeType" controlShouldRenderValue={pendingFee ? true : pendingFee === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="registrationStatus" className="block text-md font-medium text-gray-900 mb-2">Registration Status</label>
                    <Select options={registrationStatusOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setRegistrationStatus(e.value)} name="feeType" controlShouldRenderValue={registrationStatus ? true : registrationStatus === false ? true : false} />
                    <Select options={registrationStatusOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setRegistrationStatus(e.value)} name="feeType" controlShouldRenderValue={registrationStatus ? true : registrationStatus === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="academicStatus" className="block text-md font-medium text-gray-900 mb-2">Academic Status</label>
                    <Select options={academicStatusOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setAcademicStatus(e.value)} name="feeType" controlShouldRenderValue={academicStatus ? true : academicStatus === false ? true : false} />
                    <Select options={academicStatusOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setAcademicStatus(e.value)} name="feeType" controlShouldRenderValue={academicStatus ? true : academicStatus === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="examMonth" className="block text-md font-medium text-gray-900 mb-2">Exam Month</label>
                    <Select options={examMonthOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setExamMonth(e.value)} name="feeType" controlShouldRenderValue={examMonth ? true : examMonth === false ? true : false} />
                    <Select options={examMonthOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setExamMonth(e.value)} name="feeType" controlShouldRenderValue={examMonth ? true : examMonth === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="examCenter" className="block text-md font-medium text-gray-900 mb-2">Exam Center</label>
                    <Select options={examCenterOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setExamCenter(e.value)} name="examCenter" controlShouldRenderValue={examCenter ? true : examCenter === false ? true : false} />
                    <Select options={examCenterOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setExamCenter(e.value)} name="examCenter" controlShouldRenderValue={examCenter ? true : examCenter === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="tmaRecieved" className="block text-md font-medium text-gray-900 mb-2">TMA Recieved</label>
                    <Select options={tmaRecievedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTmaRecieved(e.value)} name="tmaRecieved" controlShouldRenderValue={tmaRecieved ? true : tmaRecieved === false ? true : false} />
                    <Select options={tmaRecievedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTmaRecieved(e.value)} name="tmaRecieved" controlShouldRenderValue={tmaRecieved ? true : tmaRecieved === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="tmaSubmitted" className="block text-md font-medium text-gray-900 mb-2">TMA Submitted</label>
                    <Select options={tmaSubmittedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTmaSubmitted(e.value)} name="tmaSubmitted" controlShouldRenderValue={tmaSubmitted ? true : tmaSubmitted === false ? true : false} />
                    <Select options={tmaSubmittedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTmaSubmitted(e.value)} name="tmaSubmitted" controlShouldRenderValue={tmaSubmitted ? true : tmaSubmitted === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="tocRecieved" className="block text-md font-medium text-gray-900 mb-2">TOC Recieved</label>
                    <Select options={tocRecievedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden " closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocRecieved(e.value)} name="tocRecieved" controlShouldRenderValue={tocRecieved ? true : tocRecieved === false ? true : false} />
                    <Select options={tocRecievedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block " closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocRecieved(e.value)} name="tocRecieved" controlShouldRenderValue={tocRecieved ? true : tocRecieved === false ? true : false} />
                  </div>
                  <div>
                    <label htmlFor="tocSubmitted" className="block text-md font-medium text-gray-900 mb-2">TOC Submitted</label>
                    <Select options={tocSubmittedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.2rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:block hidden" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocSubmitted(e.value)} name="tocSubmitted" controlShouldRenderValue={tocSubmitted ? true : tocSubmitted === false ? true : false} />
                    <Select options={tocSubmittedOptions} styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '.5rem',
                        padding: '0.08rem',
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }} className="border border-gray-200 rounded text-md 3xl:hidden xl:block" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocSubmitted(e.value)} name="tocSubmitted" controlShouldRenderValue={tocSubmitted ? true : tocSubmitted === false ? true : false} />
                  </div>
                  <div className=' flex w-full pt-5 '>
                    <Button text='Apply Filter' buttonStyle='bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-full' />
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
