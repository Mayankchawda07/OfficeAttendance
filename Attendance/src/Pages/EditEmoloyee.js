import React, { useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'

const EditEmoloyee = () => {
    const tokenstring = sessionStorage.getItem('token')

  
    const location = useLocation();
    const { data } = location.state
    const navigate = useNavigate();

    const [user, setuser] = useState({ name: data.name, phone: data.phone, email: data.email })


    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, phone, email } = user
        if (!name || !phone || !email) {
            return alert('Please fill all the field prperly')
        }
        const fetchdata = fetch(`http://localhost:3210/api/v1/updateEmployeeByid/${data._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, phone: phone, email: email })
        })
        const response = await fetchdata;
        if (response.status === 200) {
            alert("Update successfully");
            navigate('/employee')
        } else {
            alert("Update Fail.Please Try Again...");
        }
    }
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
                                            <div className="tbl-heading">
                                                <h4 class="card-title mb-0">Edit Product</h4>
                                                <p class="card-description"></p>
                                            </div>
                                            <div className='row'>
                                                <div class="form-group col-md-6">
                                                    <label for="exampleInputUsername1">Employee name</label>
                                                    <input type="text" class="form-control" name='name' value={user.name} onChange={handelChange} />
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="exampleInputEmail1">Phone</label>
                                                    <input type="text" class="form-control" name='phone' value={user.phone} onChange={handelChange} />
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="exampleInputEmail1">Email</label>
                                                    <input type="text" class="form-control" name='email' value={user.email} onChange={handelChange} />
                                                </div>



                                            </div>
                                            <button type="submit" class="btn btn-primary mr-3" onClick={handleSubmit} >Submit</button>
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

export default EditEmoloyee