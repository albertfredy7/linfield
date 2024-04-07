import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Insights from './Pages/Insights';
import Home from './Pages/Home';
import Login from './Pages/Login'; // Make sure to import the Login component
import ExpenseTracker from './Pages/ExpenseTracker';
import AddStudent from './Pages/AddStudent';
import ModifyStudent from './Pages/ModifyStudent';
import FilterStudents from './Pages/FilterStudents';
import CreateTeacher from './Pages/CreateTeacher';
import UpdateFee from './Pages/UpdateFee';
import AddExpense from './Pages/AddExpense';
import Filter from './Pages/Filter';
import FeeUpdateForm from './Pages/FeeUpdateForm';
import AddRevenue from './Pages/AddRevenue';
import UpdateStudent from './Pages/UpdateStudent';

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/expense" element={<ExpenseTracker />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/modify" element={<ModifyStudent />} />
        <Route path='/update' element={<UpdateStudent />} />    
        <Route path="/filter" element={<FilterStudents />} />
        <Route path="applyFilter" element={<Filter />} />
        <Route path="/teacherId" element={<CreateTeacher />} />
        <Route path="/updatefee" element={<UpdateFee />} />
        <Route path="/feeUpdate/:number" element={<FeeUpdateForm />} />
        <Route path="/addRevenue" element={<AddRevenue />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
