import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidenav = () => {

    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear();
        navigate('/')
    }
    return (
        <>
            <nav className="sidebar sidebar-offcanvas clr" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employee">
                            <i className="icon-cog menu-icon"></i>
                            <span className="menu-title">Employee</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/attendance">
                            <i className="icon-image menu-icon"></i>
                            <span className="menu-title">Attendance</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/payroll">
                            <i className="icon-paper menu-icon"></i>
                            <span className="menu-title">Payroll</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/master">
                            <i className="icon-paper menu-icon"></i>
                            <span className="menu-title">Master</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={logout} className="nav-link logout_btn">
                            <i className="icon-paper menu-icon "></i>
                            <span className="menu-title">logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidenav