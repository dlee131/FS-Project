import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import LoggedOutUser from "../../img/loggedoutuser.png";
import LoggedInUser from "../../img/loggedinuser.jpeg";

const DropDownMenu = ({ user }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    
    if (location.pathname === "/reservations") {
      // If the user is on the reservation index page, redirect to the listings index page
      history.push("/");
    }
    setIsOpen(false);
  };
  
  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    handleClose();
    dispatch(sessionActions.login());
  };

  let options;
  if (user) {
    options = (
      <div className="dropdown-borderbox">
        <div id="logout-button">
          <div>
            <NavLink to="/reservations" style={{ textDecoration: "none" }} onClick={() => setIsOpen(false)}>
            <div id="logout-text">Reservations</div>
            </NavLink>
            <NavLink to="/" onClick={logout} style={{ textDecoration: "none" }}>
              <div id="logout-text">Account</div>
              <div id="logout-text">Log Out</div>
              <div></div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else if (!user) {
    options = (
      <div className="dropdown-borderbox">
        <div>
          <LoginFormModal onClose={handleClose} onClick={() => setIsOpen(false)}/>
        </div>
        <div>
          <SignupFormModal onClose={handleClose} onClick={() => setIsOpen(false)}/>
        </div>
        <a href="#demo" onClick={demoLogin} style={{ textDecoration: "none" }}>
          <div className="menu-buttons">Demo Login</div>
        </a>
      </div>
    );
  }

  let photo;
  if (user) {
    photo = <img src={LoggedInUser} className="user-pic" alt="re" />;
    //   LoggedInUser picture to change icon here
  } else if (!user) {
    photo = <img src={LoggedOutUser} className="user-pic" alt="re" />;
  }

  return (
    <div className="dropdown" >
      <button
        className="clickable-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="menu-icons">
          <i className="fa-solid fa-bars" />
          {photo}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <a href="#options" className="dropdown-item">
            {options}
          </a>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
