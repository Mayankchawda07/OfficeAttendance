import React, { useEffect, useState } from 'react'
import Sidenav from '../Template/Sidenav'
import Header from '../Template/Header'
import dateFormat from "dateformat";
import Login from './Login'
import { Link, useLocation } from 'react-router-dom';


const AddAttendance = () => {
    const tokenstring = sessionStorage.getItem('token')


    const URL = process.env.REACT_APP_URL;

    const location = useLocation();
    const { data } = location.state

    const [allAttendance, setallAttendance] = useState('')
    const [salary, setsalary] = useState({ employeeID: data._id, month: '', year: '' })
    const [salarypay, setsalarypay] = useState({ employeeID: data._id, salary: '' })

    const [calculateSalary, setcalculateSalary] = useState('')
    const [presentdays, setpresentdays] = useState('')
    const [absentdays, setabsentdays] = useState('')



    const getAttendance = () => {
        fetch(`http://206.189.130.102:3210/api/v1/attendance/getAttendanceByEmpID/${data._id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setallAttendance(data);
            });
    };

    const SalaryCalculate = async (e) => {
        e.preventDefault();
        const { employeeID, month, year } = salary;

        if (!employeeID) {
            return alert('Please fill all the fields properly');
        }

        // Get current month and year if not provided
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript
        const currentYear = new Date().getFullYear();

        const monthToUse = month || currentMonth;
        const yearToUse = year || currentYear;

        try {
            const fetchdata = await fetch(`http://206.189.130.102:3210/api/v1/attendance/calculateMonthlySalaries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employeeID, month: monthToUse, year: yearToUse }),
            });

            const response = await fetchdata;
            const responseData = await response.json();

            if (response.status === 200) {
                // Access the data from the nested structure correctly
                const { data } = responseData;
                setcalculateSalary(data.calculatedSalary)
                setpresentdays(data.presentDays)
                setabsentdays(data.absentDaysCount)
            } else {
                console.error("Error:", responseData);
                alert(`Error: ${responseData.message}`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while calculating the salary.");
        }
    };

    const AddSalary = async (e) => {
        e.preventDefault();
        const { employeeID, salary } = salarypay;

        if (!employeeID) {
            return alert('Please fill all the fields properly');
        }
        try {
            const fetchdata = await fetch(`http://206.189.130.102:3210/api/v1/salary/addsalary`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employeeID, salary: calculateSalary }),
            });

            const response = await fetchdata;
            const responseData = await response.json();

            if (response.status === 200) {
                alert('data stored')
            } else {
                console.error("Error:", responseData);
                alert(`Error: ${responseData.message}`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while storing the salary data.");
        }
    };

 






    useEffect(() => {
        getAttendance();

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
                                    <div class="card">
                                        <div class="card-body">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <h4 class="card-title mb-0">Current Month salary</h4>
                                                    <br />
                                                    <p class="card-description">{calculateSalary}</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <h4 class="card-title mb-0">Present days</h4>
                                                    <br />
                                                    <p class="card-description">{presentdays}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <h4 class="card-title mb-0">Absent days</h4>
                                                    <br />
                                                    <p class="card-description">{absentdays}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <button class="btn btn-primary mr-2" onClick={SalaryCalculate} > Hit for salary</button>
                                                    <button class="btn btn-primary mr-2" onClick={AddSalary} > Paid</button>
                                                    <Link to={`/salary_history/${data?._id}`} state={{ data: data }} class="btn btn-primary"> History</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 grid-margin">
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
                                                        {allAttendance?.data?.map((val, index) => {
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

export default AddAttendance