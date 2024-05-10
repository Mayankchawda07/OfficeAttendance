import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'

const EditEmoloyee = () => {
    const tokenstring = sessionStorage.getItem('token')
    const URL = process.env.REACT_APP_URL;


    const location = useLocation();
    const { data } = location.state
    const navigate = useNavigate();

    const [user, setuser] = useState({ name: data.name, phone: data.phone, email: data.email, salary: data.salary, designation: data.designation, gender: data.gender, DOB: data.DOB, role: data.role, loginType: data.loginType, password: data.password })
    const [role, setrole] = useState('')


    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, phone, email, salary, designation, gender, DOB, role, loginType, password } = user
        if (!name || !phone || !email || !salary || !designation || !gender || !DOB || !role || !loginType || !password) {
            return alert('Please fill all the field prperly')
        }
        const fetchdata = fetch(`${URL}/updateEmployeeByid/${data._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, phone: phone, email: email, salary: salary, designation: designation, gender: gender, DOB: DOB, role: role, loginType: loginType, password: password })
        })
        const response = await fetchdata;
        if (response.status === 200) {
            alert("Update successfully");
            navigate('/employee')
        } else {
            alert("Update Fail.Please Try Again...");
        }
    }

    const getRole = () => {
        fetch(`${URL}/role/getAllRoles`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setrole(data);
            });
    };

    useEffect(() => {
        getRole();
    }, [])

    const isoDate = new Date(user.DOB);
    const formattedDate = isoDate.toISOString().split('T')[0];


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
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Employee Name</label>
                                                    <input type="text" class="form-control" name='name' placeholder='Enter Employee Name' value={user.name} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Phone</label>
                                                    <input type="number" class="form-control" min="0" name='phone' placeholder='Enter phone No.' value={user.phone} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Email</label>
                                                    <input type="email" class="form-control" min="0" name='email' placeholder='Enter email' value={user.email} onChange={handelChange} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Password</label>
                                                    <input type="email" class="form-control" min="0" name='password' placeholder='Enter Log-in Type' value={user.password} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Salary</label>
                                                    <input type="number" class="form-control" min="0" name='salary' placeholder='Enter salary' value={user.salary} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Designation</label>
                                                    <input type="email" class="form-control" min="0" name='designation' placeholder='Enter designation' value={user.designation} onChange={handelChange} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Gender</label>
                                                    <select name="gender" id="" className='form-control' value={user.gender} onChange={handelChange}>
                                                        <option >Please select gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="frmale">Female</option>

                                                    </select>
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Date of birth</label>
                                                    <input type="date" class="form-control" min="0" name='DOB' value={formattedDate} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Role </label>
                                                    <select name="role" id="" className='form-control' onChange={handelChange}>
                                                        <option value="" >Select Role</option>
                                                        {role?.data?.map((val, index) => (
                                                            <option value={val._id} key={index} selected={val._id === user.role._id ? 'selected' : null}>
                                                                {val.name}
                                                            </option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Log-in Type</label>
                                                    <input type="email" class="form-control" min="0" name='loginType' placeholder='Enter Log-in Type' value={user.loginType} onChange={handelChange} />
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