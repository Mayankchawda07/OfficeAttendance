import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmPassword = () => {
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

                                    <form className="pt-3" >
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"  />
                                        </div>
                                       
                                        <div className="mt-3">
                                            <Link to='/' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</Link>
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