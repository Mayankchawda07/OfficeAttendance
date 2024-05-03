import React, { useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useLocation, useNavigate } from 'react-router-dom'

const LeaveView = () => {

    const location = useLocation();
    const { data } = location.state
    const navigate = useNavigate();

    const [update, setupdate] = useState({ status: '', remark: '' })

    const handelChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setupdate({ ...data, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();
        const { status, remark } = data;

        const fetchdata = fetch(`http://localhost:3210/api/v1/leaves/updateLeave/${data._id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: status, remark: remark }),
            });
        const response = await fetchdata;
        const responseData = await response.json();
        if (response.status === 200) {
            alert('Registered successfully')
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
                                                        <h4 class="card-title mb-0">Title</h4>
                                                        <p class="card-description">{data?.title}</p>

                                                        <h4 class="card-title mb-0">Description</h4>
                                                        <p class="card-description">{data?.description}</p>
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
                                                    <select name="status" id="" className='form-control' value={update.status} onChange={handelChange}>
                                                        <option>{data?.status}</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>

                                                    {update.status === 'Rejected' && (
                                                        <div>
                                                            <label htmlFor="exampleInputUsername1" className='mt-3'>Remark</label>
                                                            <textarea name="remark" id="" cols="30" rows="8" className='form-control' value={update.remark} onChange={handelChange}></textarea>
                                                        </div>
                                                    )}

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