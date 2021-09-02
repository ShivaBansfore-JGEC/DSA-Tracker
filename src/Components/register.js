
import React,{useState,useEffect} from "react";
import { isLoaded } from 'react-redux-firebase'
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as authAction from '../Actions/authAction';


function Register(props) {
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    let history=useHistory();

    useEffect(()=>{
        if(props.auth?.uid)
        {
          history.push('/')
        }
      },[props])

    const handleuserName=(e)=>{
        setUserName(e.target.value);
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handlePass=(e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit=()=>{
        console.log("hi");
        props.register({userName:userName,email:email,password:password});
        console.log(props);
    }

    return (
        
        <div>
            <label>UserName:</label>
            <input type="text" value={userName} onChange={handleuserName} ></input>
            <br/>
            <label>Email:</label>
            <input type="text" onChange={handleEmail}></input>
            <br/>
            <label>Password:</label>
            <input type="password" onChange={handlePass} ></input>
            <br/>
            <button type="submit" onClick={handleSubmit}>Register</button>

        </div>
    )
}


const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth,
        authMine:state.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    register:(userData)=>dispatch(authAction.register(userData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)
