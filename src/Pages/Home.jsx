import React, { useEffect, useState } from 'react';
import SidebarNew from '../Components/SidebarNew';
import OverviewCard from '../Components/OverviewCard';
import Button from '../Components/Button';
import HomeIcon from '@mui/icons-material/Home';
import gmeet from '../assets/meet-logo-new.svg';
import notion from '../assets/notion.png';
import DataCard from '../Components/DataCard';
import DatePicker from '../Components/DatePicker';
import MobileNavigation from '../Components/MobileNavigation';
import MobileOverviewCard from '../Components/MobileOverviewCard';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Home() {
  const navigate = useNavigate();

  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalAdmissions, setTotalAdmissions] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentAdmissions, setRecentAdmissions] = useState([]);

  const teacherLoginData = useSelector((state) => state.teacherLogin);
  const { loading, teacherInfo, error } = teacherLoginData;

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M'; // Convert to millions
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + 'L'; // Convert to lakhs
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K'; // Convert to thousands
    } else {
      return number;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  useEffect(() => {
    if (!teacherInfo) {
      navigate('/login');
    } else {
      const getRevenue = async () => {
        const { data } = await axios.get(
          'https://lobster-app-yjjm5.ondigitalocean.app/api/transactions/totalRevenue'
        );
        setTotalRevenue(formatNumber(JSON.stringify(data.totalRevenue)));
      };
      getRevenue();

      const getAdmissionsCount = async () => {
        const { data } = await axios.get(
          'https://lobster-app-yjjm5.ondigitalocean.app/api/students/totalAdmissions'
        );
        setTotalAdmissions(
          formatNumber(JSON.stringify(data.numberOfAdmissions))
        );
      };
      getAdmissionsCount();

      const getExpense = async () => {
        const { data } = await axios.get(
          'https://lobster-app-yjjm5.ondigitalocean.app/api/expense/totalExpense'
        );
        setTotalExpense(
          formatNumber(Math.abs(JSON.stringify(data.totalExpenses)))
        );
      };
      getExpense();

      const getRecentTransactions = async () => {
        const { data } = await axios.get(
          'https://lobster-app-yjjm5.ondigitalocean.app/api/transactions/recentTransactions'
        );
        setRecentTransactions(data);
      };
      getRecentTransactions();

      const getRecentAdmissions = async () => {
        const { data } = await axios.get(
          'https://lobster-app-yjjm5.ondigitalocean.app/api/students/recentAdmissions'
        );
        setRecentAdmissions(data);
      };
      getRecentAdmissions();
    }
  }, []);

  return (
    <div className="bg-[#f0f0f0] h-screen w-screen overflow-hidden">
      <div className="h-full w-full block md:grid md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-6">
        {/* mobile screens */}
        <div className="block md:hidden ">
          <div className="flex flex-col h-screen">
            <div className="flex flex-col items-start pt-10 px-8 py-3">
              <h1 className="text-xl sm:text-2xl text-[#2740CD] font-bold ">
                Hey Nishad 👋
              </h1>
              <h2 className="text-[#66666] text-sm text-nowrap ">
                Everything under your control
              </h2>
            </div>

            <div className="p-3">
              <MobileOverviewCard
                page={'home'}
                revenue={totalRevenue}
                admissions={totalAdmissions}
                expenses={totalExpense}
              />
            </div>

            <div className="flex gap-3 justify-center items-center p-2">
              <div>
                <Link
                  to="https://meet.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    buttonStyle={`flex items-center gap-2`}
                    Icon={gmeet}
                    iconStyle={`h-1/5 w-1/5 md:h-1/4 md:w-1/4 lg:h-3/5 lg:w-3/5`}
                    text={`Meet`}
                    textStyle={`text-base md:text-lg lg:text-2xl hover:text-blue-400`}
                    page={'Home'}
                  />
                </Link>
              </div>
              <div>
                <Link
                  to="https://www.notion.so/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    buttonStyle={`flex items-center gap-2`}
                    Icon={notion}
                    iconStyle={`h-1/5 w-1/5 md:h-1/4 md:w-1/4 lg:h-3/5 lg:w-3/5`}
                    text={`Notion`}
                    textStyle={`text-base md:text-lg lg:text-2xl hover:text-blue-400`}
                    page={'Home'}
                  />
                </Link>
              </div>
            </div>

            <div className="overflow-y-auto h-full ">
              {/* Recent transactions */}
              <div className="px-4 pt-5 ">
                <h4 className="text-base text-gray-500 md:text-lg lg:text-3xl font-semibold">
                  Recent transactions
                </h4>
                <div className="py-3 flex flex-col gap-2">
                  {recentTransactions
                    .slice(0, 3)
                    .reverse()
                    .reverse()
                    .map((x, index) => {
                      const formatDate = (dateString) => {
                        const date = new Date(dateString);
                        const day = date.getDate();
                        const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
                        const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

                        // Ensure leading zero for single-digit day and month
                        const formattedDay = day < 10 ? '0' + day : day;
                        const formattedMonth = month < 10 ? '0' + month : month;

                        return `${formattedDay}-${formattedMonth}-${year}`;
                      };

                      const formattedDate = formatDate(x.date);

                      return (
                        <DataCard
                          key={index}
                          type="transactions"
                          title={x.purpose}
                          subTitle={
                            x.type === 'debit'
                              ? formattedDate
                              : // : `${x.studentName} `? `${x.studentName} (${x.studentAdmissionNumber} `: `${x.date}`
                              x.studentName
                              ? `${x.studentName} (${x.studentAdmissionNumber})`
                              : formattedDate
                          }
                          tailData={
                            x.type === 'credit' ? `+${x.amount}` : `${x.amount}`
                          }
                          tailDataStyle={`${
                            x.type === 'credit'
                              ? 'text-green-600 font-semibold'
                              : 'text-red-500 font-semibold'
                          }`}
                        />
                      );
                    })}

                  <div
                    className=" px-2 text-sm md:text-base text-blue-600 flex justify-end "
                    onClick={() => navigate('/insights')}
                  >
                    View more
                  </div>
                </div>
              </div>

              {/* Recent admissions */}
              <div className="px-4 pb-16">
                <h4 className="text-base text-gray-500 md:text-lg lg:text-3xl font-semibold">
                  Recent Admisisons
                </h4>
                <div className="py-3 flex flex-col gap-2 pb-12">
                  {recentAdmissions
                    .slice(0, 3)
                    .reverse()
                    .reverse()
                    .map((x, index) => {
                      return (
                        <DataCard
                          key={index} // Make sure to provide a unique key for each item in the list
                          type={'admissions'}
                          title={x.name}
                          tailData={x.course}
                          style={{ h: 'full' }}
                          admissionNumber={x.admissionNumber}
                        />
                      );
                    })}

                  <div
                    className=" px-2 text-sm md:text-md text-blue-600 flex justify-end "
                    onClick={() => navigate('/insights')}
                  >
                    View more
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 right-0 w-full">
              <MobileNavigation />
            </div>
          </div>
        </div>

        {/* tablet screens */}
        <div className="hidden md:grid md:grid-cols-7 lg:grid-cols-7 xl:hidden p-4 w-screen h-screen">
          {' '}
          {/* Parent div contains 2 cols */}
          <div className="md:col-span-1 lg:col-span-1">
            {' '}
            {/* First col is acquired by the sidebar component */}
            <SidebarNew />
          </div>
          <div className="md:grid md:col-span-6 lg:col-span-6 md:grid-rows-5 ">
            {' '}
            {/* Second col is acquired by datacards and overview cards. Second row is also split in to 3 rows */}
            <div className="grid row-span-1 grid-cols-3  justify-center items-center pl-3">
              {' '}
              {/* First row containing the overview card */}
              <OverviewCard
                title="Revenue so far"
                value={totalRevenue}
                style={{ h: '3/5' }}
              />
              <OverviewCard
                title="Admissions so far"
                number={totalAdmissions}
                style={{ h: '3/5' }}
              />
              <OverviewCard
                title="Expense so far"
                value={totalExpense}
                style={{ h: '3/5' }}
              />
            </div>
            <div className="grid row-span-4 grid-rows-11 items-center pr-4">
              {' '}
              {/* second row contains the data card and quick actions */}
              <div className="row-span-1 h-full flex justify-end gap-6">
                <div>
                  <Link
                    to="https://meet.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      buttonStyle={`flex items-center gap-2`}
                      icon={gmeet}
                      iconStyle={`h-1/5 w-1/5 md:h-1/4 md:w-1/4 lg:h-3/5 lg:w-3/5`}
                      text={`Meet`}
                      textStyle={`text-base md:text-lg lg:text-2xl hover:text-blue-400`}
                    />
                  </Link>
                </div>
                <div>
                  <Link
                    to="https://www.notion.so/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      buttonStyle={`flex items-center gap-2`}
                      icon={notion}
                      iconStyle={`h-1/5 w-1/5 md:h-1/4 md:w-1/4 lg:h-3/5 lg:w-3/5`}
                      text={`Notion`}
                      textStyle={`text-base md:text-lg lg:text-2xl hover:text-blue-400`}
                    />
                  </Link>
                </div>
              </div>
              <div className="row-span-5 h-full grid grid-rows-11">
                {' '}
                {/* Equal spacing for both transaction DataCard and admissions DataCard components */}
                <div className="row-span-1 px-7">
                  <h4 className="text-2xl lg:text-3xl font-semibold">
                    Recent transactions
                  </h4>
                </div>
                {recentTransactions
                  .slice(0, 3)
                  .reverse()
                  .map((x, index) => {
                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      const day = date.getDate();
                      const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
                      const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

                      // Ensure leading zero for single-digit day and month
                      const formattedDay = day < 10 ? '0' + day : day;
                      const formattedMonth = month < 10 ? '0' + month : month;

                      return `${formattedDay}-${formattedMonth}-${year}`;
                    };

                    const formattedDate = formatDate(x.date);

                    return (
                      <div className="row-span-3 flex items-center pl-7 py-2 bg-green-200">
                        <DataCard
                          key={index}
                          type="transactions"
                          title={x.purpose}
                          subTitle={
                            x.type === 'debit'
                              ? formattedDate
                              : // : `${x.studentName} `? `${x.studentName} (${x.studentAdmissionNumber} `: `${x.date}`
                              x.studentName
                              ? `${x.studentName} (${x.studentAdmissionNumber})`
                              : formattedDate
                          }
                          tailData={
                            x.type === 'credit' ? `+${x.amount}` : `${x.amount}`
                          }
                          tailDataStyle={`${
                            x.type === 'credit'
                              ? 'text-green-600 font-semibold'
                              : 'text-red-500 font-semibold'
                          }`}
                          style={{ h: 'full' }}
                        />
                      </div>
                    );
                  })}
                <div
                  className="row-span-1 text-xl lg:text-2xl text-blue-600 flex justify-end "
                  onClick={() => navigate('/insights')}
                >
                  View more
                </div>
              </div>
              <div className="row-span-5 h-full grid grid-rows-11">
                <div className="row-span-1 px-7">
                  <h4 className="text-2xl lg:text-3xl font-semibold">
                    Recent admissions
                  </h4>
                </div>
                {recentAdmissions
                  .slice(0, 3)
                  .reverse()
                  .map((x, index) => {
                    return (
                      <div
                        className="row-span-3 flex items-center pl-7 py-2"
                        key={index}
                      >
                        <DataCard
                          type={'admissions'}
                          title={x.name}
                          tailData={x.course}
                          style={{ h: 'full' }}
                        />
                      </div>
                    );
                  })}

                <div
                  className="row-span-1 text-xl lg:text-2xl text-blue-600 flex justify-end "
                  onClick={() => navigate('/insights')}
                >
                  View more
                </div>
              </div>
            </div>
            {/* Content for the remaining portion */}
          </div>
        </div>

        {/* pc screens */}
        <div className="hidden xl:grid xl:grid-cols-11 p-4 w-screen h-screen overflow-hidden">
          {' '}
          {/* Total 2 cols for pc screens */}
          {/* <SidebarComponent /> */}
          <div className="col-span-2">
            {' '}
            {/* 1st col */}
            <SidebarNew />
          </div>
          <div className="col-span-9 grid grid-rows-5">
            {' '}
            {/* 2nd col */} {/* Inside 2d col 2 rows. */}
            <div className="row-span-1 grid grid-cols-3 pl-4 pr-2 pb-2 items-center">
              {' '}
              {/* first row is overview card */}
              <OverviewCard
                title="Revenue so far"
                value={totalRevenue}
                style={{ h: 'full' }}
              />
              <OverviewCard
                title="Admissions so far"
                number={totalAdmissions}
                style={{ h: 'full' }}
              />
              <OverviewCard
                title="Expenses so far"
                value={totalExpense}
                style={{ h: 'full' }}
              />
            </div>
            <div className="row-span-4 pt-2 grid grid-cols-3">
              {' '}
              {/* second row is Data cards, which is basically 2 types. Admissions and Transactions. Splitting both in a way both will acquire same space*/}
              <div className="col-span-2  grid grid-rows-1">
                {' '}
                {/* Second row contains 2 cols, first one for data cards that acquire 2x spacing and another contains x spacing for calender and quick actions. This also contains 2 rows one for DataCard referring 'admissions' and second one refers to 'transactions'*/}
                <div className=" grid grid-rows-8 ">
                  <div className="row-span-4  grid grid-rows-7 pl-8">
                    <div className="row-span-1  flex items-center text-gray-500 font-semibold">
                      <h3>Recent transactions</h3>
                    </div>
                    <div className="row-span-5  grid grid-rows-6">
                      {recentTransactions
                        .slice(0, 3)
                        .reverse()
                        .map((x, index) => {
                          const formatDate = (dateString) => {
                            const createdAtDate = new Date(dateString);
                            const formattedDate = `${createdAtDate.getDate()} ${createdAtDate.toLocaleString(
                              'default',
                              { month: 'short' }
                            )} ${createdAtDate.getFullYear()}`;
                            const formattedTime =
                              createdAtDate.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              });

                            return `${formattedDate} || ${formattedTime}`;
                          };

                          const formattedDate = formatDate(x.date);

                          return (
                            <div className=" row-span-2 pr-4 pb-1.5">
                              <DataCard
                                key={index}
                                type="transactions"
                                title={x.purpose}
                                subTitle={
                                  x.type === 'debit'
                                    ? formattedDate
                                    : // : `${x.studentName} `? `${x.studentName} (${x.studentAdmissionNumber} `: `${x.date}`
                                    x.studentName
                                    ? `${x.studentName} (${x.studentAdmissionNumber})`
                                    : formattedDate
                                }
                                tailData={
                                  x.type === 'credit'
                                    ? `+${x.amount}`
                                    : `${x.amount}`
                                }
                                tailDataStyle={`${
                                  x.type === 'credit'
                                    ? 'text-green-600 font-semibold'
                                    : 'text-red-500 font-semibold'
                                }`}
                                style={{ h: 'full' }}
                              />
                            </div>
                          );
                        })}
                    </div>
                    <div className="row-span-1  flex justify-end items-center pr-6">
                      <h3 className="text-sm 3xl:text-lg text-blue-500">
                        View more
                      </h3>
                    </div>
                  </div>
                  <div className="row-span-4 ">
                    <div className="h-full w-full pl-8 grid grid-rows-7">
                      <div className="row-span-1  flex items-center text-gray-500 font-semibold">
                        <h3>Recent Admissions</h3>
                      </div>
                      <div className="row-span-5  grid grid-rows-6">
                        {recentAdmissions
                          .slice(0, 3)
                          .reverse()
                          .map((x, index) => {
                            return (
                              <div className=" row-span-2 pb-1.5 pr-4">
                                <DataCard
                                  type={'admissions'}
                                  title={x.name}
                                  tailData={x.course}
                                  style={{ h: 'full' }}
                                />
                              </div>
                            );
                          })}
                      </div>
                      <div className="row-span-1  flex justify-end items-center pr-6">
                        <h3 className="text-sm 3xl:text-lg text-blue-500">
                          View more
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1  grid grid-rows-5 px-8 py-4 items-center ">
                {' '}
                {/* third col of the div */}
                <div className="grid row-span-3 items-end">
                  {' '}
                  {/* first row of the third col, contains the calender */}
                  <div className="w-full h-full 3xl:h-fit">
                    <DatePicker />
                  </div>
                </div>
                <div className="grid row-span-1 items-center">
                  {' '}
                  {/* second row of the third col, contains the quick actions */}
                  <div>
                    <h3 className="text-md 3xl:text-xl font-semibold">
                      Quick actions
                    </h3>
                    <div className="flex gap-4">
                      <Button
                        buttonStyle={`flex items-center cursor-pointer`}
                        Icon={gmeet}
                        iconStyle={`w-3/5 h-3/5 xl:h-1/4 xl:w-1/4 3xl:w-4/5 3xl:h-4/5`}
                        text={`Meet`}
                        textStyle={`text-md 3xl:text-lg hover:text-blue-400`}
                        page={'Home'}
                      />
                      <Button
                        buttonStyle={`flex items-center cursor-pointer gap-1`}
                        Icon={notion}
                        iconStyle={`w-1/2 h-1/2 xl:h-1/4 xl:w-1/4 3xl:w-4/5 3xl:h-4/5`}
                        text={`Notion`}
                        textStyle={`text-md 3xl:text-lg hover:text-blue-400`}
                        page={'Home'}
                      />
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
