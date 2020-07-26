import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

const Profile = (props) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [actualUser, setActualUser] = useState({ username: "", fullName: "", email: "", privilege: "" })

    useEffect(() => {
        console.log(user)
        AuthService.getUserInfo().then(data => {
            console.log("DATA.user;", data)
            setActualUser(data.user);
        })
        console.log("ACTUAL USER:",actualUser)
    }, [])


    return (
        <>
            <h3>{"Hi, " + actualUser.fullName}</h3>
            <h5>{actualUser.username}</h5>

        </>


    );
}

export default Profile;