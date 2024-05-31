import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import Login from './Login'
import dateFormat from "dateformat";
import Calendar from "react-calendar";

const Attendance = () => {
    const tokenstring = sessionStorage.getItem('token')
    const ID = sessionStorage.getItem('id')
    const URL = process.env.REACT_APP_URL;

    const [data, setdata] = useState({ employeeID: ID, attend: '1' })
    const [attendance, setattendance] = useState('')




    const AttendanceIn = async (e) => {
        e.preventDefault();
        const { employeeID, attend } = data; // Assuming data is accessible here
        const login = new Date(); // Assuming login time should be current time

        if (!employeeID) {
            return alert("Employee Not Found");
        }

        try {
            const fetchdata = await fetch(`${URL}/attendance/addAttendance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employeeID: ID, attend: '1', login }),
            });
            const responseData = await fetchdata.json();

            if (fetchdata.status === 200) {
                alert('Attendance marked');
                getAttendance(); // Assuming this function fetches updated attendance
            }
            else {
                console.error("Error:", responseData);
                alert("Error: " + responseData.message); // Display error message from API
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message); // Display network or unexpected error
        }
    };

    // const AttendanceOut = async () => {
    //     try {
    //         const res = await fetch(
    //             `${URL}/attendance/updateAttendance/${ID}`,
    //             {
    //                 method: "PUT",
    //                 headers: {
    //                     Accept: "application/json",
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({}),
    //             }
    //         );
    //         const response = await res.json();

    //         if (res.status === 200) {
    //             alert("Attendance Time Out");
    //             getAttendance(); // Assuming getAttendance() fetches updated attendance
    //         }
    //         else if (res.status === 400) {
    //             alert(response.message);
    //         }
    //         else {
    //             alert("Something went wrong");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("Something went wrong");
    //     }
    // };


    const AttendanceOut = async () => {
        try {
            const res = await fetch(
                `${URL}/attendance/updateAttendance/${ID}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                }
            );
            const response = await res.json();

            if (res.status === 200) {
                alert("Attendance Time Out");
                getAttendance(); // Assuming getAttendance() fetches updated attendance
            } else if (res.status === 400) {
                alert(response.message);
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };



    const getAttendance = () => {
        fetch(`${URL}/attendance/getAttendanceByEmpID/${ID}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setattendance(data);
            });
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);

    const Date_Click_Fun = (date) => {
        setSelectedDate(date);
        alert(date)

    };



    // const leaveRequest = async (e) => {
    //     e.preventDefault();
    //     const { employeeID, fromDate, tooDate, title, description } = data; 

    //     if (!employeeID) {
    //         return alert("Employee Not Found");
    //     }

    //     try {
    //         const fetchdata = await fetch(`${URL}/leaves/addleaves`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ employeeID: ID, fromDate: fromDate, tooDate: tooDate, title: title, description: description }),
    //         });
    //         const responseData = await fetchdata.json();

    //         if (fetchdata.status === 200) {
    //             alert('Leave request sent');
    //         }
    //         else {
    //             console.error("Error:", responseData);
    //             alert("Error: " + responseData.message); // Display error message from API
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("Error: " + error.message); // Display network or unexpected error
    //     }
    // };






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
                                    <div className='row'>
                                        <div class="col-md-6 grid-margin transparent">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div className='btncontain'>
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-success mr-3"
                                                            onClick={AttendanceIn}
                                                        >
                                                            Time-In
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-danger mr-3"
                                                            onClick={AttendanceOut}
                                                        >
                                                            Time-Out
                                                        </button>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6 grid-margin transparent">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div className="calendar-container ">
                                                        <Calendar
                                                            value={selectedDate}
                                                            onClickDay={Date_Click_Fun}
                                                            tileClassName={({ date }) =>
                                                                selectedDate &&
                                                                    date.toDateString() === selectedDate.toDateString()
                                                                    ? "selected"
                                                                    : events.some(
                                                                        (event) =>
                                                                            event.date.toDateString() ===
                                                                            date.toDateString(),
                                                                    )
                                                                        ? "event-marked"
                                                                        : ""
                                                            }
                                                        />{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>





                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Date</th>
                                                            <th>Time-In</th>
                                                            <th>Time-Out</th>
                                                            <th>Total time Diffrence</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {attendance?.data?.map((val, index) => {
                                                            // Convert login and logout timestamps to Date objects
                                                            const loginTimeUTC = new Date(val?.login);
                                                            const logoutTimeUTC = new Date(val?.logout);

                                                            // Convert login and logout timestamps to IST time string (hh:mm:ss format)
                                                            const loginTimeIST = loginTimeUTC.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
                                                            const logoutTimeIST = logoutTimeUTC.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });

                                                            // Calculate the time difference in milliseconds
                                                            const timeDifferenceMillis = logoutTimeUTC - loginTimeUTC;

                                                            // Convert the time difference to hours, minutes, and seconds
                                                            const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
                                                            const minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));
                                                            const seconds = Math.floor((timeDifferenceMillis % (1000 * 60)) / 1000);
                                                            return (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{loginTimeIST}</td>
                                                                    <td>{logoutTimeIST}</td>
                                                                    <td>{`${hours} Hr, ${minutes} min`}</td>

                                                                </tr >
                                                            )
                                                        })} */}
                                                        {attendance?.data?.map((val, index) => {
                                                            // Convert login and logout timestamps to Date objects
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
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{loginTimeIST}</td>
                                                                    <td>{logoutTimeIST}</td>
                                                                    <td>{totalTimeDifference}</td>
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

export default Attendance