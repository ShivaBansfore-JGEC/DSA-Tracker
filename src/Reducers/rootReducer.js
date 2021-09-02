import { combineReducers } from "redux";
import authReducer from "./authReducer";
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import initialState from './initialstate.json';
import * as actionTypes from '../Actions/actionTypes';
import dashboardReducer from "./dashboardReducer";
import setUserReducer from "./storeCurrUserReducer";

const appReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    auth:authReducer,
    dashboard:dashboardReducer,
    setCurrentUser:setUserReducer

})

const rootReducer = (state=initialState,action)=>{
    if(action.type===actionTypes.SIGN_OUT)
    {
        state=undefined;
    }
    return appReducer(state,action)

}

export default rootReducer