import React from 'react'

function FeeStatus() {
    return (
        <div className='bg-white rounded-2xl h-full grid grid-cols-3 p-4 md:p-6 lg:p-7 xl:p-4 2xl:p-4 text-xs md:text-lg'>
            <div className='col-span-1 grid grid-rows-2 gap-2 md:gap-4  p-1 lg:p-3 xl:p-2 2xl:p-3   '>

                <div className='row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-23xl:p-4 '>
                    <div className='flex flex-col justify-center items-center    rounded-3xl'>
                        <h1 className='text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg'>Admn Fee</h1>
                        <h1 className='text-xs text-red-600  lg:text-xl xl:text-sm '>1000 Bal</h1>

                    </div>
                </div>
                <div className='row-span-1   flex justify-center items-center   border border-green-600 rounded-2xl p-2 md:p-4 xl:p-2 2xl:p-2 3xl:p-4'>
                    <div className='flex flex-col justify-center items-center   rounded-3xl'>
                        <h1 className='text-green-600 lg:text-2xl xl:text-xl 2xl:text-lg'>First term </h1>
                        <h1></h1>
                    </div>
                </div>
                

            </div>
            <div className='col-span-1 grid grid-rows-2 gap-2 md:gap-4  p-1 lg:p-3 xl:p-2 2xl:p-3  '>

                <div className='row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4'>
                    <div className='flex flex-col justify-center items-center  rounded-3xl'>
                        <h1 className='text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg'>Reg Fee</h1>
                        <h1></h1>
                    </div>
                </div>
                <div className='row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4'>
                    <div className='flex flex-col justify-center items-center    rounded-3xl'>
                        <h1 className='text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg'>Second term</h1>
                        <h1></h1>
                    </div>
                </div>
                

            </div>
            <div className='col-span-1 grid grid-rows-2 gap-2 md:gap-4   p-1 lg:p-3 xl:p-2 2xl:p-3 '>

                <div className='row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4'>
                    <div className='flex flex-col justify-center items-center   rounded-3xl'>
                        <h1 className='text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg'>Exam Fee</h1>
                        <h1></h1>
                    </div>
                </div>
                <div className='row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4 '>
                    <div className='flex flex-col justify-center items-center  rounded-3xl'>
                        <h1 className='text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg'>Third term</h1>
                        <h1></h1>
                    </div>
                </div>
                

            </div>
            

        </div>
    )
}

export default FeeStatus