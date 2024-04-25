import React, { useEffect, useState } from 'react'
import Sidenav from '../Template/Sidenav'
import Header from '../Template/Header'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import dateFormat from "dateformat";
import Login from './Login'


const AddAttendance = () => {
    const tokenstring = sessionStorage.getItem('token')

    
    const location = useLocation();
    const { data } = location.state

    const [attendance, setattendance] = useState({ employeeID: data._id, attend: 1 })
    const [getattendance, setgetattendance] = useState('')

    const handelChange = (e) => {
        const { name, value } = e.target;
        setattendance({ ...attendance, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                'http://localhost:3210/api/v1/attendance/addAttendance',
                { employeeID: data._id, attend: attendance.attend }, // Change this line
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status === 400) {
                alert('Your Attendance Already marked ');
            }
            if (response.status === 200) {
                alert('Your Attendance marked Successfully');
            }
            //  else {
            //     console.error('Error:', "Already marked");
            //     alert('Error:',  "Already marked");
            // }
        } catch (error) {
            console.error('Error:', "Already marked");
            alert('Error:', "Already marked");
        }
    };

    const getEmployeeAttendance = () => {
        fetch(`http://localhost:3210/api/v1/attendance/getAttendanceByEmpID/${data._id}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                setgetattendance(data)
                console.log(data)
            })
    }
    useEffect(() => {
        getEmployeeAttendance();
    }, )

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
                                                <div className="col-md-4">
                                                    <label for="exampleInputUsername1">Employee Name</label>
                                                    <input type="text" class="form-control" name='name' placeholder='Enter Employee Name' value={data?.name} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label for="exampleInputUsername1">Attendance</label>
                                                    <select name="attend" id="" class="form-control" >
                                                        <option >Please marke your attendance</option>
                                                        <option value="0">Absent</option>
                                                        <option value="1">Present</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-4">
                                                    <button type="button" class="btn btn-outline-success" onClick={Submit}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 grid-margin">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Date</th>
                                                            <th>Attendance</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {getattendance?.data?.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
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