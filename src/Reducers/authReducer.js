import initialstate from './initialstate.json';
import * as actionType from '../Actions/actionTypes';
export default function authReducer(state=initialstate.auth,action){

    switch(action.type){
        case actionType.SIGN_IN_REQUEST:
            return{...state,loading:true}
        
        case actionType.SIGN_IN_SUCCESS:
            return{...state,loading:false,current_user:action.curr_user_uid}
        
        case actionType.SIGN_IN_FAILED:
            console.log(action.error);
            return{...state,loading:false,errormsg:action.error}

        case actionType.REMOVE_ERROR:
            return {...state,errormsg:''}

        case actionType.REGISTER_REQUEST:
            return {...state,loading:true}

        case actionType.REGISTER_SUCCESS:
            return{...state,loading:false}

        case actionType.REGISTER_FAILED:
            return {...state,loading:false,errormsg:action.error}

        case actionType.SIGN_OUT_FAILED:
                return {...state,errormsg:action.error}

        default:
            return state
    }
}