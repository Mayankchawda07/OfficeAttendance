import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

const AddEmployee = () => {
    const tokenstring = sessionStorage.getItem('token')
    const URL = process.env.REACT_APP_URL;

    const navigate = useNavigate();

    const [data, setData] = useState({ name: '', phone: '', email: '', password: '', salary: '', designation: '', gender: '', DOB: '', role: '', loginType: '' });
    const [role, setrole] = useState('')

    const handelChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const getRole = () => {
        fetch(`http://206.189.130.102:3210/api/v1/role/getAllRoles`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setrole(data);
            });
    };

    const Submit = async (e) => {
        e.preventDefault();
        const { name, phone, email, password, salary, designation, gender, DOB, role, loginType } = data;
        if (!name || !phone || !email || !password || !salary || !designation || !gender || !DOB || !role || !loginType) {
            return alert('Please fill all the field prperly')
        }
        const fetchdata = fetch(`${URL}/AddEmployee`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, phone: phone, email: email, password: password, salary: salary, designation: designation, gender: gender, DOB: DOB, role: role, loginType: loginType }),
            });
        const response = await fetchdata;
        const responseData = await response.json();
        if (response.status === 200) {
            alert('Registered successfully')
            navigate("/employee");
        } else {
            console.error("Error:", responseData);
            alert("Error:", responseData);
        }
    };

    useEffect(() => {
        getRole();
    },[])


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
                                            <h4 class="card-title">Add Employee</h4>
                                            <p class="card-description"></p>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Employee Name</label>
                                                    <input type="text" class="form-control" name='name' placeholder='Enter Employee Name' value={data.name} onChange={handelChange} maxLength="30" />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Phone</label>
                                                    <input type="number" class="form-control" min="0" name='phone' placeholder='Enter phone No.' value={data.phone} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Email</label>
                                                    <input type="email" class="form-control" min="0" name='email' placeholder='Enter email' value={data.email} onChange={handelChange} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Password</label>
                                                    <input type="text" class="form-control" name='password' placeholder='Enter password' value={data.password} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Salary</label>
                                                    <input type="number" class="form-control" min="0" name='salary' placeholder='Enter salary' value={data.salary} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Designation</label>
                                                    <input type="email" class="form-control" min="0" name='designation' placeholder='Enter designation' value={data.designation} onChange={handelChange} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Gender</label>
                                                    <select name="gender" id="" className='form-control' value={data.gender} onChange={handelChange}>
                                                        <option >Please select gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="frmale">Female</option>

                                                    </select>
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Date of birth</label>
                                                    <input type="date" class="form-control" min="0" name='DOB' value={data.DOB} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Role</label>
                                                    <select name="role" id="" className='form-control' value={data.role} onChange={handelChange}>
                                                        <option value="" disabled selected hidden>Select Role</option>
                                                        {role?.data?.map((val, index) => (
                                                            <option value={val._id} key={index}>
                                                                {val.name}
                                                            </option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputUsername1">Log-in Type</label>
                                                    <input type="email" class="form-control" min="0" name='loginType' placeholder='Enter Log-in Type' value={data.loginType} onChange={handelChange} />
                                                </div>

                                                {/* <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Phone</label>
                                                    <input type="number" class="form-control" min="0" name='phone' placeholder='Enter phone No.' value={data.phone} onChange={handelChange} />
                                                </div>

                                                <div class="form-group col-md-4">
                                                    <label for="exampleInputPassword1">Email</label>
                                                    <input type="email" class="form-control" min="0" name='email' placeholder='Enter email' value={data.email} onChange={handelChange} />
                                                </div> */}
                                            </div>
                                            <button type="submit" class="btn btn-primary me-2" onClick={Submit} >Submit</button>

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

export default AddEmployee