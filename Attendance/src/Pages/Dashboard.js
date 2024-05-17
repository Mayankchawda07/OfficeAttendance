import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import Login from './Login'
import { Link } from 'react-router-dom'
import dateFormat from "dateformat";

const Dashboard = () => {
    const tokenstring = sessionStorage.getItem('token')
    const permission = localStorage.getItem('permission')
    const name = sessionStorage.getItem('name')

    const x = permission

    const [todayAttendance, settodayAttendance] = useState('')

    const TodayAttendance = () => {
        fetch(`http://206.189.130.102:3210/api/v1/attendance/getTodayAttendance`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                settodayAttendance(data);
            });
    };

    useEffect(() => {
        TodayAttendance();
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
                                    <h1>Hello {name}</h1>

                                    {x.includes('7') ? (
                                        <div className="row">
                                            <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-tale">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Total No. of employee</h4>
                                                        <br />
                                                        <p class="card-description dashpara">11</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-tale">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Present Employee</h4>
                                                        <br />
                                                        <p class="card-description dashpara">11</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-tale">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Absent Employee</h4>
                                                        <br />
                                                        <p class="card-description dashpara">11</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                <div class="card card-tale">
                                                    <div class="card-body">
                                                        <h4 class="card-title mb-0 dashhead">Pending leaves</h4>
                                                        <br />
                                                        <p class="card-description dashpara">11</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : ('')}


                                    {x.includes('6') ?
                                        (
                                            //For Employee 
                                            <div className="row">
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-tale">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">Prsent days</h4>
                                                            <br />
                                                            <p class="card-description dashpara">11</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-tale">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">Absent days</h4>
                                                            <br />
                                                            <p class="card-description dashpara">11</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-tale">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">Leaves</h4>
                                                            <br />
                                                            <p class="card-description dashpara">11</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to='/dashboard' class="col-md-3 mb-4 stretch-card transparent">
                                                    <div class="card card-tale">
                                                        <div class="card-body">
                                                            <h4 class="card-title mb-0 dashhead">lorem ipsum</h4>
                                                            <br />
                                                            <p class="card-description dashpara">11</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                        :
                                        ('')}




                                    <div class="card">
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
                                    </div>
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