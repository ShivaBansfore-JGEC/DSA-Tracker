import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import { Route,Switch } from 'react-router-dom';
import Dashboard from './Components/dashboard';
import Register from './Components/register';
import Question_list from './Components/question_list';
import Login from './Components/login';
import { connect } from "react-redux";
import firebase from 'firebase/app';
import * as storeUserAction from './Actions/storeCurrentUserAction';
import Navbar from './Components/navbar';
import {isLoaded,isEmpty} from 'react-redux-firebase';

function App(props) {

  
  return (
    <>
   <Navbar/>
    <Switch>
      <Route path="/signup" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/questions" component={Question_list}></Route>
      <Route path="/" component={Dashboard}></Route>
      </Switch>
    </>
  );
}



export default App;
