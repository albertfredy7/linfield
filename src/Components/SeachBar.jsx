import React from 'react'

function SeachBar() {
    return (
        <div className="w-full px-4">
            <div className="relative w-full h-11 lg:h-12 3xl:h-14 flex"> {/* Adjust the height as needed */}
                <input className="block w-full p-3 lg:p-7 leading-5 text-gray-900 placeholder-gray-400 bg-white  border border-gray-300 rounded-2xl  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm lg:text-xl 3xl:text-md" placeholder="Enter admission number" type="text" />
                <div className="absolute inset-y-0  right-1 flex items-center p-0">
                    <svg className="w-12 h-9 3xl:h-10  text-white bg-blue-600 p-2 rounded-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default SeachBar
