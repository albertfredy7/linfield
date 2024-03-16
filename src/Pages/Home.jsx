import React from 'react';
import SidebarNew from '../Components/SidebarNew';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import Button from '../Components/Button';
import gmeet from '../assets/google-meets.svg';
import notion from '../assets/notion.svg';
import DataCard from '../Components/DataCard';
import MobileNavigation from '../Components/MobileNavigation';
import { MonetizationOn, RequestQuote, School } from '@mui/icons-material';


function Home() {
  const recentTransactions = [
    {
      title: 'Admission Fee',
      subtitle: 'John Doe',
      tailData: 'SSLC',
    },
    {
      title: 'AdmisSion Fee',
      subtitle: 'Jos Doe',
      tailData: 'Plus Two',
    },


  ];
  const recentAdmissions = [
    {
      title: 'Admission Fee',
      subtitle: 'John Doe',
      tailData: 'SSLC',
    },
    {
      title: 'Exam Fee',
      subtitle: 'Jos Doe',
      tailData: 'Plus Two',
    },
  ]

  const items = [
    {
        icon: <MonetizationOn fontSize='medium' />,
        subtitle: '₹ 2.02L'
    },
    {
        icon: <School fontSize='medium' />,
        subtitle: '500'
    },
    {
        icon: <RequestQuote fontSize='medium' />,
        subtitle: '₹ 1000'
    }
];

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full  block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden  ">

          {/* content for mobile screen should place here */}
          <div className='mt-6 flex items-start flex-col p-10'>
            <h1 className='text-2xl text-[#2740CD] font-bold'>Hey Nishad 👋</h1>
            <h2 className='text-[#66666]'>Everything under your control</h2>
          </div>
          <MobileOverviewCard item={items} />
          <div className='flex gap-0 justify-center items-center px-20'>
            <Button title={'Meet'} icon={gmeet} backround={'#666666'} />
            <Button title={'Notion'} icon={notion} backround={null} />
          </div>
          {/* recent transactions */}
          <div>
            <h1 className='text-xl text-[#333333] font-semibold py-4 px-6'>Recent Transactions</h1>
            <div className='flex flex-col gap-1 px-3'>
              {recentTransactions.map((transaction, index) => (
                <DataCard key={index} type={'transactions'} title={transaction.title} subTitle={transaction.subtitle} tailData={transaction.tailData} />
              ))}
            </div>
            <div className='text-md flex float-end px-5 text-blue-600 font-medium'>View More</div>

          </div>
          {/* recent admissions */}
          <div>
            <h1 className='text-xl text-[#333333] font-semibold py-4 px-6'>Recent Admissions</h1>
            <div className='flex flex-col gap-1 px-3 '>
              {recentAdmissions.map((transaction, index) => (
                index === 0 && (
                  <DataCard key={index} type={'admissions'} title={transaction.title} subtitle={transaction.subtitle} tailData={transaction.tailData} />
                )
              ))}
            </div>
            <div className='text-md flex float-end px-5 text-blue-600 font-medium'>View More</div>
          </div>

          {/* mobile navigation */}
          
            <MobileNavigation/>
          
         


        </div>

        {/* tablet screens */}
        <div className="hidden md:block md:col-span-1 lg:col-span-1 xl:hidden p-4">
          {/* <SidebarComponent /> */}
          <SidebarNew />
        </div>

        {/* pc screens */}
        <div className="hidden xl:block xl:col-span-2 2xl:col-span-1 p-4">
          {/* <SidebarComponent /> */}
          <SidebarNew />
        </div>

      </div>
      {/* <div className='grid grid-cols-5'>
            <div className='w-full '>
                <Sidebar />
            </div>
            <div>Home</div>
        </div> */}
    </div>
  );
}

export default Home;
