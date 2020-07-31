import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Message from "../components/Message";
import "../styles/Profile.css";
import logoN from "../assets/LogoNew.png";
const Profile = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    AuthContext
  );
  const [isAdmin, setIsAdmin] = useState(false);
  // Selected user data (Ideally would be in one obj, using useEffect hook)
  const [userUsername, setUserUsername] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPrivilege, setUserPrivilege] = useState("");
  const [userID, setUserID] = useState("");
  const [userNotifications, setUserNotifications] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    _id: "",
    username: "",
    email: "",
    fullName: "",
    privilege: "",
    notifications: false,
  });
  const [toggleUpdate, setToggleUpdate] = useState(false); // Toggle update button
  const [message, setMessage] = useState(null);

  // GET USER INFO
  async function getUser() {
    await axios.get(`/auth/user/p/${user.username}`).then((res) => {
      //console.log(res);
      setUserUsername(res.data.username);
      setUserFullName(res.data.fullName);
      setUserEmail(res.data.email);
      setUserNotifications(res.data.notifications);
      setUserPrivilege(res.data.privilege);
      setUserID(res.data._id);

      if (res.data.privilege === "admin") setIsAdmin(true);
    });
  }

  useEffect(() => {
    getUser();
    //if (userPrivilege == "admin")
    //    setIsAdmin(true);
    console.log("ISADMIN", userPrivilege);
  }, []);

  // UPDATE USER INFO
  const onChangeUpdate = (e) => {
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
    //console.log(updatedUserData)
  };
  const handleCheck = (e) => {
    setUpdatedUserData({ notifications: e.target.checked });
  };

  const updateUser = async () => {
    await axios
      .post("/auth/user/update", {
        _id: userID,
        username: updatedUserData.username,
        email: updatedUserData.email,
        fullName: updatedUserData.fullName,
        notifications: updatedUserData.notifications,
      })
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    updateUser();
  };

  const onClickToggle = (e) => {
    if (toggleUpdate) setToggleUpdate(false);
    else setToggleUpdate(true);
  };

  return (
    <div className="adminContainer">
      <div className="form-group">
        <a href="/home">
          <img src={logoN} />
        </a>
        <h1>Hello, {user.username}.</h1>
        {isAdmin ? (
          <a href="/admin">
            <button className="modButton" type="submit">
              Admin Panel
            </button>
          </a>
        ) : null}
        <form>
          <h3>Account Information</h3>
          <div className="form-group">
            <h5>
              {"Username: "}
              {userUsername}{" "}
            </h5>
            <h5>
              {"Full Name: "}
              {userFullName}{" "}
            </h5>
            <h5>
              {"Email: "} {userEmail}{" "}
            </h5>
          </div>
        </form>
        <button className="modButton" type="submit" onClick={onClickToggle}>
          Update Account Information
        </button>

        {toggleUpdate ? (
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
                    className="form"
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
                    className="form"
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
                    className="form"
                  />
                </div>
                <div>
                  <label>Email Notifications:</label>
                  <input
                    type="checkbox"
                    checked={updatedUserData.notifications}
                    onChange={handleCheck}
                    className="form"
                  />
                </div>
              </div>
              <button className="updateButton" type="submit">
                Update User
              </button>
            </form>
          </div>
        ) : null}

        <div>
          {message ? <Message className="message" message={message} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
