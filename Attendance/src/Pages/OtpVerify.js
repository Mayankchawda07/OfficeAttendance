import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const OtpVerify = () => {

    const navigate = useNavigate()
    const employeeid = localStorage.getItem('employeeid');

    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");

    const otpInputs = [useRef(), useRef(), useRef(), useRef()];

    const handleOtpChange = (index, value) => {
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].current.focus();
        }
    };

    // const onSubmit_Verify_otp = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const otp1 = `${otpnumber.one}${otpnumber.two}${otpnumber.three}${otpnumber.four}`;

    //         const userData5 = {
    //             adminid: id,
    //             otp: otp1,
    //         };
    //         const add = await axios.post(`http://206.189.130.102:3210/api/v1/verifyotp`, userData5);
    //         if (add.status === 200) {
    //             alert('OTP Verify')
    //             navigate("/confirm_password")
    //         }
    //     } catch (error) {
    //         console.error("Verify error:", error);
    //         alert("An error occurred during verification: " + error.message);
    //     }
    // };

    const handleSubmitAddEvent = (e) => {
        e.preventDefault();
        const otp = otp1 + otp2 + otp3 + otp4;
        const myurl = "http://206.189.130.102:3210/api/v1/verifyotp";
        var bodyFormData = new URLSearchParams();

        bodyFormData.append('otp', otp);
        bodyFormData.append('employeeid', employeeid);


        axios({
            method: "post",
            url: myurl,
            data: bodyFormData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then((response) => {
            sessionStorage.setItem('userid', response?.userid);
            if (response.data === '' || response.data.re === 'false') {
                window.alert('Please Enter Correct OTP')
            } else {
                alert('OTP matched')
                navigate('/confirm_password');
            }

            console.log(response)
        }).catch((error) => {
            console.log("Errors", error);

        })

    }


    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        if (pasteData.length === 4 && /^\d+$/.test(pasteData)) {
            setOtp1(pasteData[0]);
            setOtp2(pasteData[1]);
            setOtp3(pasteData[2]);
            setOtp4(pasteData[3]);
            otpInputs[0].current.focus();
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


                                    <form className="pt-3" onSubmit={handleSubmitAddEvent} onPaste={handlePaste}>
                                        <div className="form-group">
                                            {/* otp */}
                                            <div className="otp-input-field">
                                                <input
                                                    type="number"
                                                    name="one"
                                                    maxLength={1}
                                                    value={otp1}
                                                    onChange={(e) => {
                                                        setOtp1(e.target.value);
                                                        handleOtpChange(0, e.target.value);
                                                    }}
                                                    ref={otpInputs[0]}
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    name="two"
                                                    maxLength={1}
                                                    value={otp2}
                                                    onChange={(e) => {
                                                        setOtp2(e.target.value);
                                                        handleOtpChange(1, e.target.value);
                                                    }}
                                                    ref={otpInputs[1]}
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    name="three"
                                                    maxLength={1}
                                                    value={otp3}
                                                    onChange={(e) => {
                                                        setOtp3(e.target.value);
                                                        handleOtpChange(2, e.target.value);
                                                    }}
                                                    ref={otpInputs[2]}
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    name="four"
                                                    maxLength={1}
                                                    value={otp4}
                                                    onChange={(e) => {
                                                        setOtp4(e.target.value);
                                                        handleOtpChange(3, e.target.value);
                                                    }}
                                                    ref={otpInputs[3]}
                                                    required
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