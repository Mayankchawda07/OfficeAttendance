import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MailVerify = () => {

    const navigate = useNavigate()

    const [mail, setmail] = useState({ email: "" })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setmail({ ...mail, [name]: value });
    };


    // const Submit = async (e) => {
    //     e.preventDefault();
    //     const { email } = mail;

    //     // Basic validation for email and password fields
    //     if (!email) {
    //         alert('Please enter all the fields');
    //         return;
    //     }

    //     try {
    //         // Sending the login request to the server
    //         const response = await fetch(`http://206.189.130.102:3210/api/v1/forgetpassword`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email }),
    //         });

    //         // Parsing the response
    //         const res = await response.json();

    //         if (response.ok) {
    //             alert('OTP sent successfully')
    //             navigate("/Otp_verify");

    //         } else {
    //             // Handle response errors such as wrong credentials
    //             alert(res.message || "Login failed");
    //         }
    //     } catch (error) {
    //         // Log the error and show an alert to the user
    //         console.error("Login error:", error);
    //         alert("An error occurred during login: " + error.message);
    //     }
    // };

    const Submit = async (e) => {
        e.preventDefault();
        const { email } = mail;

        // Basic validation for email field
        if (!email) {
            alert('Please enter the email');
            return;
        }

        try {
            // Sending the request to the server
            const response = await fetch(`http://206.189.130.102:3210/api/v1/forgetpassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            // Parsing the response
            const res = await response.json();

            if (response.ok) {
                // Store adminid in session storage
                localStorage.setItem('employeeid', res.data.adminid);

                alert('OTP sent successfully');
                navigate("/Otp_verify");
            } else {
                // Handle response errors
                alert(res.message || "Request failed");
            }
        } catch (error) {
            // Log the error and show an alert to the user
            console.error("Request error:", error);
            alert("An error occurred: " + error.message);
        }
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

                                    Entered your registered Email ID to recover the password
                                    <form className="pt-3"  >
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder='Enter e-mail ID' name='email' onChange={handleChange} />
                                        </div>

                                        <div className="mt-3">
                                            <button onClick={Submit} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Send OTP</button>
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

export default MailVerify