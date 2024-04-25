import React from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import Login from './Login'

const Payroll = () => {
    const tokenstring = sessionStorage.getItem('token')


    if (!tokenstring) {
        return <Login />
    }
    return (
        <>
            <div class="container-scroller">
                < Header />
                <div class="container-fluid page-body-wrapper">
                    <Sidenav />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="row">
                                <div class="col-md-12 grid-margin">
                                   
                                    <h1>hwllo</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payroll