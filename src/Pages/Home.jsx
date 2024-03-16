import React from 'react';
import SidebarNew from '../Components/SidebarNew';
import OverviewCard from '../Components/OverviewCard';
import Button from '../Components/Button';
import HomeIcon from '@mui/icons-material/Home';
import gmeet from '../assets/meet-logo-new.svg';
import notion from '../assets/notion.png';
import DataCard from '../Components/DataCard';
import DatePicker from '../Components/DatePicker';

function Home() {
  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden ">this is mobile screen</div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen"> {/* Parent div contains 2 cols */}
          <div className="md:col-span-1 lg:col-span-1"> {/* First col is acquired by the sidebar component */}
            <SidebarNew />
          </div>
          <div className="md:grid md:col-span-6 lg:col-span-6 md:grid-rows-5 "> {/* Second col is acquired by datacards and overview cards. Second row is also split in to 3 rows */}
            <div className="grid row-span-1 grid-cols-3  justify-center items-center pl-3"> {/* First row containing the overview card */}
              <OverviewCard
                title="Revenue so far"
                value="3.56L"
                style={{ h: '3/5' }}
              />
              <OverviewCard
                title="Revenue so far"
                value="3.56L"
                style={{ h: '3/5' }}
              />
              <OverviewCard
                title="Revenue so far"
                value="3.56L"
                style={{ h: '3/5' }}
              />
            </div>

            <div className="grid row-span-4 grid-rows-11 items-center pr-4"> {/* second row contains the data card and quick actions */}
              <div className="row-span-1 h-full flex justify-end gap-6">
                <Button buttonStyle={`flex items-center gap-2`} icon={gmeet} iconStyle={`h-2/5 w-2/5 lg:h-3/5 lg:w-3/5`} text={`Meet`} textStyle={`text-xl lg:text-2xl font-semibold hover:text-blue-400`}/>
                <Button buttonStyle={`flex items-center gap-2`} icon={notion} iconStyle={`h-2/5 w-2/5 lg:h-3/5 lg:w-3/5`} text={`Notion`} textStyle={`text-xl lg:text-2xl font-semibold hover:text-blue-400`}/>
              </div>
              <div className="row-span-5 h-full grid grid-rows-11"> {/* Equal spacing for both transaction DataCard and admissions DataCard components */}
                <div className="row-span-1 px-7">
                  <h4 className="text-2xl lg:text-3xl font-semibold">
                    Recent transactions
                  </h4>
                </div>
                <div className="row-span-3 flex items-center pl-7 py-2">
                  <DataCard
                    type="transactions"
                    title="Admission Fee"
                    subTitle="John Doe"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
                <div className="row-span-3 flex items-center pl-7 py-2">
                  <DataCard
                    type="transactions"
                    title="Exam Fee"
                    subTitle="John Doe"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
                <div className="row-span-3 flex items-center pl-7 py-2">
                  <DataCard
                    type="transactions"
                    title="Tuition Fee"
                    subTitle="John Doe"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
                <div className="row-span-1 text-xl lg:text-2xl text-blue-600 flex justify-end ">
                  View more
                </div>
              </div>

              <div className="row-span-5 h-full grid grid-rows-11">
                <div className="row-span-1 px-7">
                  <h4 className="text-2xl lg:text-3xl font-semibold">
                    Recent transactions
                  </h4>
                </div>
                <div className="row-span-3 flex items-center pl-7 py-2">
                  <DataCard
                    type="admissions"
                    title="Berlin"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
                <div className="row-span-3 flex items-center pl-7 py-2">
                  <DataCard
                    type="admissions"
                    title="Denver"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
                <div className="row-span-3 flex items-center pl-7 py-2">
                  <DataCard
                    type="admissions"
                    title="Professor"
                    tailData="SSLC"
                    style={{ h: 'full' }}
                  />
                </div>
                <div className="row-span-1 text-xl lg:text-2xl text-blue-600 flex justify-end ">
                  View more
                </div>
              </div>
            </div>
            {/* Content for the remaining portion */}
          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen"> {/* Total 2 cols for pc screens */}
          {/* <SidebarComponent /> */}
          <div className="col-span-2 bg-red-100"> {/* 1st col */}
            <SidebarNew />
          </div>
          <div className="col-span-9 grid grid-rows-5"> {/* 2nd col */} {/* Inside 2d col 2 rows. */}
            <div className="row-span-1 grid grid-cols-3 pl-4 pr-2 pb-2 items-center"> {/* first row is overview card */}
              <OverviewCard
                title="Revenue so far"
                value="13.5L"
                style={{ h: 'full' }}
              />
              <OverviewCard
                title="Admissions so far"
                value="13.5L"
                style={{ h: 'full' }}
              />
              <OverviewCard
                title="Expenses so far"
                value="13.5L"
                style={{ h: 'full' }}
              />
            </div>
            <div className="row-span-4  pt-2 grid grid-cols-3"> {/* second row is Data cards, which is basically 2 types. Admissions and Transactions. Splitting both in a way both will acquire same space*/}
              <div className="col-span-2  grid grid-rows-2"> {/* Second row contains 2 cols, first one for data cards that acquire 2x spacing and another contains x spacing for calender and quick actions. This also contains 2 rows one for DataCard referring 'admissions' and second one refers to 'transactions'*/}
                <div className=" grid grid-rows-8"> {/* Transactions row */}
                  <div className="row-span-1 flex items-center">
                    <h3 className="text-md 3xl:text-lg font-semibold px-9">
                      Recent transactions
                    </h3>
                  </div>
                  <div className=" row-span-2 pl-9 pr-4 pb-2">
                    <DataCard
                      type="transactions"
                      title="Admission Fees"
                      subTitle="John doe"
                      tailData="SSLC"
                    />
                  </div>
                  <div className="row-span-2 pl-9 pr-4 pb-2">
                    <DataCard
                      type="transactions"
                      title="Admission Fees"
                      subTitle="John doe"
                      tailData="SSLC"
                    />
                  </div>
                  <div className="row-span-2 pl-9 pr-4 pb-2">
                    <DataCard
                      type="transactions"
                      title="Admission Fees"
                      subTitle="John doe"
                      tailData="SSLC"
                    />
                  </div>
                  <div className="row-span-1 flex justify-end pr-4">
                    <h3 className="text-sm 3xl:text-lg text-blue-500">
                      View more
                    </h3>
                  </div>
                </div>
                <div className="grid grid-rows-8"> {/* Admissions row */}
                  <div className="row-span-1 flex items-center">
                    <h3 className="text-md 3xl:text-lg font-semibold px-9">
                      Recent admissions
                    </h3>
                  </div>
                  <div className=" row-span-2 pl-9 pr-4 pb-2">
                    <DataCard
                      type="admissions"
                      title="Berlin"
                      tailData="SSLC"
                    />
                  </div>
                  <div className="row-span-2 pl-9 pr-4 pb-2">
                    <DataCard
                      type="admissions"
                      title="Denver"
                      tailData="SSLC"
                    />
                  </div>
                  <div className="row-span-2 pl-9 pr-4 pb-2">
                    <DataCard
                      type="admissions"
                      title="Professor"
                      tailData="SSLC"
                    />
                  </div>
                  <div className="row-span-1 flex justify-end pr-4">
                    <h3 className="text-sm 3xl:text-lg text-blue-500">
                      View more
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-span-1  grid grid-rows-5 px-8 py-4 items-center"> {/* third col of the div */}
                
                <div className="grid row-span-3 items-end"> {/* first row of the third col, contains the calender */}
                  <div className="w-full h-full 3xl:h-fit">
                      <DatePicker />
                  </div>
                </div>
                <div className="grid row-span-1 items-center"> {/* second row of the third col, contains the quick actions */}
                  <div>
                    <h3 className="text-md 3xl:text-xl font-semibold">
                      Quick actions
                    </h3>
                    <div className="flex gap-4">
                      <Button buttonStyle={`flex items-center cursor-pointer`} icon={gmeet} iconStyle={`w-3/5 h-3/5 3xl:w-4/5 3xl:h-4/5`} text={`Meet`} textStyle={`text-md 3xl:text-lg hover:text-blue-400`}/>
                      <Button buttonStyle={`flex items-center cursor-pointer gap-1`} icon={notion} iconStyle={`w-1/2 h-1/2 3xl:w-4/5 3xl:h-4/5`} text={`Notion`} textStyle={`text-md 3xl:text-lg hover:text-blue-400`}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
