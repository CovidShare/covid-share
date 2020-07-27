import React, { useState, useContext, useEffect } from 'react';
//import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import axios from 'axios';

const Admin = () => {
    // Inputs
    const [selectedUsername, setSelectedUsername] = useState("");
    const [updatedUserData, setUpdatedUserData] = useState({
        _id: "",
        username: "",
        email: "",
        fullName: "",
        privilege: ""
    });

    // Toggle update user button
    const [toggleUpdate, setToggleUpdate] = useState(false);

    // Selected user data (Ideally would be in one obj, using useEffect hook)
    const [userUsername, setUserUsername] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPrivilege, setUserPrivilege] = useState("");
    const [userID, setUserID] = useState("");

    // GET USER DATA FROM USERNAME
    const onChangeUsername = (e) => {
        setSelectedUsername({ ...selectedUsername, [e.target.name]: e.target.value })
        //console.log(selectedUsername)
    }

    async function getUser() {
        await axios.get(`/auth/user/p/${selectedUsername.username}`)
            .then(res => {
                //console.log(res);
                setUserUsername(res.data.username);
                setUserFullName(res.data.fullName);
                setUserEmail(res.data.email);
                setUserPrivilege(res.data.privilege);
                setUserID(res.data._id);
            })
    }

    const onSubmitUsername = (e) => {
        e.preventDefault();
        getUser();
    };


    // UPDATE 
    const onChangeUpdate = (e) => {
        setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
        //console.log(updatedUserData);
    }

    const updateUser = async () => {
        await axios.post('/auth/admin/update', {
            _id: userID,
            username: updatedUserData.username,
            email: updatedUserData.email,
            fullName: updatedUserData.fullName,
            privilege: updatedUserData.privilege
        })
    }

    const onSubmitUpdate = (e) => {
        e.preventDefault();
        updateUser();


    }


    const onClickToggle = (e) => {
        if (toggleUpdate)
            setToggleUpdate(false);
        else
            setToggleUpdate(true);
    }

    return (
        <div>
            <div>
                <h1>Admin Page</h1>
            </div>
            <div>
                <form onSubmit={onSubmitUsername}>
                    <div>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={onChangeUsername}
                            />
                        </div>
                        <button type="submit">Search User</button>
                    </div>
                </form>
            </div>

            <div>
                {userUsername ?
                    <div>
                        <div>
                            <div>
                                <h5>User</h5>
                            </div>
                            <div>
                                <li> <strong>{"id: "}</strong> {userID} </li>
                            </div>
                            <div>
                                <li> <strong>{"Username: "}</strong> {userUsername} </li>
                            </div>
                            <div>
                                <li> <strong>{"Full Name: "}</strong> {userFullName} </li>
                            </div>
                            <div>
                                <li> <strong>{"Email: "}</strong> {userEmail} </li>
                            </div>
                            <div>
                                <li> <strong>{"Privilege: "}</strong> {userPrivilege} </li>
                            </div>
                        </div>
                        
                        <div>
                            <form onSubmit={onSubmitUpdate}>
                                <div>
                                    <div>
                                        <button type="button"
                                            onClick={onClickToggle}>
                                            Modify User</button>
                                    </div>
                                    {toggleUpdate ?
                                        <div>
                                            <div>
                                                <div>
                                                    <label>Username:</label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={updatedUserData.username}
                                                        placeholder={userUsername}
                                                        onChange={onChangeUpdate}
                                                    />
                                                </div>

                                                <div>
                                                    <label>Full Name:</label>
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={updatedUserData.fullName}
                                                        placeholder={userFullName}
                                                        onChange={onChangeUpdate}
                                                    />
                                                </div>

                                                <div>
                                                    <label>Email:</label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={updatedUserData.email}
                                                        placeholder={userEmail}
                                                        onChange={onChangeUpdate}
                                                    />
                                                </div>

                                                <div>
                                                    <label>Privilege:</label>
                                                    <input
                                                        type="text"
                                                        name="privilege"
                                                        value={updatedUserData.privilege}
                                                        placeholder={userPrivilege}
                                                        onChange={onChangeUpdate}
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit">Update User</button>
                                        </div> : null}
                                </div>
                            </form>
                        </div>
                    </div> : null}
            </div>
        </div>
    );
}

export default Admin;