import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import Login from './Login'
import { Link } from 'react-router-dom'
import dateFormat from "dateformat";
import axios from "axios";

const Dashboard = () => {
    const tokenstring = sessionStorage.getItem('token')
    const permission = localStorage.getItem('permission')
    const name = sessionStorage.getItem('name')
    const id = sessionStorage.getItem('id')


    const x = permission

    const [todayAttendance, settodayAttendance] = useState('')
    const [value, setValue] = useState({
        allEmployee: "",
        presentEmployees: "",
        absentEmployeesCount: "",
    });
    const [showloader, setShowLoader] = useState("none");
    const [leave, setleave] = useState({ pendingLeaves: '' })
    const [absent, setabsent] = useState('')
    const [employeeCount, setemployeeCount] = useState({
        presentDaysCount: '',
        absentDaysCount: '',
        totalDaysCount: ''
    })


    const TodayAttendance = () => {
        fetch(`http://206.189.130.102:3210/api/v1/attendance/getTodayAttendance`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                settodayAttendance(data);
            });
    };

    const numEmployee = async () => {
        setShowLoader("block");
        const PendingData = await axios.get(`http://206.189.130.102:3210/api/v1/attendance/CroneAttendance`);

        const PendingData1 = await PendingData;
        setValue(PendingData1?.data);
        setShowLoader("none");
    };

    const numPendingleaves = async () => {

        const PendingData = await axios.get(`http://206.189.130.102:3210/api/v1/leaves/getAllLeaves`);

        const PendingData1 = await PendingData;
        setleave(PendingData1?.data);

    };

    const numDaysofEmployee = () => {
        fetch(`http://206.189.130.102:3210/api/v1/attendance/getAttendanceByEmpIdDashboard/${id}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                setemployeeCount(data.data)
            })
    }

    const getAbsentEmployee = () => {
        fetch(`http://206.189.130.102:3210/api/v1/attendance/croneServer`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                setabsent(data)
            })
        alert('Attendance for absent employee marked successfully')
        TodayAttendance();
    }



    useEffect(() => {
        TodayAttendance();
        numEmployee();
        numPendingleaves();
        numDaysofEmployee();
    }, [])


    if (!tokenstring) {
        return <Login />
    }
    return (
        <>
            <div class="container-scroller">
                < Header />
                <div class="container-fluid page-body-wrapper">
                    <Sidenav />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="row">
                                <div class="col-md-12 grid-margin">
                                    <div className="row">
                                        <div className="col-md-6">

                                            <h2 className='text-dark mb-0'>Welcome {name}</h2>
                                            <h4 class="font-weight-normal mb-4 pl-2">Good to see you!</h4>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-end mb-3">
                                            <span>
                                                {x.includes('7') ? (
                                                    <button type="button" class="btn btn-outline-danger" onClick={getAbsentEmployee} >Marked Absent for all emoloyee</button>
                                                ) : ('')}
                                            </span>
                                        </div>
                                    </div>

                                    {x.includes('7') ? (

                                        <div className="row">
                                            <Link to='/employee' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-dark-blue">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Total No. of employee</h4>
                                                        <br />
                                                        <p class="card-description dashpara">{value?.allEmployee}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-light-blue">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Present Employee</h4>
                                                        <br />
                                                        <p class="card-description dashpara">{value?.presentEmployees}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-light-danger">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Absent Employee</h4>
                                                        <br />
                                                        <p class="card-description dashpara">{value?.absentEmployeesCount}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to='/leave' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-tale">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Pending leaves</h4>
                                                        <br />
                                                        <p class="card-description dashpara">{leave?.pendingLeaves}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>


                                    )
                                        :
                                        ('')
                                    }


                                    {x.includes('6') ?
                                        (
                                            //For Employee 
                                            <div className="row">
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-dark-blue">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">Total days of month</h4>
                                                            <br />
                                                            <p class="card-description dashpara">{employeeCount.totalDaysCount}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-light-blue">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">Present days</h4>
                                                            <br />
                                                            <p class="card-description dashpara">{employeeCount.presentDaysCount}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-light-danger">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">Absent days</h4>
                                                            <br />
                                                            <p class="card-description dashpara">{employeeCount.absentDaysCount}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                {/* <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-tale">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">lorem ipsum</h4>
                                                            <br />
                                                            <p class="card-description dashpara">11</p>
                                                        </div>
                                                    </div>
                                                </Link> */}
                                            </div>
                                        )
                                        :
                                        ('')}



                                    {x.includes('7') ? (<div class="card">
                                        <div class="card-body">
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Employee Name</th>
                                                            <th>Date</th>
                                                            <th>Time-In</th>
                                                            <th>Time-Out</th>
                                                            <th>Total time Diffrence</th>
                                                            <th>Attendance</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {todayAttendance?.data?.map((val, index) => {
                                                            const loginTimeUTC = new Date(val?.login);
                                                            let logoutTimeUTC = new Date(val?.logout);

                                                            // Check if logoutTimeUTC is a valid date
                                                            if (isNaN(logoutTimeUTC.getTime())) {
                                                                // If logoutTimeUTC is not a valid date, set it to null or undefined
                                                                logoutTimeUTC = null; // or undefined
                                                            }

                                                            // Convert login and logout timestamps to IST time string (hh:mm:ss format)
                                                            const loginTimeIST = loginTimeUTC.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
                                                            const logoutTimeIST = logoutTimeUTC ? logoutTimeUTC.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }) : 'Not Punched Yet';

                                                            // Calculate the time difference in milliseconds if logoutTimeUTC is valid
                                                            let totalTimeDifference = 'It will show after Time out';
                                                            if (logoutTimeUTC) {
                                                                const timeDifferenceMillis = logoutTimeUTC - loginTimeUTC;

                                                                // Convert the time difference to hours and minutes
                                                                const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
                                                                const minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));

                                                                // Construct the total time difference string
                                                                totalTimeDifference = `${hours} Hr, ${minutes} min`;
                                                            }
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
                                                                    <td>{val?.employeeID?.name}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{loginTimeIST}</td>
                                                                    <td>{logoutTimeIST}</td>
                                                                    <td>{totalTimeDifference}</td>
                                                                    <td>{val?.attend === 1 ? 'Present' : 'Absent'}</td>
                                                                </tr>
                                                            );
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>) : ('')}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard