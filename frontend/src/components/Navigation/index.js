import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from '../../img/bnb_logo.jpeg'
import DropDownMenu from './DropdownMenu';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);
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
    <div className='header'>
        <NavLink exact to="/" className="nav-link" style={{ textDecoration: "none" }}>
        <div className="logo-image">
        <img src={logo} alt="airbnb" className="logo-image"/>
        <p className='logo-text'>melobnb</p>
        </div>
        </NavLink>
        <div>{<DropDownMenu user={sessionUser}/>}</div>
    </div>
  );
}

export default Navigation;