import React, { useEffect, useState } from 'react'
import Sidenav from '../Template/Sidenav'
import Header from '../Template/Header'
import dateFormat from "dateformat";
import Login from './Login'


const AddAttendance = () => {
    const tokenstring = sessionStorage.getItem('token')
    const URL = process.env.REACT_APP_URL;

    const [allAttendance, setallAttendance] = useState('')



    // const getAttendance = () => {
    //     fetch(`http://localhost:3210/api/v1/attendance/getAttendanceByEmpID/${ID}`)
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setattendance(data);
    //         });
    // };

    const getAllAttendance = () => {
        const currentDate = new Date();
        const formattedDate = dateFormat(currentDate, "yyyy-mm-dd");

        fetch(`${URL}/attendance/getAllAttendance?date=${formattedDate}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                setallAttendance(data);
            })
    }




    useEffect(() => {
        getAllAttendance();
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
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Employee Name</th>
                                                            <th>Date</th>
                                                            <th>Attendance</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allAttendance?.data?.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
                                                                    <td>{val?.employeeID?.name}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
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