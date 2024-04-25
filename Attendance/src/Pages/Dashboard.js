import React from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import Login from './Login'

const Dashboard = () => {
    const tokenstring = sessionStorage.getItem('token')
    const loginstring = sessionStorage.getItem('loginType')
    const x = loginstring


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
                                    {
                                        x === 'admin' ?
                                            (<h1>hwllo admin</h1>) :
                                            (<h1>hwllo employee</h1>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard