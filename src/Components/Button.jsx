import React from 'react'

function Button({title,icon}) {
    return (
        <div className=' p-4 w-full mt-14 '>
            <div className='bg-white px-8 w-full  rounded-3xl'>
                <button className='w-full'><span className='flex  justify-center gap-5 items-center text-xl font-semibold text-[#666666]  h-full w-full'><img src={icon} className='w-16' alt="" /> {title}</span></button>
            </div>
        </div>
    )
}

export default Button