import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import LoggedOutUser from '../../img/loggedoutuser.png'


const DropDownMenu = ({user}) => {
const dispatch = useDispatch();
const [isOpen, setIsOpen] = useState(false);

const logout = (e) => {
  e.preventDefault();
  dispatch(sessionActions.logout());
};

const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential:"Demo-lition", password:"password" }))
}

let options;
if (user) {
  options = 
    <div className='dropdown-image'>
        <div><NavLink to="/" onClick={logout} style={{ textDecoration: "none" }}>Log Out</NavLink></div>
    </div>
} else if (!user) {
      options = 
    <div className='dropdown-image'>
        <div><LoginFormModal/></div>
        <div><SignupFormModal/></div>
        <div><a href="#" onClick={demoLogin} style={{ textDecoration: "none" }}>Demo Login</a></div>
    </div>
}

let photo;
if (user) {
  photo = <img src={LoggedOutUser} className='user-pic' alt="re" /> 
//   LoggedInUser picture to change icon here
} else if (!user) {
  photo = <img src={LoggedOutUser} className='user-pic' alt="re" />
}

return (
  <div className="dropdown">
    <button
      className="clickable-button"
      type="button"
      onClick={() => setIsOpen(!isOpen)}>
    <div className="menu-icons">
        <i className="fa-solid fa-bars" />
        {photo}
    </div>
    </button>

    {isOpen && (
    <div className="dropdown-menu">
        <a className="dropdown-item">{options}</a>
    </div>
    )}
  </div>
);
  }

  export default DropDownMenu



// const dispatch = useDispatch()
// const [showMenu, setShowMenu] = useState(false);

// const logout = (e) => {
//   e.preventDefault();
//   dispatch(sessionActions.logout());
// };

// const demoLogin = (e) => {
//     e.preventDefault();
//     return dispatch(sessionActions.login({ credential:"Demo-lition", password:"password" }))
// }

// const openMenu = () => {
//   if (showMenu) return;
//   setShowMenu(true);
// };

// useEffect(() => {
//   if (!showMenu) return;

//   const closeMenu = () => {
//     setShowMenu(true);
//   };

//   document.addEventListener('click', closeMenu);

//   return () => document.removeEventListener("click", closeMenu);
// }, [showMenu]);

// let options;
// if (user) {
//   options = 
//         <li><NavLink to="/" onClick={logout}>Log Out</NavLink></li>
//     </ul>
// } else {
//   options = 

//         <li><LoginFormModal /></li>
//         <li><SignupFormModal /></li>
//     </ul>
// }

// return (
//   <>

//   {options}
//   </>
// )