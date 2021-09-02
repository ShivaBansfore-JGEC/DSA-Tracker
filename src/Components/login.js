import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router";
import { connect } from "react-redux";
import * as authAction from '../Actions/authAction';
import firebase from 'firebase/app';
import { isLoaded } from 'react-redux-firebase';


function Login(props) {
    //console.log("login props:",props.authMine);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    let history=useHistory();
    const user=firebase.auth().currentUser;

    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }

    const handlePass=(e)=>{
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (props.authFirebase?.uid) {
          history.push('/')
        }
      }, [props])

    const handleSignIn=()=>{
        props.signIn({email:email,password:password});
        setEmail('');
        setPassword('');
    }

    const handleSignup=()=>{
        history.push("/signup");
    }
    const signOut=()=>{
        props.logOut();
    }

    return (
    <>
        {!isLoaded(props.authFirebase)?<></>:<>
        
            {props.authMine.loading ?<h4 style={{ marginTop: '10%', height: '52vh' }}>Patiently Wait...we are logging you in</h4>:
            <>
            <label>email:</label>
            <input type='email' value={email} onChange={handleEmail}></input>
            <br/>
            <label>password:</label>
            <input type='password' value={password} onChange={handlePass}></input>
            <br/>
            {props.authMine?.errormsg?.message ? <div className="input-group full">
                      <span className="error-message" >{props.authMine?.errormsg?.message}</span>
            </div> : <></>}

            <button onClick={handleSignIn}>Sign In</button>
            <br/>
            <button onClick={handleSignup}>New User?</button></>}
            </>
        }
    
    </>
       
    );
}

const mapStateToProps=(state)=>{
    return{
        authMine:state.auth,
        authFirebase:state.firebase.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signIn:(userData)=>dispatch(authAction.signIn(userData)),
        logOut:()=>dispatch(authAction.signout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Login)
