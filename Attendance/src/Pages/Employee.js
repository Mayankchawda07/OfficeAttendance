import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { Link } from 'react-router-dom'
import Login from './Login'

const Employee = () => {

    const tokenstring = sessionStorage.getItem('token')

    const [employee, setemployee] = useState('')


    const getEmployee = () => {
        fetch('http://localhost:3210/api/v1/getEmployee')
            .then((res) => {
                return res.json();
            }).then((data) => {
                setemployee(data)
            })
    }

    useEffect(() => {
        getEmployee();
    }, []);
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
                                            <div className="tbl-heading sapce mb-2">
                                                <h4 class="card-title mb-0">
                                                    Employee
                                                </h4>
                                                <p class="card-description"></p>
                                                <div className="addbtn">
                                                    <Link
                                                        type="button"
                                                        class="btn btn-outline-success mr-3"
                                                        to="/add_employee"
                                                    >
                                                        Add Employee
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Employee Name</th>
                                                            <th>Phone No.</th>
                                                            <th>E-Mail</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {employee?.data?.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
                                                                    <td>{val?.name}</td>
                                                                    <td>{val?.phone}</td>
                                                                    <td>{val?.email}</td>
                                                                    <td>
                                                                        <Link
                                                                            to={`/add_attendance/${val?._id}`}
                                                                            state={{ data: val }}
                                                                            type="button"
                                                                            class="btn btn-outline-info mr-2"
                                                                        >
                                                                            Attendace
                                                                        </Link>
                                                                        <Link
                                                                            to={`/edit_employee/${val?._id}`}
                                                                            state={{ data: val }}
                                                                            type="button"
                                                                            class="btn btn-outline-info mr-2"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                    </td>
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

export default Employee