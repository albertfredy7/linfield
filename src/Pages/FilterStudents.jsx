import React from 'react'
import Sidebar from '../Components/Sidebar'

function FilterStudents() {
  return (
    <div className='bg-[#f0f0f0]'>
        <div className='grid grid-cols-5'>
            <div className='w-full '>
                <Sidebar />
            </div>
            <div>Filter </div>
        </div>
        
    </div>
  )
}

export default FilterStudents