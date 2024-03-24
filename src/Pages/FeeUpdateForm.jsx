import React, { useState } from 'react'
import SidebarNew from '../Components/SidebarNew'
import Select from 'react-select'
import Button from '../Components/Button'
import MobileNavigation from '../Components/MobileNavigation'


function FeeUpdateForm() {

    const [feeType, setFeeType] = useState(null)
    const [paymentType, setPaymentType] = useState(null)
    const [isFocused, setIsFocused] = useState(true);
    const [studentDetails, setStudentDetails] = useState(null)
    const [amount, setAmount] = useState(null)
    const [utrNo, setUtrNo] = useState(null)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const [student, setStudent] = useState(null)

    const feeOptions = [
        {
            label: 'Registration fee',
            value: 'registrationFees'
        },
        {
            label: 'Exam fee',
            value: 'examFees'
        },
        {
            label: 'First term fee',
            value: 'firstTerm'
        },
        {
            label: 'Second term fee',
            value: 'secondTerm'
        },
        {
            label: 'Third term fee',
            value: 'thirdTerm'
        }
    ]

    const paymentOptions = [
        {
            label: 'Full payment',
            value: 'fullPayment'
        },
        {
            label: 'Partial payment',
            value: 'partialPayment'
        }
    ]

    const paymentOptionsUpdated = [
        {
            label: 'Full payment',
            value: 'fullPayment'
        }
    ]

    return (
        <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">

            <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">

                {/* mobile screen */}
                <div className="block md:hidden bg-[#f0f0f0]">
                    <div className='flex flex-col h-screen'>
                        <div className='flex flex-col p-8'>
                            <h1 className='text-2xl font-bold'>Update Fee</h1>
                            <h1 className='text-sm text-gray-500'>Update fee of student</h1>
                        </div>
                        <div className='flex flex-col gap-3 px-6 overflow-y-auto scroll-smooth'>

                            <div className=''>
                                <div class="mb-3 mt-6 px-3">
                                    <label for="feeType" class="block text-md lg:text-xl  font-medium text-gray-900 mb-2">Select payment type</label>
                                    <Select options={paymentOptions} styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderRadius: '.5rem',
                                            padding: '0.2rem',
                                            borderWidth: '0px',
                                            backgroundColor: 'RGB(255, 255 , 255)',
                                        }),
                                    }} className="border border-gray-200 rounded text-md lg:text-xl bg-white text-gray-600" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setFeeType(e.value)} name="feeType" controlShouldRenderValue={feeType ? true : feeType === false ? true : false} />
                                </div>
                                <div class={`mb-3 mt-6 px-3 ${feeType === 'registrationFees' || feeType === 'examFees' || feeType === null ? 'hidden' : 'block'}`}>
                                    <label for="paymentType" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Select fee type</label>
                                    <Select options={feeOptions} styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderRadius: '.5rem',
                                            padding: '0.2rem',
                                            borderWidth: '0px',
                                            backgroundColor: 'RGB(255,255,255)',
                                        }),
                                    }} className="bg-[#f0f0f0] text-gray-600 text-md lg:text-xl border border-gray-200 rounded" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setPaymentType(e.value)} name="paymentType" controlShouldRenderValue={paymentType ? true : paymentType === false ? true : false} />
                                </div>
                                <div class={`mb-3 mt-6 px-3 ${feeType === 'registrationFees' || feeType === 'examFees' || feeType === null ? 'block' : 'hidden'}`}>
                                    <label for="paymentType" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Select fee type</label>
                                    <Select options={feeOptions} styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderRadius: '.5rem',
                                            padding: '0.2rem',
                                            borderWidth: '0px',
                                            backgroundColor: 'RGB(255,255,255)',
                                        }),
                                    }} className="border border-gray-200 text-md lg:text-xl rounded" closeMenuOnSelect={true} isSearchable={false} name="paymentType" onChange={(e) => setPaymentType(e.value)} controlShouldRenderValue={paymentType ? true : paymentType === false ? true : false} />
                                </div>
                                <div class="mb-3 mt-6 px-3">
                                    <label for="enrollmentNumber" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Amount</label>
                                    <input type="text" id="enrollmentNumber" class="bg-white text-gray-600 text-md border border-gray-200   text-md lg:text-xl rounded-lg block w-full p-2.5 focus:outline-blue-400" placeholder="1000"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)} required />
                                </div>
                                <div class="mb-3 mt-6 px-3">
                                    <label for="utrNo" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Enter the UTR number</label>
                                    <input type="text" id="UtrNo" class="bg-white text-gray-600 text-md lg:text-xl border border-gray-200   text-sm rounded-lg block w-full p-2.5 focus:outline-blue-400" placeholder="CHJSU2UHBSA"
                                        value={utrNo}
                                        onChange={(e) => setUtrNo(e.target.value)} required />
                                </div>
                                <div className='p-5'>
                                    <Button text={'Update Fee'} buttonStyle={'bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md lg:text-xl 3xl:text-base  w-full'} />
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className='fixed bottom-0 right-0 w-full'>
                        <MobileNavigation />
                    </div>
                </div>



                {/* tablet screens */}
                <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen overflow-hidden">
                    <div className="md:col-span-1 lg:col-span-1">
                        {/* <SidebarComponent /> */}
                        <SidebarNew />
                    </div>
                    <div className=' col-span-6 h-full px-12  3xl:grid-rows-12 overflow-hidden'>

                        <div className='pt-14'>
                            <h1 className='text-3xl lg:text-4xl font-semibold'>Update Fee</h1>
                            <h1 className='text-sm lg:text-lg font-base text-[#333333]'>Update the fee of the student</h1>
                        </div>

                        <div className=''>
                            <div class="mb-3 mt-6 px-3">
                                <label for="feeType" class="block text-md lg:text-xl  font-medium text-gray-900 mb-2">Select payment type</label>
                                <Select options={paymentOptions} styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: '.5rem',
                                        padding: '0.2rem',
                                        borderWidth: '0px',
                                        backgroundColor: 'RGB(255, 255 , 255)',
                                    }),
                                }} className="border border-gray-200 rounded text-md lg:text-xl bg-white text-gray-600" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setFeeType(e.value)} name="feeType" controlShouldRenderValue={feeType ? true : feeType === false ? true : false} />
                            </div>
                            <div class={`mb-3 mt-6 px-3 ${feeType === 'registrationFees' || feeType === 'examFees' || feeType === null ? 'hidden' : 'block'}`}>
                                <label for="paymentType" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Select fee type</label>
                                <Select options={feeOptions} styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: '.5rem',
                                        padding: '0.2rem',
                                        borderWidth: '0px',
                                        backgroundColor: 'RGB(255,255,255)',
                                    }),
                                }} className="bg-[#f0f0f0] text-gray-600 text-md lg:text-xl border border-gray-200 rounded" closeMenuOnSelect={true} isSearchable={false} onChange={(e) => setPaymentType(e.value)} name="paymentType" controlShouldRenderValue={paymentType ? true : paymentType === false ? true : false} />
                            </div>
                            <div class={`mb-3 mt-6 px-3 ${feeType === 'registrationFees' || feeType === 'examFees' || feeType === null ? 'block' : 'hidden'}`}>
                                <label for="paymentType" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Select fee type</label>
                                <Select options={feeOptions} styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: '.5rem',
                                        padding: '0.2rem',
                                        borderWidth: '0px',
                                        backgroundColor: 'RGB(255,255,255)',
                                    }),
                                }} className="border border-gray-200 text-md lg:text-xl rounded" closeMenuOnSelect={true} isSearchable={false} name="paymentType" onChange={(e) => setPaymentType(e.value)} controlShouldRenderValue={paymentType ? true : paymentType === false ? true : false} />
                            </div>
                            <div class="mb-3 mt-6 px-3">
                                <label for="enrollmentNumber" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Amount</label>
                                <input type="text" id="enrollmentNumber" class="bg-white text-gray-600 text-md border border-gray-200   text-md lg:text-xl rounded-lg block w-full p-2.5 focus:outline-blue-400" placeholder="1000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} required />
                            </div>
                            <div class="mb-3 mt-6 px-3">
                                <label for="utrNo" class="block text-md lg:text-xl font-medium text-gray-900 mb-2">Enter the UTR number</label>
                                <input type="text" id="UtrNo" class="bg-white text-gray-600 text-md lg:text-xl border border-gray-200   text-sm rounded-lg block w-full p-2.5 focus:outline-blue-400" placeholder="CHJSU2UHBSA"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} required />
                            </div>
                            <div className='p-5'>
                                <Button text={'Update Fee'} buttonStyle={'bg-[#2740CD] text-white rounded-lg px-4 py-2 text-md lg:text-xl 3xl:text-base  w-full'} />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeeUpdateForm