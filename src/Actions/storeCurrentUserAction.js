import * as actionTypes from './actionTypes';

export const setCurrUser=(user)=>{
    return{
        type:actionTypes.SETCURRENT_USER_SUCCESS,
        current_user:user
    }
}