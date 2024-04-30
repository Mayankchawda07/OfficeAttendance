import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './Pages/Employee';
import Dashboard from './Pages/Dashboard';
import Attendance from './Pages/Attendance';
import Payroll from './Pages/Payroll';
import Login from './Pages/Login';
import AddEmployee from './Pages/AddEmployee';
import EditEmoloyee from './Pages/EditEmoloyee';
import AddAttendance from './Pages/AddAttendance';
import Master from './Pages/Master';
import RoleMaster from './Pages/RoleMaster';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/officeAttendance/'>
      <Routes>
        <Route element={<App />} >

          <Route path='/' element={<Login />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/payroll' element={<Payroll />} />
          <Route path='/add_employee' element={<AddEmployee />} />
          <Route path='/edit_employee/:id' element={<EditEmoloyee />} />
          <Route path='/add_attendance/:id' element={<AddAttendance />} />
          <Route path='/master' element={<Master />} />
          <Route path='/role_master' element={<RoleMaster />} />



        </Route>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
