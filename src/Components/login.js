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
                <div className="register-form-container">
                <div className="form-container">
                    <h1>Please SignIn...!</h1>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping"></span>
                <input type="email" class="form-control"   placeholder="Email" value={email} onChange={handleEmail} aria-label="Username" aria-describedby="addon-wrapping" />
            </div>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping"></span>
                <input type="password" class="form-control" value={password} onChange={handlePass} placeholder="Password"  aria-label="Username" aria-describedby="addon-wrapping" />
            </div>
            {props.authMine?.errormsg?.message ? <div className="input-group full">
                      <span className="error-message" >{props.authMine?.errormsg?.message}</span>
            </div> : <></>}

            <button type="button" onClick={handleSignIn} class="btn btn-info" >SignIn</button>
            </div>
            </div>
            </>}
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
