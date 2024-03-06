import React from 'react'
import nishad from '../assets/nishad.jpeg'
import home from '../assets/home.png'


function Sidebar() {
 return (
    <div className=' h-[915px] bg-white rounded-xl m-5'>
        <div className='grid grid-cols-10   mx-5 justify-center'>
            <img src={nishad} className='col-span-4 rounded-full w-[55%] mt-5' alt="" />
            <div>
                <h1 className='mt-5 w-full text-nowrap h-auto font-semibold text-xl text-[#585858] '>Welcome back</h1>
                <h1 className='text-2xl font-bold text-nowrap'>Nishad👋</h1>
            </div>
           
        </div>

        <div className='grid grid-cols-10 mx-5 mt-20'>
            <nav className='col-span-10'>
                <ul className='flex flex-col gap-3 justify-around'>
                    <li className='bg-[#5266D7] p-2 rounded-xl text-white text-center'><a href='#home' className='text-lg font-semibold'><span><img src={home} alt="" />Home</span></a></li>
                    <li className='text-center'><a href='#about' className='text-lg font-medium text-[#333333]'>Insights</a></li>
                    <li className='text-center'><a href='#contact' className='text-lg font-medium text-[#333333]'>Expense Tracker</a></li>
                    <li className='text-center'><a href='#contact' className='text-lg font-medium text-[#333333]'>Add Student</a></li>
                    <li className='text-center'><a href='#contact' className='text-lg font-medium text-[#333333]'>Modify Student</a></li>
                    <li className='text-center'><a href='#contact' className='text-lg font-medium text-[#333333]'>Filter Student</a></li>
                    <li className='text-center'><a href='#contact' className='text-lg font-medium text-[#333333]'>Create Teacher ID</a></li>
                </ul>
            </nav>
        </div>

    </div>
 )
}

export default Sidebar