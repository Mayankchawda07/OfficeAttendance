import React from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'
import { Link } from 'react-router-dom'


const Master = () => {
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
                                    <div class="row">
                                        <Link to='/role_master' class="col-md-3 mb-4 stretch-card transparent">
                                            <div class="card card-tale">
                                                <div class="card-body">
                                                    Role
                                                </div>
                                            </div>
                                        </Link>
                                        {/* <Link to='/master' class="col-md-3 mb-4 stretch-card transparent">
                                            <div class="card card-dark-blue">
                                                <div class="card-body">
                                                    Sub-category
                                                </div>
                                            </div>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Master