import React, { useState } from 'react'
import MobileNavigation from '../Components/MobileNavigation'
import Select from 'react-select'
import Button from '../Components/Button'

function Filter() {
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
        <div className="block md:hidden bg-[#f0f0f0]">
            <div className='flex flex-col h-screen'>
                <div className='flex flex-col p-8'>
                    <h1 className='text-2xl font-bold'>Filter Students</h1>
                    <h1 className='text-sm text-gray-500'>Filter students based on your criteria</h1>
                </div>
                <div className='flex flex-col gap-3 px-6 overflow-y-auto scroll-smooth'>
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-900 mb-2">Year</label>
                        <Select options={yearOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setAdmYear(e.value)} name="feeType" controlShouldRenderValue={admYear ? true : admYear === false ? true : false} />
                    </div>

                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-900 mb-2">Course</label>
                        <Select options={courseOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setCourse(e.value)} name="feeType" controlShouldRenderValue={course ? true : course === false ? true : false} />
                    </div>
                    {course == 'Plustwo' &&
                        <div>
                            <label htmlFor="batch" className="block text-sm font-medium text-gray-900 mb-2">Batch</label>
                            <Select options={batchOptions} styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: '.5rem',
                                    padding: '0.2rem',
                                    borderWidth: '0px',
                                    backgroundColor: 'RGB(255, 255, 255)',
                                }),
                            }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setBatch(e.value)} name="feeType" controlShouldRenderValue={batch ? true : batch === false ? true : false} />
                        </div>}

                    <div>
                        <label htmlFor="mode" className="block text-sm font-medium text-gray-900 mb-2">Mode</label>
                        <Select options={modeOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setMode(e.value)} name="feeType" controlShouldRenderValue={mode ? true : mode === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="mode" className="block text-sm font-medium text-gray-900 mb-2">Pending Fee</label>
                        <Select options={pendingFeeOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setPendingFee(e.value)} name="feeType" controlShouldRenderValue={pendingFee ? true : pendingFee === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="registrationStatus" className="block text-sm font-medium text-gray-900 mb-2">Registration Status</label>
                        <Select options={registrationStatusOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setRegistrationStatus(e.value)} name="feeType" controlShouldRenderValue={registrationStatus ? true : registrationStatus === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="academicStatus" className="block text-sm font-medium text-gray-900 mb-2">Academic Status</label>
                        <Select options={academicStatusOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setAcademicStatus(e.value)} name="feeType" controlShouldRenderValue={academicStatus ? true : academicStatus === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="examMonth" className="block text-sm font-medium text-gray-900 mb-2">Exam Month</label>
                        <Select options={examMonthOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setExamMonth(e.value)} name="feeType" controlShouldRenderValue={examMonth ? true : examMonth === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="examCenter" className="block text-sm font-medium text-gray-900 mb-2">Exam Center</label>
                        <Select options={examCenterOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setExamCenter(e.value)} name="examCenter" controlShouldRenderValue={examCenter ? true : examCenter === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="tmaRecieved" className="block text-sm font-medium text-gray-900 mb-2">TMA Recieved</label>
                        <Select options={tmaRecievedOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTmaRecieved(e.value)} name="tmaRecieved" controlShouldRenderValue={tmaRecieved ? true : tmaRecieved === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="tmaSubmitted" className="block text-sm font-medium text-gray-900 mb-2">TMA Submitted</label>
                        <Select options={tmaSubmittedOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTmaSubmitted(e.value)} name="tmaSubmitted" controlShouldRenderValue={tmaSubmitted ? true : tmaSubmitted === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="tocRecieved" className="block text-sm font-medium text-gray-900 mb-2">TOC Recieved</label>
                        <Select options={tocRecievedOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocRecieved(e.value)} name="tocRecieved" controlShouldRenderValue={tocRecieved ? true : tocRecieved === false ? true : false} />
                    </div>
                    <div>
                        <label htmlFor="tocSubmitted" className="block text-sm font-medium text-gray-900 mb-2">TOC Submitted</label>
                        <Select options={tocSubmittedOptions} styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: '.5rem',
                                padding: '0.2rem',
                                borderWidth: '0px',
                                backgroundColor: 'RGB(255, 255, 255)',
                            }),
                        }} className="border-white text-sm" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setTocSubmitted(e.value)} name="tocSubmitted" controlShouldRenderValue={tocSubmitted ? true : tocSubmitted === false ? true : false} />
                    </div>
                    <div className='pb-20 flex w-full pt-5 '>
                        <Button  text='Apply Filter' buttonStyle='bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md w-full'  />
                    </div>

                </div>
            </div>


            <div className='fixed bottom-0 right-0 w-full'>
                <MobileNavigation />
            </div>
        </div>
    )
}

export default Filter