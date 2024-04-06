import React, { useState, useEffect } from 'react';

function FeeStatus({ studentData }) {
  console.log(studentData && studentData[0] && studentData[0]);
  return (
    <div className="bg-white rounded-lg h-full 4xl:h-3/4 w-full grid grid-rows-2 4xl:space-y-1 p-4 space-y-2  items-center">
      <div className="h-full w-full grid grid-cols-3 space-x-2">
        <div
          className={`border ${
            studentData &&
            studentData.length > 0 &&
            studentData[0].feeDetails.admissionFeePaid
              ? 'border-green-400'
              : 'border-red-400'
          } flex flex-col justify-center items-center rounded-lg`}
        >
          <h1
            className={`text-sm md:text-base ${
              studentData &&
              studentData[0] &&
              studentData[0].feeDetails.admissionFeePaid
                ? 'text-green-400'
                : 'text-red-400'
            } 3xl:text-lg 4xl:text-xl`}
          >
            Adm fees
          </h1>
          {studentData &&
            studentData[0] &&
            studentData[0].feeDetails.admissionFeePaid === false && (
              <h2 className="text-xs text-red-500 md:text-sm 3xl:text-base 4xl:text-lg">
                ₹{' '}
                {studentData[0].feeDetails.admissionFees -
                  studentData[0].feeDetails.admissionFeePaidAmount}{' '}
                pen
              </h2>
            )}
        </div>

        <div
          className={`border ${
            studentData &&
            studentData.length > 0 &&
            studentData[0].mode === 'Correspondent'
              ? 'bg-red-200 border-red-400'
              : studentData &&
                studentData.length > 0 &&
                studentData[0].feeDetails &&
                studentData[0].feeDetails.installments &&
                studentData[0].feeDetails.installments[0] &&
                studentData[0].feeDetails.installments[0].isPaid
              ? 'border-green-400'
              : 'border-red-400'
          } flex flex-col justify-center items-center rounded-lg`}
        >
          <h1
            className={`text-sm md:text-base ${
              studentData &&
              studentData[0] &&
              studentData[0].feeDetails.installments.length > 0 &&
              studentData[0].feeDetails.installments[0].isPaid
                ? 'text-green-400'
                : 'text-red-400'
            } 3xl:text-lg 4xl:text-xl`}
          >
            First term
          </h1>
          {studentData &&
            studentData[0] &&
            studentData[0].mode !== 'Correspondent' &&
            studentData[0].feeDetails.installments[0].isPaid === false && (
              <h2 className="text-xs text-red-500 md:text-sm 3xl:text-base 4xl:text-lg">
                ₹{' '}
                {studentData[0].feeDetails.installments[0].amount -
                  studentData[0].feeDetails.installments[0].paidAmount}{' '}
                pen
              </h2>
            )}
        </div>

        <div
          className={`border ${
            studentData &&
            studentData[0] &&
            studentData[0].feeDetails.examFeePaid
              ? 'border-green-400'
              : 'border-red-400'
          } flex flex-col justify-center items-center rounded-lg`}
        >
          <h1
            className={`text-sm md:text-base ${
              studentData &&
              studentData[0] &&
              studentData[0].feeDetails.examFeePaid
                ? 'text-green-400'
                : 'text-red-400'
            } 3xl:text-lg 4xl:text-xl`}
          >
            Exam fee
          </h1>
        </div>
      </div>
      <div className="h-full w-full grid grid-cols-3 space-x-2">
        <div
          className={`border ${
            studentData &&
            studentData[0] &&
            studentData[0].feeDetails.registrationFeePaid
              ? 'border-green-400'
              : 'border-red-400'
          } flex flex-col justify-center items-center rounded-lg`}
        >
          <h1
            className={`text-sm md:text-base ${
              studentData &&
              studentData[0] &&
              studentData[0].feeDetails.registrationFeePaid
                ? 'text-green-400'
                : 'text-red-400'
            } 3xl:text-lg 4xl:text-xl`}
          >
            Reg fee
          </h1>
        </div>

        <div
          className={`border ${
            studentData &&
            studentData.length > 0 &&
            studentData[0].mode === 'Correspondent'
              ? 'bg-red-200 border-red-400'
              : studentData &&
                studentData.length > 0 &&
                studentData[0].feeDetails &&
                studentData[0].feeDetails.installments &&
                studentData[0].feeDetails.installments[1] &&
                studentData[0].feeDetails.installments[1].isPaid
              ? 'border-green-400'
              : 'border-red-400'
          } flex flex-col justify-center items-center rounded-lg`}
        >
          <h1
            className={`text-sm md:text-base ${
              studentData &&
              studentData[0] &&
              studentData[0].feeDetails.installments.length > 0 &&
              studentData[0].feeDetails.installments[1].isPaid
                ? 'text-green-400'
                : 'text-red-400'
            } 3xl:text-lg 4xl:text-xl`}
          >
            Sec term
          </h1>
          {studentData &&
            studentData[0] &&
            studentData[0].mode !== 'Correspondent' &&
            studentData[0].feeDetails.installments[1].isPaid === false && (
              <h2 className="text-xs text-red-500 md:text-sm 3xl:text-base 4xl:text-lg">
                ₹{' '}
                {studentData[0].feeDetails.installments[1].amount -
                  studentData[0].feeDetails.installments[1].paidAmount}{' '}
                pen
              </h2>
            )}
        </div>

        {/* <div
          className={`border ${
            studentData &&
            studentData.length > 0 &&
            studentData[0].feeDetails &&
            studentData[0].feeDetails.installments.length > 0 &&
            studentData[0].feeDetails.installments[2] &&
            studentData[0].feeDetails.installments[2].isPaid
              ? 'border-green-400'
              : 'border-red-400'
          } ${
            ((studentData &&
              studentData.length > 0 &&
              studentData[0].mode !== 'Correspondent') ||
              studentData[0].mode !== 'Offline') &&
            'bg-red-200'
          } flex flex-col justify-center items-center rounded-lg`}
        > */}
        <div
          className={`border  ${
            studentData &&
            studentData.length > 0 &&
            (studentData[0].mode === 'Correspondent' ||
            studentData[0].mode === 'Offline'
              ? 'border-red-400 bg-red-200'
              : studentData[0].feeDetails.installments[2].isPaid
              ? 'border-green-400'
              : 'border-red-400')
          } ${
            studentData.length < 1 && 'border-red-400'
          } flex flex-col justify-center items-center rounded-lg`}
        >
          <h1
            className={`text-sm md:text-base ${
              studentData &&
              studentData[0] &&
              studentData[0].feeDetails.installments.length > 0 &&
              studentData[0].feeDetails.installments[2].isPaid
                ? 'text-green-400'
                : 'text-red-400'
            } 3xl:text-lg 4xl:text-xl`}
          >
            Third term
          </h1>
          {studentData &&
            studentData.length > 0 &&
            studentData[0].mode !== 'Correspondent' &&
            studentData[0].mode !== 'Offline' &&
            studentData[0].feeDetails.installments[2].isPaid === false && (
              <h2 className="text-xs text-red-500 md:text-sm 3xl:text-base 4xl:text-lg">
                ₹{' '}
                {studentData[0].feeDetails.installments[2].amount -
                  studentData[0].feeDetails.installments[2].paidAmount}{' '}
                pen
              </h2>
            )}
          {/* {(studentData &&
            studentData[0] &&
            studentData[0].mode !== 'Correspondent') ||
            (studentData[0].mode !== 'Offline' &&
              studentData[0].feeDetails.installments[2].isPaid === false && (
                <h2 className="text-xs text-red-500 md:text-sm 3xl:text-base 4xl:text-lg">
                  ₹{' '}
                  {studentData[0].feeDetails.installments[2].amount -
                    studentData[0].feeDetails.installments[2].paidAmount}{' '}
                  pending
                </h2>
              ))} */}
        </div>
      </div>
    </div>
  );
}

export default FeeStatus;

{
  /* <div className="bg-white rounded-2xl h-full grid grid-cols-3 p-4 md:p-6 lg:p-7 xl:p-4 2xl:p-4 text-xs md:text-lg">
      <div className="col-span-1 grid grid-rows-2 bg-green-200 gap-2 md:gap-4  p-1 lg:p-3 xl:p-2 2xl:p-3   ">
        <div className="row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-23xl:p-4 ">
          <div className="flex flex-col justify-center items-center    rounded-3xl">
            <h1 className="text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg">
              Admn Fee
            </h1>
            <h1 className="text-xs text-red-600  lg:text-xl xl:text-sm ">
              1000 Bal
            </h1>
          </div>
        </div>
        <div className="row-span-1   flex justify-center items-center   border border-green-600 rounded-2xl p-2 md:p-4 xl:p-2 2xl:p-2 3xl:p-4">
          <div className="flex flex-col justify-center items-center   rounded-3xl">
            <h1 className="text-green-600 lg:text-2xl xl:text-xl 2xl:text-lg">
              First term{' '}
            </h1>
            <h1></h1>
          </div>
        </div>
      </div>
      <div className="col-span-1 grid grid-rows-2 gap-2 md:gap-4  p-1 lg:p-3 xl:p-2 2xl:p-3  ">
        <div className="row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4">
          <div className="flex flex-col justify-center items-center  rounded-3xl">
            <h1 className="text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg">
              Reg Fee
            </h1>
            <h1></h1>
          </div>
        </div>
        <div className="row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4">
          <div className="flex flex-col justify-center items-center    rounded-3xl">
            <h1 className="text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg">
              Second term
            </h1>
            <h1></h1>
          </div>
        </div>
      </div>
      <div className="col-span-1 grid grid-rows-2 gap-2 md:gap-4   p-1 lg:p-3 xl:p-2 2xl:p-3 ">
        <div className="row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4">
          <div className="flex flex-col justify-center items-center   rounded-3xl">
            <h1 className="text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg">
              Exam Fee
            </h1>
            <h1></h1>
          </div>
        </div>
        <div className="row-span-1   flex justify-center items-between border border-red-600 rounded-2xl p-2  md:p-4 xl:p-2 2xl:p-2 3xl:p-4 ">
          <div className="flex flex-col justify-center items-center  rounded-3xl">
            <h1 className="text-red-600 lg:text-2xl xl:text-xl 2xl:text-lg">
              Third term
            </h1>
            <h1></h1>
          </div>
        </div>
      </div>
    </div> */
}
