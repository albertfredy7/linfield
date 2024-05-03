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

  const animatedComponents = makeAnimated();

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

  const valuesOnlyArraySubjects = (e) => {
    const newSubjects = e.map((obj) => obj.value);
    setSubjects(newSubjects);
  };

  const valuesOnlyOptionalSubjects = (e) => {
    const newOptionalSubjects = e.map((obj) => obj.value);
    setOptionalSubjects(newOptionalSubjects);
  };

  const valuesOnlyArrayTocSubjects = (e) => {
    const newToc = e.map((obj) => obj.value);
    setTocSubjects(newToc);
  };

  const performSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://lobster-app-yjjm5.ondigitalocean.app/api/students/search/${query}`
      );

      console.log(`printing the data ${response.data}`);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
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

    // let modifyStudentRequestObject = {
    //   admissionNumber: studentData[0].admissionNumber,
    //   password,
    //   referenceNumber: referenceNo,
    //   registrationFees: registrationFee,
    //   examFees: examFee,
    //   subjects,
    //   toc,
    //   tocReceived: tocRecieved,
    //   tocSubmitted,
    // };

    // if (optionalSubjectsExam) {
    //   modifyStudentRequestObject.optionalSubjectsExam = optionalSubjectsExam;
    //   modifyStudentRequestObject.optionalSubjects = optionalSubjects;
    // }

    const modifyStudentRequestObject = {
      ...studentData,
      password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .put(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/students/updateExisting',
        modifyStudentRequestObject,
        config
      )
      .then((response) => {
        const data = response.data;
        console.log(`student data ${data.name}`);

        if (data && data.name) {
          console.log(`success`);
          window.alert('student modified successfully');

          setTimeout(() => {
            navigate('/');
          }, 2000); // Adjust the time as needed (2000 milliseconds = 2 seconds)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert('An error occurred while modifying the student.');
      });
  };

  console.log(subjects);

  const selectedOptionalSubjectsExam = booleanOptions.find(
    (option) => option.value === optionalSubjectsExam
  );
  const selectedTocOption = booleanOptions.find(
    (option) => option.value === toc
  );
  const selectedTocRecievedOption = booleanOptions.find(
    (option) => option.value === tocRecieved
  );
  const selectedTocSubmittedOption = booleanOptions.find(
    (option) => option.value === tocSubmitted
  );

  useEffect(() => {
    if (studentData._id) {
      setName(studentData.name);
      setEmail(studentData.email);
      setPhone(studentData.phoneNumber);
      setReferenceNo(studentData.referenceNumber);
      setSubjects(studentData.subjects);
      setOptionalSubjectsExam(studentData.optionalSubjectsExam);
      setToc(studentData.toc);
      setTocRecieved(studentData.tocReceived);
      setTocSubmitted(studentData.tocSubmitted);
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
              <h1 className="text-2xl font-semibold">Modify Student</h1>
              <h1 className="text-gray-500 text-sm text-nowrap pt-1">
                Modify student based on Admn No / Mob No
              </h1>
            </div>
            <div className="p-5">
              <SearchBar onSearch={performSearch} />
            </div>
            {studentData._id ? (
              <div className="flex flex-col gap-2 px-5 overflow-y-auto">
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
                    value={studentData.name}
                    onChange={(e) =>
                      setStudentData({ ...studentData, name: e.target.value })
                    }
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
                    placeholder=""
                    value={studentData.email}
                    onChange={(e) =>
                      setStudentData({ ...studentData, name: e.target.value })
                    }
                    required
                  />
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
                    className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                    placeholder="******"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
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
                    className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                    placeholder="******"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    value={studentData.referenceNumber}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        referenceNumber: e.target.value,
                      })
                    }
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
                    className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                        borderWidth: '0px',
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
                        borderWidth: '0px',
                        backgroundColor: 'RGB(255, 255, 255)',
                      }),
                    }}
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    value={booleanOptions.find(
                      (option) =>
                        option.value === studentData.optionalSubjectsExam
                    )}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        optionalSubjectsExam: e.value,
                      })
                    }
                  />
                </div>
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
                      setStudentData({ ...studentData, toc: e.value })
                    }
                  />
                </div>
                <div
                  className={`pt-2 ${
                    !studentData.optionalSubjectsExam ? 'hidden' : 'block'
                  }`}
                >
                  <label
                    htmlFor="subjects"
                    className="block text-base font-medium text-gray-500 pb-1"
                  >
                    Optional Subjects
                  </label>
                  <Select
                    options={optionalSubjectsOptions}
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
                    value={studentData.optionalSubjects.map((subject) => ({
                      value: subject,
                      label: subject, // Assuming the subject value is the same as the label
                    }))}
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
                <div className={`pt-2 ${!toc ? 'hidden' : 'block'}`}>
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
                  className={`pt-2 ${!studentData.toc ? 'hidden' : 'block'}`}
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
                      (option) => option.value === studentData.tocSubmitted
                    )}
                    onChange={(e) =>
                      setStudentData({ ...studentData, tocSubmitted: e.value })
                    }
                  />
                </div>
                <div
                  className={`pt-2 ${!studentData.toc ? 'hidden' : 'block'}`}
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
                      (option) => option.value === studentData.tocReceived
                    )}
                    onChange={(e) =>
                      setStudentData({ ...studentData, tocReceived: e.value })
                    }
                  />
                </div>
                <div className="pt-2 pb-20">
                  <button
                    className="bg-[#2740CD] text-white rounded-lg text-base font-semibold w-full p-3 mt-5"
                    onClick={() => submitHandler()}
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                        htmlFor="password"
                        className="block text-base font-medium text-gray-500 pb-1"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                        placeholder="******"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row-span-1 grid grid-cols-12 gap-4">
                  {/* <div className="col-span-6">
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
                  </div> */}
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
                        placeholder="Registration Fees"
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
                        className="bg-white border border-white text-gray-500 text-base rounded-lg block w-full p-2.5"
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
                          (option) => option.value === studentData.toc
                        )}
                        onChange={(e) =>
                          setStudentData({ ...studentData, toc: e.value })
                        }
                        controlShouldRenderValue={toc !== null ? true : false}
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
                            option.value === studentData.optionalSubjectsExam
                        )}
                        onChange={(e) =>
                          setStudentData({
                            ...studentData,
                            optionalSubjectsExam: e.value,
                          })
                        }
                        controlShouldRenderValue={
                          optionalSubjectsExam !== null ? true : false
                        }
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`row-span-1 ${
                    !studentData.optionalSubjectsExam ? 'hidden' : 'block'
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
                      value={studentData.optionalSubjects.map((subject) => ({
                        value: subject,
                        label: subject, // Assuming the subject value is the same as the label
                      }))}
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
                      onBlur={() => console.log('Blur')}
                      onFocus={() => console.log('Focus')}
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
                        // setSubjects(selectedValues);
                      }}
                      onBlur={() => console.log('Blur')}
                      onFocus={() => console.log('Focus')}
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
                          (option) => option.value === studentData.tocSubmitted
                        )}
                        onChange={(e) =>
                          setStudentData({
                            ...studentData,
                            tocSubmitted: e.value,
                          })
                        }
                        controlShouldRenderValue={
                          tocSubmitted !== null ? true : false
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
                          (option) => option.value === studentData.tocReceived
                        )}
                        onChange={(e) =>
                          setStudentData({
                            ...studentData,
                            tocReceived: e.value,
                          })
                        }
                        controlShouldRenderValue={
                          tocRecieved !== null ? true : false
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:row-span-2 md:row-span-1 pt-10  float-end justify-end">
                  <div className="pt-2 pb-10 ">
                    <button
                      className="bg-[#2740CD] text-white rounded-lg text-base font-semibold w-full p-3 mt-5"
                      onClick={() => submitHandler()}
                    >
                      Modify Student
                    </button>
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                      placeholder="John doe"
                      value={studentData.name}
                      onChange={(e) =>
                        setStudentData({ ...studentData, name: e.target.value })
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
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
                      for="password"
                      class="block text-sm 3xl:text-lg font-semibold text-gray-500 "
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
                      placeholder="**********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
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
                          padding: '0.4rem',
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
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      value={booleanOptions.find(
                        (option) =>
                          option.value === studentData.optionalSubjectsExam
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
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
                      class="bg-white border border-white text-gray-500 text-sm 3xl:text-lg rounded-lg block w-full p-2 3xl:p-2.5"
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
                      value={studentData.optionalSubjects.map((subject) => ({
                        value: subject,
                        label: subject,
                      }))}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(
                          (option) => option.value
                        );
                        setStudentData({
                          ...studentData,
                          optionalSubjects: selectedValues,
                        });
                      }}
                      onBlur={() => console.log('Blur')}
                      onFocus={() => console.log('Focus')}
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
                          borderRadius: '12px',
                          padding: '0.4rem',
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
                  <div className={`${studentData.toc ? 'block' : 'hidden'}`}>
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
                          borderRadius: '12px',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      value={booleanOptions.find(
                        (option) => option.value === studentData.tocReceived
                      )}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          tocReceived: e.value,
                        })
                      }
                    />
                  </div>
                  <div className={`${studentData.toc ? 'block' : 'hidden'}`}>
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
                          borderRadius: '12px',
                          padding: '0.4rem',
                          borderWidth: '0px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      closeMenuOnSelect={true}
                      isSearchable={false}
                      value={booleanOptions.find(
                        (option) => option.value === studentData.tocSubmitted
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
                          borderRadius: '12px',
                          padding: '0.05rem',
                          borderWidth: '1px',
                          backgroundColor: 'RGB(255, 255, 255)',
                        }),
                      }}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      value={studentData.tocSubjects.map((subject) => ({
                        value: subject,
                        label: subject,
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
                      onBlur={() => console.log('Blur')}
                      onFocus={() => console.log('Focus')}
                    />
                  </div>
                  <div className="float-end flex  justify-end col-span-3 pt-1">
                    <div>
                      <button
                        className="bg-[#2740CD] text-white rounded-lg text-sm 3xl:text-lg font-semibold w-full p-3 mt-5"
                        onClick={() => submitHandler()}
                      >
                        Modify Student
                      </button>
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
  );
}

export default ModifyStudent;
