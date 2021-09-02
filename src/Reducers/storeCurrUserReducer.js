import initial_state from './initialstate.json';
import * as actionTypes from '../Actions/actionTypes';

export default function setUserReducer(state=initial_state.auth,action){
    console.log("state--->",state);
    switch(action.type){
        case actionTypes.SETCURRENT_USER_SUCCESS:
            return{
                ...state,current_user:action.current_user
            }
        default:
            return state;
    }

}