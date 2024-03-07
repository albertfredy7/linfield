import React from 'react'
import Sidebar from '../Components/Sidebar'

function Home() {
  return (
    <div>
        <div className='grid grid-cols-4'>
            <div className='w-full bg-white'>
                <Sidebar />
            </div>
        </div>
    </div>
  )
}

export default Home