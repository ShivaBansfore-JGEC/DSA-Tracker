import React from 'react'
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { NavLink } from "react-router-dom";
import * as authAction from '../Actions/authAction';

function LoggesOut(props) {
  return (
    
    <ul style={{listStyle:"none"}}>
      <li  className="signup ">
        <NavLink style={{textDecoration:"none"}} className=" btnv-1" to="/signup">
          Register
        </NavLink>
      </li>
      <li className="signin">
        <NavLink style={{textDecoration:"none"}} className="text-blue btnv-3" to="/login">
          Sign In
        </NavLink>
      </li>
    </ul>
  )
}



function Navbar(props) {
  const auth = props.auth;
  const handleLogOut = () => {
    console.log('The user will sign out');
    props.signOut();
  }
  return (
    <>
      <div className='nav_bar'>
        {isLoaded(auth) && !isEmpty(auth) ? <>
          
          <ul style={{listStyle:"none"}}>
            <li className="signin ">
              <NavLink style={{textDecoration:"none"}} className="  " to="/">
                Logged in as {auth.email}
              </NavLink>
            </li>
            <li  className="signin">
              <button className="signout-btn" onClick={handleLogOut}>
                Signout
              </button>
            </li>
          </ul>

        </> : <LoggesOut></LoggesOut>}



      </div>


    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(authAction.signout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
