import React from 'react';
import logo from '../assets/logo.png';
import student from '../assets/4760260.jpg';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        if (!email || !password) {
            toast.error('Please enter both email and password'); // Use toast for error message
            return;
        }
        // Simulate form submission logic
        // For demonstration purposes, let's assume the submission fails
        toast.error('An error occurred during login.'); // Use toast for error message
    };

    return (
        <div className="lg:grid lg:grid-cols-12 xl:grid xl:grid-cols-12 lg:bg-[#f0f0f0] ">
            <div className=" lg:col-span-2 xl:col-span-3">
                <img src={student} className='absolute bottom-0 w-1/3 mix-blend-multiply lg:block md:hidden sm:hidden hidden' alt="" />
            </div>
            <div className="col-span-9">
                {/* This div will occupy the remaining 9 columns */}
                <div className='bg-[#f0f0f0] p-8'>
                    <div className="bg-white h-full flex flex-col rounded-xl p-4">
                        <div className='flex justify-center items-center flex-col'>
                            <img src={logo} alt="logo" className='lg:w-40 w-[50%]' />
                        </div>
                        <div className='text-center'>
                            <h1 className='text-xl lg:text-3xl font-bold text-[#333333]'>Welcome Back!</h1>
                            <p className=' text-sm lg:text-xl '>Sign in to your account</p>
                        </div>
                        <div className='w-full h-full lg:p-7 md:p-5 sm:p-6 flex flex-col justify-between'>
                            <div className='flex items-center w-full'>
                                <form className='form-controls w-full lg:mx-[30%]' onSubmit={handleSubmit}>
                                    <div className='flex flex-col items-center gap-7'>
                                        <div className='lg:w-full w-full mx-5 text-lg'>
                                            <label htmlFor="email">Email</label>
                                            <input type="text" placeholder='Email' className='text-lg bg-[#f0f0f0] border border-white text-gray-900 rounded-lg block sm:w-full md:w-3/4 lg:w-full p-2.5 w-full' onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className='lg:w-full w-full mx-5 text-lg'>
                                            <label htmlFor="password">Password</label>
                                            <input type="text" placeholder='Enter the password' className='bg-[#f0f0f0] text-lg border border-white text-gray-900 rounded-lg block sm:w-full md:w-3/4 lg:w-full w-full p-2.5' onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className=' w-full'>
                                            <input type="checkbox" id="remember" name="remember" value="remember" />
                                            <label htmlFor="remember" className='text-[#333333] p-3 text-start text-lg'>Remember me</label>
                                        </div>
                                        <button className='bg-[#5266D7] text-white text-lg rounded-lg sm:w-full md:w-1/4 lg:w-full p-2.5 sm:px-14 flex justify-center items-center w-full font-semibold'>Login</button>
                                        <ToastContainer
                                          position="top-right"
                                          autoClose={5000}
                                          hideProgressBar={false}
                                          newestOnTop={false}
                                          closeOnClick
                                          rtl={false}
                                          pauseOnFocusLoss
                                          draggable
                                          pauseOnHover
                                          theme="colored"
                                        /> {/* ToastContainer is required to display toasts */}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='text-[#666666]'>
                            <p className='text-center'>Copyright &copy; 2024 Linfield Eduverse </p>
                            <p className='text-center text-sm font-semibold'>Designed and developed by Apespot ❤</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;