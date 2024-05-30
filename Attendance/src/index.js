import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './Pages/Employee';
import Dashboard from './Pages/Dashboard';
import Attendance from './Pages/Attendance';
import Login from './Pages/Login';
import AddEmployee from './Pages/AddEmployee';
import EditEmoloyee from './Pages/EditEmoloyee';
import AddAttendance from './Pages/AddAttendance';
import Master from './Pages/Master';
import RoleMaster from './Pages/RoleMaster';
import Leave from './Pages/Leave';
import LeaveView from './Pages/LeaveView';
import EmployeeLeave from './Pages/EmployeeLeave';
import EmployeeLeaveView from './Pages/EmployeeLeaveView';
import MailVerify from './Pages/MailVerify';
import OtpVerify from './Pages/OtpVerify';
import ConfirmPassword from './Pages/ConfirmPassword';
import SalaryHistory from './Pages/SalaryHistory';



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
          <Route path='/add_employee' element={<AddEmployee />} />
          <Route path='/edit_employee/:id' element={<EditEmoloyee />} />
          <Route path='/add_attendance/:id' element={<AddAttendance />} />
          <Route path='/master' element={<Master />} />
          <Route path='/role_master' element={<RoleMaster />} />
          <Route path='/leave' element={<Leave />} />
          <Route path='/leaveview/:id' element={<LeaveView />} />
          <Route path='/employee_leave' element={<EmployeeLeave />} />
          <Route path='/employee_leave_view/:id' element={<EmployeeLeaveView/>} />
          <Route path='/mail_verify' element={<MailVerify/>} />
          <Route path='/Otp_verify' element={<OtpVerify/>} />
          <Route path='/confirm_password' element={<ConfirmPassword/>} />
          <Route path='/salary_history/:id' element={<SalaryHistory/>} />



          

        </Route>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
