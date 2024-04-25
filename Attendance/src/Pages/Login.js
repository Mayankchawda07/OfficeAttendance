import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const axios = require('axios');

const Login = () => {

    const [data, setData] = useState({ email: "", password: "" });

    const navigate = useNavigate()


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };



    const Submit = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        if (!email || !password) {
            alert('Please enter all the fields');
            return;
        }

        try {
            const response = await fetch("http://localhost:3210/api/v1/LoginEmployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const res = await response.json();

            // Use the response data as needed
            console.log(res.admindata._id);

            console.log(res.data);
            sessionStorage.setItem("token", res.adminFound.token);
            sessionStorage.setItem("id", res.admindata._id);
            sessionStorage.setItem("loginType", res.admindata.loginType);

            localStorage.setItem('permission', res.admindata.permission);

            navigate("/dashboard");
            // Send POST request using Axios

            // if (response.ok) {

            //     // if (res.token && res.admindata._id && res.admindata.loginType) {

            //     // } else {
            //     //     throw new Error("Invalid response data format");
            //     // }
            // } else {
            //     throw new Error("Invalid response status: " + response.status);
            // }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message);
        }
    };


    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        {/* <img src={require('../Images/imgpsh_fullsize_anim__1_-removebg-preview.png')} alt="LOGO" className='logo loginlogo' /> */}
                                        LOGO
                                    </div>
                                    {/* <h6 className="font-weight-light">Sign in to continue.</h6> */}
                                    <form className="pt-3" onSubmit={Submit} >
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" name='email' onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" name='password' onChange={handleChange} />
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Login