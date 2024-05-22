import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const ConfirmPassword = () => {

    const navigate = useNavigate()
    const employeeid = localStorage.getItem('employeeid');

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [values2, setValues2] = useState({
        newpassword: "",
        reenternewpassword: "",
    });


    const handleChange2 = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues2({ ...values2, [name]: value });
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const { reenternewpassword, newpassword } = values2;

        if (!newpassword || !reenternewpassword) {
            alert("All Fields Required");
            return;
        }
        if (newpassword == reenternewpassword) {
            AddNewPassword();
        } else {
            alert("Password Not Match");
            return;
        }
    };

    const AddNewPassword = async () => {
        try {
            const add = await axios.post(
                `http://206.189.130.102:3210/api/v1/updatepassword`,
                { id: employeeid, newpassword: values2.newpassword }
            );
            if (add.status === 200) {
                alert("Passsword Updated Successfully");
                navigate("/");
            }
        } catch (error) {
            alert("Details Not Match...");
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

                                    <form className="pt-3" onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <span className="position-relative">
                                                <input
                                                    type={showPassword1 ? 'text' : 'password'}
                                                    className="form-control form-control-lg"
                                                    id="exampleInputPassword4"
                                                    placeholder="New Password"
                                                    name="newpassword"
                                                    value={values2.newpassword}
                                                    onChange={handleChange2}
                                                />

                                                <i className={`fa-solid ${showPassword1 ? 'fa-eye-slash' : 'fa-eye'} menu-icon input-eyeicon`} onClick={togglePasswordVisibility1}></i>
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type={showPassword2 ? 'text' : 'password'}
                                                className="form-control form-control-lg"
                                                id="exampleInputPassword5"
                                                placeholder="Reenter Password"
                                                name="reenternewpassword"
                                                value={values2.reenternewpassword}
                                                onChange={handleChange2}
                                            />
                                            <i className={`fa-solid ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'} menu-icon input-eyeicon`} onClick={togglePasswordVisibility2}></i>
                                        </div>

                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Update Password</button>
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

export default ConfirmPassword