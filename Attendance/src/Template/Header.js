import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidenav from '../Template/Sidenav'

const Header = () => {

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
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                         
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                       
                    </ul>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas" onClick={ToggleSidebar} >
                            <span className="icon-menu"></span>
                        </button>
                    </div>
                    <div className='sidebar_hide'>
                        <Sidenav isOpen={isOpen} ToggleSidebar={ToggleSidebar} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header