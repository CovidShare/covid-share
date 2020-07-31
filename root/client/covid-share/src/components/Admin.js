import React, { useState, useContext, useEffect } from "react";
import Message from "../components/Message";
import axios from "axios";
import "../styles/Admin.css";
import logoN from "../assets/LogoNew.png";

const Admin = () => {
  // Inputs
  const [selectedUsername, setSelectedUsername] = useState("");
  const [updatedUserData, setUpdatedUserData] = useState({
    _id: "",
    username: "",
    email: "",
    fullName: "",
    privilege: "",
    notifications: false,
  });
  const [toggleUpdate, setToggleUpdate] = useState(false); // Toggle update user button
  const [message, setMessage] = useState(null);

  // Selected user data (Ideally would be in one obj, using useEffect hook)
  const [userUsername, setUserUsername] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPrivilege, setUserPrivilege] = useState("");
  const [userID, setUserID] = useState("");
  const [userNotifications, setUserNotifications] = useState(false);

  // GET USER DATA FROM USERNAME
  const onChangeUsername = (e) => {
    setSelectedUsername({
      ...selectedUsername,
      [e.target.name]: e.target.value,
    });

    //console.log(selectedUsername)
  };

  async function getUser() {
    await axios.get(`/auth/user/p/${selectedUsername.username}`).then((res) => {
      //console.log(res);
      setUserUsername(res.data.username);
      setUserFullName(res.data.fullName);
      setUserEmail(res.data.email);
      setUserPrivilege(res.data.privilege);
      setUserID(res.data._id);
      setUserNotifications(res.data.notifications);
    });
  }

  const onSubmitUsername = (e) => {
    e.preventDefault();
    getUser();
  };

  // UPDATE
  const onChangeUpdate = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setUpdatedUserData({ notifications: e.target.checked });
  };

  const updateUser = async () => {
    await axios
      .post("/auth/admin/update", {
        _id: userID,
        username: updatedUserData.username,
        email: updatedUserData.email,
        fullName: updatedUserData.fullName,
        privilege: updatedUserData.privilege,
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
    <div className="panelContainer">
      <a href="/home">
        <img src={logoN} />
      </a>

      <h1>Admin Panel</h1>

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
            <button className="searchButton" type="submit">
              Search User
            </button>
          </div>
        </form>
      </div>

      <div>
        {userUsername ? (
          <div>
            <div>
              <div>
                <h4>
                  <strong>User Information</strong>
                </h4>
              </div>
              <div>
                <h5>
                  {" "}
                  {"id: "}
                  {userID}{" "}
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  {"Username: "}
                  {userUsername}{" "}
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  {"Full Name: "} {userFullName}{" "}
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  {"Email: "}
                  {userEmail}{" "}
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  {"Email Notifications: "}
                  {(() => {
                    switch (userNotifications) {
                      case true:
                        return "Opted In";
                      case false:
                        return "Opted Out";
                      default:
                        return "No preference selected";
                    }
                  })()}{" "}
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  {"Privilege: "}
                  {userPrivilege}{" "}
                </h5>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <button
                    className="searchButton"
                    type="button"
                    onClick={onClickToggle}
                  >
                    Modify User
                  </button>
                </div>

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
                          <label className="notifications">
                            Email Notifications{" "}
                          </label>

                          <input
                            type="checkbox"
                            name="notifications"
                            checked={updatedUserData.notifications}
                            onChange={handleCheck}
                            className="form"
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
                            className="form"
                          />
                        </div>
                      </div>
                      <button className="searchButton" type="submit">
                        Update User
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
              <div>
                {message ? (
                  <Message className="message" message={message} />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
