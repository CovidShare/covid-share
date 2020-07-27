import JWT from 'jsonwebtoken';
import * as passportConfig from '../passport.js';
import User from '../models/UserModel.js';
import config from '../config/config.js';

// Register will also login
export const register = (req, res) => {
    const newUserData = req.body;
    User.findOne({ $or: [{ username: newUserData.username }, { email: newUserData.email }] })
        .then(user => {
            if (user) {
                if (user.username === newUserData.username)
                    res.status(400).json({ message: { messageBody: "Username already in use", messageError: true } });
                else if (user.email === newUserData.email)
                    res.status(400).json({ message: { messageBody: "Email already in use", messageError: true } });
            }
            else {
                const newUser = new User(newUserData);
                //console.log(newUser) // Testing purpose
                newUser.save()
                    .then(user => {
                        res.status(201).json({ message: { messageBody: "Account succesfully created", messageError: false } });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: { messageBody: "Error has occured (saving user)", messageError: true } });
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ message: { messageBody: "Error has occured (checking if user exists)", messageError: true } });
        })
}



// Returns the actual JWT token. Do not send sensitive data (private, etc)
const signToken = userID => {
    return JWT.sign({
        iss: "covid-share-project", // Who issued the token
        sub: userID // user PK
    }, config.jwt.secretKey, { expiresIn: "1h" });
}

export const login = (req, res) => {
    if (req.isAuthenticated()) {
        // req.username comes from passport that is ataching the user object to the req obj
        const { _id, username, privilege } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        // httpOnly: Set that the client side cannot change this cookie.. prevent cross-site scripting attack
        // sameSite: prevent agains croos-site request forgery attacks (protect token not to be stolen?)
        res.status(200).json({ isAuthenticated: true, user: { username, privilege } });
    }
}


export const logout = (req, res) => {
    res.clearCookie('access_token'); //remove jwt access_token
    res.json({ user: { username: "", privilege: "" }, success: true }); // MAYBE ADD EMAIL AND PHONE? ***
    console.log("Succesfully logged out");
}

export const authenticated = (req, res) => {
    const { username, privilege } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, privilege } });
}

export const admin = (req, res) => {
    if (req.user.privilege === 'admin') {
        res.status(200).json({ message: { messageBody: 'You are an admin', messageError: false } });
    }
    else
        res.status(403).json({ message: { messageBody: "You are not an admin", messageError: true } });
}
/*
export const getUserInfo = (req, res) => {
    console.log("*********REQ.BODY", req.body.username)
    User.findOne({ username: req.body.username })
        .then(user => {
            res.status(200).json({
                user: {
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    privilege: user.privilege
                }
            })
        })
}
*/

//{username: req.query.username} for query string params (urls ?username=xxx alike)
export const getUser = (req, res) => {
    User.findOne({ username: req.params.username })
        .then(selectedUser => {
            if (!selectedUser)
                return res.status(403).json({ message: { messageBody: "Error, no user", messageError: true } });

            return res.status(200).send(selectedUser)
        })
        .catch(err => {
            return res.status(403).json({ message: { messageBody: "Error getting user from DB", messageError: true } });
        })
}

export const adminUpdateUser = (req, res) => {
    console.log("REQ BODY", req.body, "REQ BODY")

    const updatedUserData = req.body;
    if (req.body.privilege != "admin" && req.body.privilege != "user")
        res.status(400).json({ message: { messageBody: "Privilege must be user or admin", messageError: true } });

    User.findOne({ $or: [{ username: updatedUserData.username }, { email: updatedUserData.email }] })
        .then(user => {
            if (user && user._id != updatedUserData._id) {
                if (user.username === updatedUserData.username)
                    res.status(400).json({ message: { messageBody: "Username already in use", messageError: true } });
                else if (user.email === updatedUserData.email)
                    res.status(400).json({ message: { messageBody: "Email already in use", messageError: true } });
            }
            else {
                User.findByIdAndUpdate(updatedUserData._id, {
                    username: updatedUserData.username,
                    fullName: updatedUserData.fullName,
                    email: updatedUserData.email,
                    privilege: updatedUserData.privilege
                }, { new: true })
                    .then(user => {
                        console.log(user);
                        res.status(201).json({ message: { messageBody: "User succesfully updated", messageError: false } });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: { messageBody: "Error has occured (updating user)", messageError: true } });
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: { messageBody: "Error has occured (Checking username/email)", messageError: true } });
        })
}