import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';

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
    <ul className='dropdown-image'>
        <li><NavLink to="/" onClick={logout}>Log Out</NavLink></li>
    </ul>
} else {
      options = 
    <ul className='dropdown-image'>
        <li><LoginFormModal/></li>
        <li><SignupFormModal/></li>
        <li><button onClick={demoLogin}>Demo Login</button></li>
    </ul>
}

return (
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      onClick={() => setIsOpen(!isOpen)}
    >
    </button>

    {isOpen && (
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">{options}</a>
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