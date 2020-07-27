import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

const Profile = (props) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    // Selected user data (Ideally would be in one obj, using useEffect hook)
    const [userUsername, setUserUsername] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPrivilege, setUserPrivilege] = useState("");
    const [userID, setUserID] = useState("");
    const [updatedUserData, setUpdatedUserData] = useState({
        _id: "",
        username: "",
        email: "",
        fullName: "",
        privilege: ""
    });

    // Toggle update button
    const [toggleUpdate, setToggleUpdate] = useState(false);

    // GET USER INFO
    async function getUser() {
        await axios.get(`/auth/user/p/${user.username}`)
            .then(res => {
                //console.log(res);
                setUserUsername(res.data.username);
                setUserFullName(res.data.fullName);
                setUserEmail(res.data.email);
                setUserPrivilege(res.data.privilege);
                setUserID(res.data._id);
            })
    }

    useEffect(() => {
        getUser();
    }, [])


    // UPDATE USER INFO
    const onChangeUpdate = (e) => {
        setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
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
                <h3>Hello, {user.username}.</h3>
            </div>

            <div>
                <div>
                    <div>
                        <h5>Account Information</h5>
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
                </div>
            </div>

            <div>
                <div>
                    <button type="button"
                        onClick={onClickToggle}>
                        Update Account Information</button>
                </div>
            </div>
            {toggleUpdate ?
                <div>
                    <form onSubmit={onSubmitUpdate}>
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
                                            </div>
                                            <button type="submit">Update User</button>
                                        </form>
                </div> : null}




        </div>
    );
}

export default Profile;