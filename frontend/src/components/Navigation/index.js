import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import "./Navigation.css";
import logo from "../../img/bnb_logo.jpeg";
import DropDownMenu from "./DropdownMenu";
import SearchBar from "../SearchBar/searchbar";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  // const [showDropdown, setshowDropdown] = useState(true)
  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </>
  //   );
  // }

  return (
    <div className="header">
      <NavLink
        exact
        to="/"
        className="nav-link"
        style={{ textDecoration: "none" }}
      >
        <div className="logo-image">
          <img src={logo} alt="airbnb" className="logo-image" />
          <p className="logo-text">melobnb</p>
        </div>
      </NavLink>
      <div>
        <input className="searchbar" placeholder="Start your search"></input>
      </div>
      <div className="linkedin-git">
        <a href="https://github.com/dlee131" target="_blank" title="github">
          {" "}
          <img
            src="https://melobnb-seeds.s3.amazonaws.com/githublogo.jpeg"
            className="github"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-lee-231a57262/"
          target="_blank"
          title="linkedin"
        >
          <img
            src="https://melobnb-seeds.s3.amazonaws.com/linkedinlogo.jpeg"
            className="linkedin"
          />
        </a>
      </div>
      <div>{<DropDownMenu user={sessionUser} />}</div>
    </div>
  );
}

export default Navigation;
