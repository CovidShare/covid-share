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

    // Toggle update button
    const [toggleUpdate, setToggleUpdate] = useState(false);

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
                    <h1>update inputs</h1>
                </div> : null}




        </div>
    );
}

export default Profile;