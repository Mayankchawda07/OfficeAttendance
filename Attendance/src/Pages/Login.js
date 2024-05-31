import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const axios = require('axios');

const Login = () => {
    const URL = process.env.REACT_APP_URL;
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

        // Basic validation for email and password fields
        if (!email || !password) {
            alert('Please enter all the fields');
            return;
        }

        try {
            // Sending the login request to the server
            const response = await fetch(`${URL}/LoginEmployee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // Parsing the response
            const res = await response.json();

            if (response.ok) {
                // Check if the expected data is present in the response
                if (res.adminFound && res.adminFound.token && res.admindata && res.admindata._id) {
                    // Storing data in sessionStorage and localStorage
                    sessionStorage.setItem("token", res.adminFound.token);
                    sessionStorage.setItem("name", res.admindata.name);
                    sessionStorage.setItem("id", res.admindata._id);
                    sessionStorage.setItem("loginType", res.admindata.loginType);
                    localStorage.setItem('permission', res.admindata.role.permission);

                    // Navigating to the dashboard
                    navigate("/dashboard");
                } else {
                    // Handle unexpected response format
                    throw new Error("Invalid response data format");
                }
            } else {
                // Handle response errors such as wrong credentials
                alert(res.message || "Login failed");
            }
        } catch (error) {
            // Log the error and show an alert to the user
            console.error("Login error:", error);
            alert("An error occurred during login: " + error.message);
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5 shadow rounded">
                                    <div className="brand-logo text-center">

                                        <img src={require('../images/logo.png')} className='logoLogin' alt="" />
                                    </div>

                                    <form className="pt-3" onSubmit={Submit} >
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Enter e-mail ID" name='email' onChange={handleChange} />
                                        </div>
                                        <div className="form-group position-relative">
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                className="form-control form-control-lg"
                                                id="exampleInputPassword1"
                                                placeholder="Password"
                                                name='password'
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link position-absolute"
                                                style={{ right: "0", top: "0", padding: "17px 10px", color: "#939afd" }}
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ? <i class="fa-solid fa-eye"></i> : <i class="fa-solid fa-eye-slash"></i>}
                                            </button>
                                        </div>
                                        <Link to='/mail_verify'>Forget Password</Link>
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