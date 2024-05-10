import React from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useLocation } from 'react-router-dom';
import dateFormat from "dateformat";

const EmployeeLeaveView = () => {

    const location = useLocation();
    const { data } = location.state

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
                                            <div className="tbl-heading">
                                                <h4 class="card-title mb-0">Employee Name</h4>
                                                <p class="card-description">{data?.employeeID?.name}</p>

                                                <h4 class="card-title mb-0">Leaves on date</h4>
                                                <p class="card-description">{dateFormat(`${data?.fromDate}`, "dd/mm/yyyy ")} - {dateFormat(`${data?.tooDate}`, "dd/mm/yyyy ")}</p>

                                                <h4 class="card-title mb-0">Title</h4>
                                                <p class="card-description">{data?.title}</p>

                                                <h4 class="card-title mb-0">Description</h4>
                                                <p class="card-description">{data?.description}</p>
                                                
                                                <h4 class="card-title mb-0">Remark</h4>
                                                <p class="card-description">{data?.remark}</p>
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

export default EmployeeLeaveView