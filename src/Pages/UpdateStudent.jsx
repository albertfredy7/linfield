import React, { useEffect, useState } from 'react'
import SidebarNew from '../Components/SidebarNew';
import SearchBar from '../Components/SeachBar';
import Button from '../Components/Button';
import MobileNavigation from '../Components/MobileNavigation';
import axios from 'axios';
import Select from 'react-select';

function UpdateStudent() {



    const [studentData, setStudentData] = useState([]);
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState(null);
    const [batch, setBatch] = useState(null);
    const [stream, setStream] = useState(null);
    const [existingStudent, setExistingStudent] = useState(null);
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [examMode, setExamMode] = useState(null);
    const [examMonth, setExamMonth] = useState(null);
    const [studyCenter, setStudyCenter] = useState('');
    const [lastNiosYear, setLastNiosYear] = useState('');
    const [tmaRecieved, setTmaRecieved] = useState(false);
    const [tmaSubmitted, setTmaSubmitted] = useState(false);
    const [error, setError] = useState(null);

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

    const selectedCourseOption = courseOptions.find(option => option.value === course);


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

    const selectedBatchOption = batchOptions.find(option => option.value === batch);


    const streamOptions = [
        {
            value: 'Stream1',
            label: 'Stream 1'
        },
        {
            value: 'Stream2',
            label: 'Stream 2'
        },
        {
            value: 'Stream3',
            label: 'Stream 3'
        },
        {
            value: 'Stream4',
            label: 'Stream 4'
        }
    ]

    const examModeOptions = [
        {
            value: 'Normal exam',
            label: 'Normal'
        },
        {
            value: 'OnDemand exam',
            label: 'On Demand'
        }
    ]

    const examMonthOptions = [
        {
            value: 'January',
            label: 'January'
        },
        {
            value: 'February',
            label: 'February'
        },
        {
            value: 'March',
            label: 'March'
        },
        {
            value: 'April',
            label: 'April'
        },
        {
            value: 'May',
            label: 'May'
        },
        {
            value: 'June',
            label: 'June'
        },
        {
            value: 'July',
            label: 'July'
        },
        {
            value: 'August',
            label: 'August'
        },
        {
            value: 'September',
            label: 'September'
        },
        {
            value: 'October',
            label: 'October'
        },
        {
            value: 'November',
            label: 'November'
        },
        {
            value: 'December',
            label: 'December'
        }
    ]

    const booleanOptions = [
        {
            value: 'true',
            label: 'Yes'
        },
        {
            value: 'false',
            label: 'No'
        }
    ]


    const performSearch = async (query) => {
        console.log('Searching for:', query);

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

    useEffect(() => {
        if (studentData.length > 0) {
            setCourse(studentData[0].course);
            setBatch(studentData[0].batch);
        }
    }, [studentData]);



    console.log(studentData);
    return (
        <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
            <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
                {/* mobile screens */}
                <div className="block md:hidden  ">
                    <div className="flex flex-col h-screen">
                        <div className="pt-10 px-5 flex flex-col">
                            <h1 className="text-2xl font-semibold">Modify Student</h1>
                            <h1 className="text-gray-500 text-sm text-nowrap pt-1">
                                Modify student based on Admn No / Mob No
                            </h1>
                        </div>
                        <div className="p-5">
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
                        {studentData.length > 0 ? (
                            <div className="flex flex-col gap-2 px-5 overflow-y-auto">
                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="John doe"
                                        value={studentData.length > 0 ? studentData[0].name : ''}
                                        disabled
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="admn"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Admission Number
                                    </label>
                                    <input
                                        type="text"
                                        id="admn"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="123456"
                                        value={studentData.length > 0 ? studentData[0].admissionNumber : ''}
                                        disabled
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="course"
                                        className="block text-sm font-semibold text-gray-500"
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        value={selectedCourseOption}
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setCourse(e.value)}
                                        name="course"
                                        controlShouldRenderValue={
                                            course ? true : course === false ? true : false
                                        }
                                    />

                                </div>


                                {
                                    course === 'Plustwo' && (
                                        <div className="flex flex-col gap-2 pt-2">
                                            <label
                                                htmlFor="batch"
                                                className="block text-sm font-semibold text-gray-500"
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
                                                        color: '#9E9E9E', // Change the color of the text inside the input container
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
                                    )
                                }

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="stream"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Stream
                                    </label>
                                    <Select
                                        options={streamOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setStream(e.value)}
                                        name="stream"

                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="existingStrudent"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Existing Student
                                    </label>
                                    <Select
                                        options={booleanOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setExistingStudent(e.value)}
                                        name="existingStudent"
                                    />
                                </div>

                                {existingStudent === 'true' &&
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="enrollmentNo"
                                            className="block text-sm font-semibold text-gray-500"
                                        >
                                            Enrollment Number
                                        </label>
                                        <input
                                            type="text"
                                            id="enrollmentNo"
                                            className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="CJDJGB3UUG"
                                            required
                                            value={enrollmentNumber}
                                            onChange={(e) => setEnrollmentNumber(e.target.value)}
                                        />
                                    </div>}

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="examMode"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Exam Mode
                                    </label>
                                    <Select
                                        options={examModeOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setExamMode(e.value)}
                                        name="examMode"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="examMonth"
                                        className="block text-sm font-semibold text-gray-500"
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setExamMonth(e.value)}
                                        name="examMonth"
                                    />
                                </div>


                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="studyCenter"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Study Center
                                    </label>
                                    <input
                                        type="text"
                                        id="studyCenter"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Kochi"
                                        required
                                        value={studyCenter}
                                        onChange={(e) => setStudyCenter(e.target.value)}
                                    />
                                </div>



                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="lastNiosYear"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Year of last NIOS
                                    </label>
                                    <input
                                        type="text"
                                        id="lastNiosYear"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="2021"
                                        required
                                        value={lastNiosYear}
                                        onChange={(e) => setLastNiosYear(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="tmaRecieved"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        TMA Recieved
                                    </label>
                                    <Select
                                        options={booleanOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setTmaRecieved(e.value)}
                                        name="tmaRecieved"
                                    />
                                </div>


                                <div className="flex flex-col gap-2 pt-2">
                                    <label
                                        htmlFor="tmaSubmitted"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        TMA Submitted
                                    </label>
                                    <Select
                                        options={booleanOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setTmaSubmitted(e.value)}
                                        name="tmaSubmitted"
                                    />
                                </div>



                                <div className="pt-2 pb-20">
                                    <button
                                        className="bg-[#2740CD] text-white rounded-lg text-base font-semibold w-full p-3 mt-5"

                                    >
                                        Modify Student
                                    </button>
                                </div>
                            </div>
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

                        {studentData.length > 0 ? (
                            <div className="row-span-10 flex flex-col gap-2  h-full overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4 pt-5">
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                            placeholder="John doe"
                                            value={studentData.length > 0 ? studentData[0].name : ''}
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="admn"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Admission Number
                                        </label>
                                        <input
                                            type="text"
                                            id="admn"
                                            className="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                            placeholder="123456"
                                            value={studentData.length > 0 ? studentData[0].admissionNumber : ''}
                                            disabled
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className={`flex flex-col gap-2 pt-2 ${course === 'SSLC' ? 'col-span-2' : 'col-span-1'}`}>
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
                                                    fontSize: '1rem',
                                                }),
                                                singleValue: (baseStyles) => ({
                                                    ...baseStyles,
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
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
                                    {
                                        course === 'Plustwo' && (
                                            <div className="flex flex-col gap-2 pt-2">
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
                                                            fontSize: '1rem',
                                                        }),
                                                        singleValue: (baseStyles) => ({
                                                            ...baseStyles,
                                                            color: '#9E9E9E', // Change the color of the text inside the input container
                                                        }),
                                                    }}
                                                    className="border-white text-base text-gray-500"
                                                    value={selectedBatchOption}
                                                    closeMenuOnSelect={true}
                                                    isSearchable={false}
                                                    onChange={(e) => setCourse(e.value)}
                                                    name="feeType"
                                                    controlShouldRenderValue={
                                                        course ? true : course === false ? true : false
                                                    }
                                                />
                                            </div>
                                        )
                                    }



                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="stream"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Stream
                                        </label>
                                        <Select
                                            options={streamOptions}
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
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
                                            closeMenuOnSelect={true}
                                            isSearchable={false}
                                            onChange={(e) => setStream(e.value)}
                                            name="feeType"

                                        />
                                    </div>
                                    <div className={` flex flex-col gap-2 pt-2 col-span-${existingStudent === 'true' ? '1' : '2'} pt-2`}>
                                        <label
                                            htmlFor="existingStrudent"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Existing Student
                                        </label>
                                        <Select
                                            options={booleanOptions}
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
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
                                            closeMenuOnSelect={true}
                                            isSearchable={false}
                                            onChange={(e) => setExistingStudent(e.value)}
                                            name="existingStudent"
                                        />
                                    </div>
                                    {existingStudent === 'true' &&
                                        <div className="col-span-1 flex flex-col gap-2 pt-2">
                                            <label
                                                htmlFor="enrollmentNo"
                                                className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                            >
                                                Enrollment Number
                                            </label>
                                            <input
                                                type="text"
                                                id="enrollmentNo"
                                                className="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                                placeholder="CJDJGB3UUG"
                                                required
                                                value={enrollmentNumber}
                                                onChange={(e) => setEnrollmentNumber(e.target.value)}

                                            />
                                        </div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="examMode"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Exam Mode
                                        </label>
                                        <Select
                                            options={examModeOptions}
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
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
                                            closeMenuOnSelect={true}
                                            isSearchable={false}
                                            onChange={(e) => setExamMode(e.value)}
                                            name="examMode"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="examMonth"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
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
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
                                            closeMenuOnSelect={true}
                                            isSearchable={false}
                                            onChange={(e) => setExamMonth(e.value)}
                                            name="examMonth"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 ">
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="studyCenter"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Study Center
                                        </label>
                                        <input
                                            type="text"
                                            id="studyCenter"
                                            className="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                            placeholder="Kochi"
                                            required
                                            value={studyCenter}
                                            onChange={(e) => setStudyCenter(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="lastNiosYear"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            Year of last NIOS
                                        </label>
                                        <input
                                            type="text"
                                            id="lastNiosYear"
                                            className="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                                            placeholder="2021"
                                            required
                                            value={lastNiosYear}
                                            onChange={(e) => setLastNiosYear(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="tmaRecieved"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            TMA Recieved
                                        </label>
                                        <Select
                                            options={booleanOptions}
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
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
                                            closeMenuOnSelect={true}
                                            isSearchable={false}
                                            onChange={(e) => setTmaRecieved(e.value)}
                                            name="tmaRecieved"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <label
                                            htmlFor="tmaSubmitted"
                                            className="block text-sm 3xl:text-lg font-semibold text-gray-500"
                                        >
                                            TMA Submitted
                                        </label>
                                        <Select
                                            options={booleanOptions}
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
                                                    color: '#9E9E9E', // Change the color of the text inside the input container
                                                }),
                                            }}
                                            className="border-white text-base text-gray-500"
                                            closeMenuOnSelect={true}
                                            isSearchable={false}
                                            onChange={(e) => setTmaSubmitted(e.value)}
                                            name="tmaSubmitted"
                                        />
                                    </div>
                                </div>

                                <div className="float-end flex justify-end col-span-3 pt-10">
                                    <div>
                                        <Button
                                            buttonStyle={
                                                'bg-[#2740CD] text-white text-md lg:text-md font-medium p-3 px-6 rounded-xl w-full '
                                            }
                                            text={'Update Student'}
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
                                <h1 className="text-center">No student data available</h1>
                            </div>
                        )}
                    </div>
                </div>

                {/* pc screens */}
                <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen overflow-hidden">
                    <div className="col-span-2 ">
                        <SidebarNew />
                    </div>
                    <div className="col-span-9  ">
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
                        { studentData.length > 0 ? (
                            <div>
                            <div className="grid grid-cols-3 gap-3 px-12 pt-9">
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="John doe"
                                        value={studentData.length > 0 ? studentData[0].name : ''}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="admn"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Admission Number
                                    </label>
                                    <input
                                        type="text"
                                        id="admn"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="123456"
                                        value={studentData.length > 0 ? studentData[0].admissionNumber : ''}
                                        disabled
                                        required
                                    />
                                </div>
    
                                <div className={`col-span-1 flex flex-col gap-2 `}>
                                    <label
                                        htmlFor="course"
                                        className="block text-sm font-semibold text-gray-500"
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        value={selectedCourseOption}
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setCourse(e.value)}
                                        name="course"
                                        controlShouldRenderValue={
                                            course ? true : course === false ? true : false
                                        }
                                    />
                                </div>
    
    
                            </div>
    
                            <div className="grid grid-cols-3 gap-3 px-12 pt-2">
                                {
                                    course === 'Plustwo' && (
                                        <div className="col-span-1 flex flex-col gap-2">
                                            <label
                                                htmlFor="batch"
                                                className="block text-sm font-semibold text-gray-500"
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
                                                        color: '#9E9E9E', // Change the color of the text inside the input container
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
                                    )
                                }
    
                                <div className={`col-span-${batch ? '1' : '2'} flex flex-col gap-2`}>
                                    <label
                                        htmlFor="stream"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Stream
                                    </label>
                                    <Select
                                        options={streamOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setStream(e.value)}
                                        name="stream"
                                    />
    
                                </div>
    
                                <div className={`col-span-1 flex flex-col gap-2`}>
                                    <label
                                        htmlFor="existingStrudent"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Existing Student
                                    </label>
                                    <Select
                                        options={booleanOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setExistingStudent(e.value)}
                                        name="existingStudent"
                                    />
                                </div>
    
                                {
                                    existingStudent === 'true' &&
                                    <div className="col-span-1 flex flex-col gap-2">
                                        <label
                                            htmlFor="enrollmentNo"
                                            className="block text-sm font-semibold text-gray-500"
                                        >
                                            Enrollment Number
                                        </label>
                                        <input
                                            type="text"
                                            id="enrollmentNo"
                                            className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="CJDJGB3UUG"
                                            required
                                            value={enrollmentNumber}
                                            onChange={(e) => setEnrollmentNumber(e.target.value)}
                                        />
                                    </div>
    
    
                                }
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="examMode"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Exam Mode
                                    </label>
                                    <Select
                                        options={examModeOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setExamMode(e.value)}
                                        name="examMode"
                                    />
                                </div>
    
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="examMonth"
                                        className="block text-sm font-semibold text-gray-500"
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setExamMonth(e.value)}
                                        name="examMonth"
                                    />
                                </div>
    
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="studyCenter"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Study Center
                                    </label>
                                    <input
                                        type="text"
                                        id="studyCenter"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Kochi"
                                        required
                                        value={studyCenter}
                                        onChange={(e) => setStudyCenter(e.target.value)}
                                    />
                                </div>
    
    
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="lastNiosYear"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        Year of last NIOS
                                    </label>
                                    <input
                                        type="text"
                                        id="lastNiosYear"
                                        className="bg-white border border-white text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="2021"
                                        required
                                        value={lastNiosYear}
                                        onChange={(e) => setLastNiosYear(e.target.value)}
                                    />
                                </div>
    
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="tmaRecieved"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        TMA Recieved
                                    </label>
                                    <Select
                                        options={booleanOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setTmaRecieved(e.value)}
                                        name="tmaRecieved"
                                    />
                                </div>
    
                                <div className="col-span-1 flex flex-col gap-2">
                                    <label
                                        htmlFor="tmaSubmitted"
                                        className="block text-sm font-semibold text-gray-500"
                                    >
                                        TMA Submitted
                                    </label>
                                    <Select
                                        options={booleanOptions}
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
                                                color: '#9E9E9E', // Change the color of the text inside the input container
                                            }),
                                        }}
                                        className="border-white text-base text-gray-500"
                                        closeMenuOnSelect={true}
                                        isSearchable={false}
                                        onChange={(e) => setTmaSubmitted(e.value)}
                                        name="tmaSubmitted"
                                    />
                                </div>
    
    
    
                                {/* button */}
                                <div className="float-end flex  justify-end col-span-3 pt-5 ">
                                    <div>
                                        <Button
                                            buttonStyle={
                                                'bg-[#2740CD] text-white text-md lg:text-md font-medium p-3 px-6 rounded-xl w-full '
                                            }
                                            text={'Update Student'}
                                        />
                                    </div>
                                </div>
    
    
    
    
    
                            </div>
                        </div>) : (
                            <div className="text-center text-lg font-semibold overflow-y-hidden flex flex-col justify-center items-center">
                                <img
                                    src="https://blog.vantagecircle.com/content/images/2021/08/open-to-learning-engaged-employees-1.gif"
                                    className="mix-blend-multiply w-4/6"
                                    alt=""
                                />
                                <h1 className="text-center">No student data available</h1>
                            </div>
                        )}



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

export default UpdateStudent