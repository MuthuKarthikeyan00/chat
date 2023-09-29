import React from 'react'
import logo from "./img/w2.png";
import "./Login.css";
import {Button} from "@material-ui/core"
import {auth,provider} from './firebase';
import { actionTypes } from './reducer';
import {useStateValue} from './StateProvider';

const Login = () => {

    const [ {user}, dispatch] = useStateValue()

const sigIN=()=>{
    auth.signInWithPopup(provider).then((result)=>{
       dispatch({
           type:actionTypes.SET_USER,
           user:result.user,
       });
    }).catch((error)=>alert(error.message));
}

    return (
        <div className="login">
            <div  className="login__container">
            <img src={logo} alt="logo"></img>
   
            <div  className="login__text">
                <h1> Sign in to What'sApp</h1>
            </div>

            <Button onClick={sigIN}>
            SIGN IN WITH GOOGLE
            </Button>

        
            </div>
        </div>
    )
}

export default Login
