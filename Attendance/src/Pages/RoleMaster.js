import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'

const RoleMaster = () => {

    const [data, setdata] = useState({ name: '' })
    const [role, setrole] = useState('')
    const [btnstate, Setbtnstate] = useState(false);
    const [updateid, Setupdateid] = useState("");


    const handleedit = (e, val) => {
        console.log(val)
        Setupdateid(val._id);
        Setbtnstate(true);
        setdata({ name: val.name });
    };

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setdata({ ...data, [name]: value })
    }

    const AddRole = async (e) => {
        e.preventDefault();
        const { name } = data;
        if (!name) {
            return alert("Please Enter Role Name")
        }
        const fetchdata = fetch(`http://localhost:3210/api/v1/role/AddRoles`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name
                }),
            });
        const response = await fetchdata;
        const responseData = await response.json();
        if (response.status === 200) {
            alert('Role Added Successfully')
            getRole();
            setdata({ name: '' })
        } else {
            console.error("Error:", responseData);
            alert("Error:", responseData);
        }
    };

    const UpdateRole = async () => {
        const { name } = data;
        const res = fetch(
            `http://localhost:3210/api/v1/role/updateRolesById/${updateid}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name }),
            }
        );
        const response = await res;
        await response.json();
        if (response.status === 500) {
            alert("something is wrong");
        } else {
            alert("update successfully");
            getRole();
            Setbtnstate(false);
            setdata({ name: "" });
        }
    }

    const getRole = () => {
        fetch("http://localhost:3210/api/v1/role/getAllRoles")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setrole(data);
            });
    };

    useEffect(() => {
        getRole();
    }, [])


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
                                    <div className='row'>
                                        <div class="col-md-6 grid-margin transparent">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div className="tbl-heading">
                                                        <h4 class="card-title mb-0">Add Role</h4>
                                                        <p class="card-description"></p>
                                                    </div>
                                                    <div class="form-group ">
                                                        <label for="exampleInputUsername1">Role Name</label>
                                                        <input type="text" class="form-control" name='name' placeholder='Enter Role Name' value={data.name} onChange={handleChange} />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary" onClick={!btnstate ? AddRole : UpdateRole} > {!btnstate ? ` Add Role` : `Update Role`}</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 grid-margin transparent">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="table-responsive">
                                                        <table class="table product-tbl border table-hover">
                                                            <thead className='thead-light'>
                                                                <tr>
                                                                    <th>S.No.</th>
                                                                    <th>Category Name</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {role?.data?.map((val, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td>{val?.name}</td>
                                                                            <td>
                                                                                <button type="button" class="btn btn-outline-info mr-2" onClick={(e) => { handleedit(e, val); }}>Edit</button>
                                                                            </td>
                                                                        </tr >
                                                                    )
                                                                })}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
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

export default RoleMaster