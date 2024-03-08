import React from 'react'
import Sidebar from '../Components/Sidebar'

function AddStudent() {
  return (
    <div className='bg-[#f0f0f0]'>
        <div className='grid grid-cols-5'>
            <div className='w-full '>
                <Sidebar />
            </div>
            <div>Add Students</div>
        </div>
        
    </div>
  )
}

export default AddStudent