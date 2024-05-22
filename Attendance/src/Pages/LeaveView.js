import React, { useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useLocation, useNavigate } from 'react-router-dom'
import dateFormat from "dateformat";

const LeaveView = () => {

    const location = useLocation();
    const { data } = location.state
    const navigate = useNavigate();

    const [remark, setremark] = useState('')
    const [status, setstatus] = useState('')

    const [showloader, setShowLoader] = useState("none");


    const handelChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        setremark(value);
    };

    const handelChanges = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (value === "Rejected") {
            setShowLoader('block')
        }
        setstatus(value);
    };

    const Submit = async (e) => {
        e.preventDefault();


        const fetchdata = fetch(`http://206.189.130.102:3210/api/v1/leaves/updateLeave/${data._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, remark }),
            });
        const response = await fetchdata;
        const responseData = await response.json();
        if (response.status === 200) {
            alert('Leave Updated')
            setShowLoader("none");
            navigate("/leave");
        } else {
            console.error("Error:", responseData);
            alert("Error:", responseData);
        }
    };



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
                                                    <div className="tbl-heading">
                                                        <h4 class="card-title mb-0">Employee Name</h4>
                                                        <p class="card-description">{data?.employeeID?.name}</p>

                                                        <h4 class="card-title mb-0">Leave request date</h4>
                                                        <p class="card-description">{dateFormat(`${data?.createdAt}`, "dd/mm/yyyy ")}</p>

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
                                        <div class="col-md-6 grid-margin transparent">
                                            <div class="card">
                                                {/* <div class="card-body">
                                                    <label for="exampleInputUsername1">Grant Leave </label>
                                                    <select name="status" id="" className='form-control' value={update.status} onChange={handelChange} >
                                                        <option >{data?.status}</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                    <label for="exampleInputUsername1" className='mt-3'>Remark</label>
                                                    <textarea name="remark" id="" cols="30" rows="8" className='form-control' value={update.remark} onChange={handelChange} ></textarea>
                                                    <br />
                                                    <button type="submit" class="btn btn-primary me-2" onClick={Submit} >Submit</button>

                                                </div> */}
                                                <div className="card-body">
                                                    <label htmlFor="exampleInputUsername1">Grant Leave</label>
                                                    <select name="status" id="" className='form-control' value={status} onChange={handelChanges} >
                                                        <option>{data?.status}</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>

                                                    <div className="loader-container " style={{ display: showloader }}>
                                                        <div>
                                                            <label htmlFor="exampleInputUsername1" className='mt-3'>Remark</label>
                                                            <textarea name="remark" id="" cols="30" rows="8" className='form-control' value={remark} onChange={handelChange}></textarea>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <button type="submit" className="btn btn-primary me-2" onClick={Submit}>Submit</button>
                                                </div>

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

export default LeaveView