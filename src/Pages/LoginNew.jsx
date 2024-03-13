import React, {useState} from 'react'
import logo from '../assets/logo.png';
import student from '../assets/4760260.jpg';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

const LoginNew = () => {
    return  (
        <div className='bg-slate-100 w-screen h-screen grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 overflow-y-hidden py-2'>
            <div className='hidden md:grid md:col-span-2 xl:col-span-1'>
                <img src={student} className='absolute bottom-0 w-1/3 md:w-2/3 xl:w-1/3 mix-blend-multiply hidden md:block ' alt="" />
            </div>
            <div className='col-span-1 md:col-span-2 xl:col-span-2 p-8 md:p-6 '>
                <div className='h-full w-full bg-white rounded-lg flex flex-col justify-center items-center'>
                    <div className='w-full flex justify-center'>
                        <img src={logo} className='w-32 h-32 object-cover ' />
                    </div>

                    <h3 className='text-black text-lg md:text-2xl xl:text-xl font-semibold'>Welcome back👋</h3>
                    <h3 className='text-base md:text-xl xl:text-lg font-medium pb-4'>Sign in to your account</h3>

                    <div className='w-full xl:w-1/2 pt-4 space-y-1 px-4'>
                        <label for="email" class="block text-base md:text-xl xl:text-base font-medium text-gray-900">E-mail</label>
                        <input type="text" id="email" class="bg-gray-200 border text-gray-600 text:base md:text-xl xl:text-base rounded-md block w-full p-2 md:p-4 xl:p-2" placeholder="stevejobs@apple.com" required />
                    </div>
                    <div className='w-full xl:w-1/2 pt-4 space-y-1 px-4'>
                        <label for="password" class="block text-base md:text-xl xl:text-base font-medium text-gray-900">Password</label>
                        <input type="text" id="password" class="bg-gray-200 border text-gray-600 text:base md:text-xl xl:text-base rounded-md block w-full p-2 md:p-4 xl:p-2" placeholder="thinkdifferent" required />
                    </div>
                    <div className='w-full xl:w-1/2 pt-4 px-4 flex items-center'>
                        <input type="checkbox" id="remember" name="remember" value="remember" className='h-4 w-4 md:h-5 md:w-5 xl:h-4 xl:w-4' />
                        <label htmlFor="remember" className='text-[#333333] p-3 text-start text-base md:text-xl xl:text-base'>Remember me</label>
                    </div>
                    <div className='w-full xl:w-1/2 pt-2 md:pt-2 px-2'>
                        <button className='w-full bg-[#5266D7] text-white text-lg p-2 md:p-3 xl:p-2 rounded-lg'>Login</button>
                    </div>
                    <div className='text-[#666666] pb-2  flex-1 flex flex-col justify-end'>
                        <p className='text-center'>Copyright &copy; 2024 Linfield Eduverse </p>
                        <p className='text-center text-sm font-semibold'>Designed and developed by Apespot ❤</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginNew