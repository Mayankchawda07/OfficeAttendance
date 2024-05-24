import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidenav from '../Template/Sidenav'

const Header = () => {

    const permissionget = localStorage.getItem("permission");
    const loginstring = sessionStorage.getItem('loginType')

    const x = permissionget;
    const y = loginstring
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear();
        navigate('/')
    }

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo mr-5" to="/dashboard">
                        <img src={require('../images/logo.png')} className='logom' alt="" />
                    </Link>
                    <Link className="navbar-brand brand-logo-mini" to="/dashboard">
                        <img src={require('../images/logo.png')} className='logom' alt="" />
                    </Link>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <ul className="navbar-nav navbar-nav-right"></ul>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><span className="icon-menu"></span></button>
                    </div>
                </div>
            </nav>

            <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <nav className="sidebar w-100" id="sidebar">
                        <ul className="nav m-0">
                            {x.includes('1') ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        <i className="icon-grid menu-icon"></i>
                                        <span className="menu-title">Dashboard</span>
                                    </Link>
                                </li>
                            ) : ('')}
                            {x.includes('2') ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee">
                                        <i className="icon-cog menu-icon"></i>
                                        <span className="menu-title">Employee</span>
                                    </Link>
                                </li>
                            ) : ('')}
                            {x.includes('3') ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/attendance">
                                        <i className="icon-image menu-icon"></i>
                                        <span className="menu-title">Attendance</span>
                                    </Link>
                                </li>
                            ) : ('')}
                            {x.includes('4') ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/leave">
                                        <i className="icon-paper menu-icon"></i>
                                        <span className="menu-title">Leaves</span>
                                    </Link>
                                </li>
                            ) : ('')}
                            {x.includes('5') ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/master">
                                        <i className="icon-paper menu-icon"></i>
                                        <span className="menu-title">Master</span>
                                    </Link>
                                </li>
                            ) : ('')}
                            {
                                y === 'admin' ?
                                    ('') :
                                    (<li className="nav-item">
                                        <Link className="nav-link" to="/employee_leave">
                                            <i className="icon-paper menu-icon"></i>
                                            <span className="menu-title">Leave</span>
                                        </Link>
                                    </li>)
                            }
                            <li className="nav-item">
                                <button onClick={logout} className="nav-link logout_btn">
                                    <i className="icon-paper menu-icon "></i>
                                    <span className="menu-title">logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header