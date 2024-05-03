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
    const [leave, setleave] = useState({ employeeID: ID, fromDate: '', tooDate: "", title: "", description: "" })
    const [getleves, setgetleves] = useState([])



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
            }
            else if (res.status === 400) {
                alert(response.message);
            }
            else {
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

    const handelChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setleave({ ...leave, [name]: value });
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

    const leaveRequest = async (e) => {
        e.preventDefault();
        const { employeeID, fromDate, tooDate, title, description } = leave;

        if (!employeeID || !fromDate || !tooDate || !title || !description) {
            return alert("Fill all the fields properly");
        }

        try {
            const fetchdata = await fetch(`${URL}/leaves/addleaves`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employeeID, fromDate, tooDate, title, description }),
            });
            const responseData = await fetchdata.json();

            if (fetchdata.status === 200) {
                alert('Leave request sent');
                getleaves();
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

    const getleaves = () => {
        fetch(`${URL}/leaves/getLeaveByEmpID/${ID}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setgetleves(data.data);
                console.log(data.data);
            });
    };



    useEffect(() => {
        getAttendance();
        getleaves();
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
                                                    <div className='mt-3 mb-3 reqbtn'>
                                                        <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#myModal">Request for leave</button>
                                                    </div>
                                                    <div class="table-responsive">
                                                        <table class="table product-tbl border table-hover">
                                                            <thead className='thead-light'>
                                                                <tr>
                                                                    <th>S.No.</th>
                                                                    <th>Title</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {getleves?.map((val, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td>{val?.title}</td>
                                                                            <td>
                                                                                {val?.status} <br />
                                                                                {val?.remark}
                                                                            </td>
                                                                        </tr >
                                                                    )
                                                                    console.log(getleves)
                                                                })}

                                                            </tbody>
                                                        </table>
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
                                                        {attendance?.data?.map((val, index) => {
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







            {/* <!-- The Modal --> */}
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h4 class="modal-title">Request for leaves</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            <div className="row">
                                <div class="form-group col-md-6">
                                    <label for="exampleInputUsername1">From date</label>
                                    <input type="date" class="form-control" name='fromDate' placeholder='Enter Employee Name' value={leave.fromDate} onChange={handelChange} />
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleInputPassword1">Too date</label>
                                    <input type="date" class="form-control" min="0" name='tooDate' placeholder='Enter phone No.' value={leave.tooDate} onChange={handelChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col-md-12">
                                    <label for="exampleInputUsername1">Title</label>
                                    <input type="text" class="form-control" name='title' placeholder='Enter Employee Name' value={leave.title} onChange={handelChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col-md-12">
                                    <label for="exampleInputUsername1">Description</label>
                                    <textarea name="description" cols="30" rows="10" class="form-control" value={leave.description} onChange={handelChange}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={leaveRequest}>Send</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Attendance