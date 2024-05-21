import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const OtpVerify = () => {

    const navigate = useNavigate()
    const id = sessionStorage.getItem('adminid')

    
    const [otpnumber, setOtpnumber] = useState({
        one: "",
        two: "",
        three: "",
        four: "",
    });

    const handleChangeOtp = (e) => {
        const { name, value } = e.target;

        // Ensure the input value is a single digit number
        if (/^\d*$/.test(value) && value.length <= 1) {
            setOtpnumber({
                ...otpnumber,
                [name]: value,
            });

            // Automatically move focus to the next input field
            if (value && e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
            }
        }
    };

    const onSubmit_Verify_otp = async (e) => {
        e.preventDefault();

        try {
            const otp1 = `${otpnumber.one}${otpnumber.two}${otpnumber.three}${otpnumber.four}`;

            const userData5 = {
                adminid: id,
                otp: otp1,
            };
            const add = await axios.post(`http://206.189.130.102:3210/api/v1/verifyotp`, userData5);
            if (add.status === 200) {
                alert('OTP Verify')
                navigate("/confirm_password")
            }
        } catch (error) {
            console.error("Verify error:", error);
            alert("An error occurred during verification: " + error.message);
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
                                    <div className="brand-logo text-center">

                                        <img src={require('../images/logo.png')} className='logoLogin' alt="" />
                                    </div>


                                    <form className="pt-3" onSubmit={onSubmit_Verify_otp}>
                                        <div className="form-group">
                                            {/* otp */}
                                            <div className="otp-input-field">
                                                <input
                                                    type="number"
                                                    name="one"
                                                    maxLength={1}
                                                    value={otpnumber.one}
                                                    onChange={handleChangeOtp}
                                                />
                                                <input
                                                    type="number"
                                                    name="two"
                                                    maxLength={1}
                                                    value={otpnumber.two}
                                                    onChange={handleChangeOtp}
                                                />
                                                <input
                                                    type="number"
                                                    name="three"
                                                    maxLength={1}
                                                    value={otpnumber.three}
                                                    onChange={handleChangeOtp}
                                                />
                                                <input
                                                    type="number"
                                                    name="four"
                                                    maxLength={1}
                                                    value={otpnumber.four}
                                                    onChange={handleChangeOtp}
                                                />
                                            </div>
                                        </div>

                                        {/* <div className="my-2 mt-3 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <Link className="auth-link text-black">
                                                    Didn't received verification OTP?  <Link className="text-primary" >
                                                        Resend again
                                                    </Link>
                                                </Link>
                                            </div>
                                            <Link className="auth-link text-black">
                                                <Link className="text-primary" >
                                                    Login Here
                                                </Link>
                                            </Link>
                                        </div> */}

                                        <div className="mt-5">
                                            <button
                                                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                                type="submit"
                                            >
                                                Verify OTP
                                            </button>
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

export default OtpVerify