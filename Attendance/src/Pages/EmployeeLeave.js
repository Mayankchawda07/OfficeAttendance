import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import dateFormat from "dateformat";
import { Link } from 'react-router-dom';

const EmployeeLeave = () => {

    const ID = sessionStorage.getItem('id')

    const [leave, setleave] = useState({ employeeID: ID, fromDate: '', tooDate: "", title: "", description: "" })
    const [getleves, setgetleves] = useState([])


    const handelChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setleave({ ...leave, [name]: value });
    };

    const leaveRequest = async (e) => {
        e.preventDefault();
        const { employeeID, fromDate, tooDate, title, description } = leave;

        if (!employeeID || !fromDate || !tooDate || !title || !description) {
            return alert("Fill all the fields properly");
        }

        try {
            const fetchdata = await fetch(`http://206.189.130.102:3210/api/v1/leaves/addleaves`, {
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
        fetch(`http://206.189.130.102:3210/api/v1/leaves/getLeaveByEmpID/${ID}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setgetleves(data.data);
                console.log(data.data);
            });
    };

    useEffect(() => {
        getleaves();
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
                                                    Employee
                                                </h4>
                                                <p class="card-description"></p>
                                                <div className="addbtn">
                                                    <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#myModal">Request for leave</button>
                                                </div>
                                            </div>
                                            <div class="table-responsive rounded">
                                                <table class="table product-tbl border table-hover">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Leave applied date</th>
                                                            <th>Leave response date</th>
                                                            <th>Status</th>
                                                            <th>Remark</th>
                                                            <th>Action</th>
                                                           
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {getleves?.map((val, index) => {
                                                            return (
                                                                <tr>
                                                                    <td class="py-1">{index + 1}</td>
                                                                    <td>{dateFormat(`${val?.createdAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{dateFormat(`${val?.updatedAt}`, "dd/mm/yyyy ")}</td>
                                                                    <td>{val?.status}</td>
                                                                    <td>{val?.status === "pending" ? "Pending" : val?.remark || "Approved"}</td>
                                                                    <td>
                                                                        <Link
                                                                            to={`/employee_leave_view/${val?._id}`}
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
                                    <input type="date" class="form-control" name='fromDate' placeholder='Enter Employee Name' value={leave.fromDate} onChange={handelChange} onKeyDown={(e) => e.preventDefault()}/>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleInputPassword1">Too date</label>
                                    <input type="date" class="form-control" min="0" name='tooDate' placeholder='Enter phone No.' value={leave.tooDate} onChange={handelChange} onKeyDown={(e) => e.preventDefault()}/>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col-md-12">
                                    <label for="exampleInputUsername1">Title</label>
                                    <input type="text" class="form-control" name='title' placeholder='Enter title of leave' value={leave.title} onChange={handelChange} maxLength='100'/>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col-md-12">
                                    <label for="exampleInputUsername1">Description</label>
                                    <textarea name="description" cols="30" rows="10" class="form-control" value={leave.description} onChange={handelChange} placeholder='Description...'></textarea>
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

export default EmployeeLeave