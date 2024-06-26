import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidenav = () => {
    const permissionget = localStorage.getItem("permission");


    const x = permissionget;

    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear();
        navigate('/')
    }
    return (
        <>
            <nav className="sidebar sidebar-offcanvas clr" id="sidebar">
                <ul className="nav">
                    {x.includes('1') ? (
                        <li className="nav-item">
                            <Link className="nav-link active" to="/dashboard">
                                <i className="icon-grid menu-icon"></i>
                                <span className="menu-title">Dashboard</span>
                            </Link>
                        </li>
                    ) : ('')}
                    {x.includes('2') ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee">
                                <i class="fa-regular fa-user menu-icon"></i>
                                <span className="menu-title">Employee</span>
                            </Link>
                        </li>
                    ) : ('')}
                    {x.includes('3') ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/attendance">
                                <i class="fa-regular fa-clipboard menu-icon"></i>
                                <span className="menu-title">Attendance</span>
                            </Link>
                        </li>
                    ) : ('')}
                    {x.includes('4') ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/leave">
                                <i class="fa-regular fa-address-book menu-icon"></i>
                                <span className="menu-title">Leaves</span>
                            </Link>
                        </li>
                    ) : ('')}
                    {x.includes('5') ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/master">
                               <i class="fa-brands fa-watchman-monitoring menu-icon"></i>
                                <span className="menu-title">Master</span>
                            </Link>
                        </li>
                    ) : ('')}
                    {x.includes('8') ?

                        (<li className="nav-item">
                            <Link className="nav-link" to="/employee_leave">
                                <i class="fa-regular fa-address-book menu-icon"></i>
                                <span className="menu-title">Leave</span>
                            </Link>
                        </li>) : ('')
                    }
                    <li className="nav-item">
                        <button onClick={logout} className="nav-link logout_btn">
                            <i class="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                            <span className="menu-title">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidenav