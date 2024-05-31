import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { Link } from 'react-router-dom'
import dateFormat from "dateformat";

const Leave = () => {


    const [leaves, setleaves] = useState([])
    const [update, setupdate] = useState({ status: 'Pending' })

    const getAllleaves = () => {
        fetch(`http://206.189.130.102:3210/api/v1/leaves/getAllLeaves`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                setleaves(data?.data)
            })
    }





    useEffect(() => {
        getAllleaves();
    }, [])


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
                                                    Leave requests
                                                </h4>
                                                <p class="card-description"></p>
                                                <div className="addbtn">
                                                    {/* <Link
                                                        type="button"
                                                        class="btn btn-outline-success mr-3"
                                                        to="/add_employee"
                                                    >
                                                        Add Employee
                                                    </Link> */}
                                                </div>
                                            </div>
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Employee Name</th>
                                                            <th>Apply date</th>
                                                            <th>Title</th>
                                                            <th>From to To date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {leaves?.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
                                                                    <td>{val?.employeeID?.name}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{val?.title}</td>
                                                                    <td>{dateFormat(`${val?.fromDate}`, "dd/mm/yyyy ")} - {dateFormat(`${val?.tooDate}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{val?.status}</td>
                                                                    <td>
                                                                        <Link
                                                                            to={`/leaveview/${val?._id}`}
                                                                            state={{ data: val }}
                                                                            type="button"
                                                                            class="btn btn-outline-info mr-2"
                                                                        >
                                                                            View
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

export default Leave