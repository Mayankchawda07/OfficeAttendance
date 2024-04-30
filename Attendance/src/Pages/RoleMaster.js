import React, { useEffect, useState } from 'react'
import Header from '../Template/Header'
import Sidenav from '../Template/Sidenav'

const RoleMaster = () => {
    const URL = process.env.REACT_APP_URL;


    const [data, setdata] = useState({ name: '' })
    const [role, setrole] = useState('')
    const [btnstate, Setbtnstate] = useState(false);
    const [updateid, Setupdateid] = useState("");
    const [permission, setPermission] = useState([]);


    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);




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
        const fetchdata = fetch(`${URL}/api/v1/role/AddRoles`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name, permission
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
            `${URL}/api/v1/role/updateRolesById/${updateid}`,
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


    const handleCheckboxChange = (e) => {
        let data = permission;
        const value = e.target.value;
        const checkdata = data.includes(value);
        // alert(value);
        console.log(permission);
        if (checkdata) {
            // alert(value);
            if (value === '1') {
                setIsChecked1(false)
            }
            if (value === '2') {
                setIsChecked2(false)
            }
            if (value === '3') {
                setIsChecked3(false)
            }
            if (value === '4') {
                setIsChecked4(false)
            }
            if (value === '5') {
                setIsChecked5(false)
            }

            let index = data.indexOf(value);
            data.splice(index, 1);

            // data.pop(value);
            setPermission(data);
        } else {
            if (value === '1') {
                setIsChecked1(true)
            }
            if (value === '2') {
                setIsChecked2(true)
            }
            if (value === '3') {
                setIsChecked3(true)
            }
            if (value === '4') {
                setIsChecked4(true)
            }
            if (value === '5') {
                setIsChecked5(true)
            }


            data.push(value);
            setPermission(data);
        }
    };

    const getRole = () => {
        fetch(`${URL}/api/v1/role/getAllRoles`)
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
                                                    <br />
                                                    <div className="tbl-heading">
                                                        <h4 class="card-title mb-0 mt-4">Permissions</h4>
                                                    </div>
                                                    <div className="permission">

                                                        <label class="form-check-label">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input checkbox"
                                                                value="1"
                                                                name="permission"
                                                                checked={isChecked1}
                                                                onChange={(e) => handleCheckboxChange(e)}
                                                            />
                                                            Dashboard
                                                        </label>
                                                        <br />
                                                        <label class="form-check-label">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input checkbox"
                                                                value="2"
                                                                name="permission"
                                                                checked={isChecked2}
                                                                onChange={(e) => handleCheckboxChange(e)}
                                                            />
                                                            Employee
                                                        </label>
                                                        <br />
                                                        <label class="form-check-label">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input checkbox"
                                                                value="3"
                                                                name="permission"
                                                                checked={isChecked3}
                                                                onChange={(e) => handleCheckboxChange(e)}
                                                            />
                                                            Attendance
                                                        </label>
                                                        <br />
                                                        <label class="form-check-label">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input checkbox"
                                                                value="4"
                                                                name="permission"
                                                                checked={isChecked4}
                                                                onChange={(e) => handleCheckboxChange(e)}
                                                            />
                                                            Payroll
                                                        </label>
                                                        <br />
                                                        <label class="form-check-label">
                                                            <input
                                                                type="checkbox"
                                                                class="form-check-input checkbox"
                                                                value="5"
                                                                name="permission"
                                                                checked={isChecked5}
                                                                onChange={(e) => handleCheckboxChange(e)}
                                                            />
                                                            Master
                                                        </label>
                                                    </div>
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