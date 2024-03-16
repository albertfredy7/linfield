import React from 'react'



function Button({title,icon, backround,width,height}) {
    return (
        <div className=' p-4 w-full  '>
            <div className={`bg-[${backround}] px-8 w-full  rounded-3xl`}>
                <button className={`w-${width} h-${height}`}><span className='flex  justify-center gap-5 items-center text-xl font-semibold text-[#666666]  h-full w-full'> {title} <img src={icon} className='w-16' alt="" /></span></button>
            </div>
        </div>
    )
}

export default Button