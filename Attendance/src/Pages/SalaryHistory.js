import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useLocation } from 'react-router-dom'
import dateFormat from "dateformat";

const SalaryHistory = () => {

    const location = useLocation();
    const { data } = location.state

    const [employeesalary, setemployeesalary] = useState('')

    const getsalarybyempID = () => {
        fetch(`http://206.189.130.102:3210/api/v1/salary/getSalaryByEmpID/${data._id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setemployeesalary(data);
            });
    };
    useEffect(() => {
        getsalarybyempID();
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
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Employee Name</th>
                                                            <th>Date of Salary paid</th>
                                                            <th>Salary</th>
                                                            <th>Month of salary</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {employeesalary?.data?.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
                                                                    <td>{val?.employeeID?.name}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{val?.salary}</td>
                                                                    <td>{val?.salaryOfMonth}</td>
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

export default SalaryHistory