import initalState from './initialstate.json';
import * as actionTypes from '../Actions/actionTypes';

export default function dashboardReducer(state=initalState,action){
    
    switch(action.type){
        case actionTypes.LOAD_DATA_SUCCESS:
            console.log("payload",action.payload);
            return{
                ...state,curr_questionlist_status:action.payload
            }

        case actionTypes.UPDATE_QUESTION_STATUS:
            console.log("state from reducer:",state);
            //     console.log(action.payload.module)
             
            //     console.log(state.curr_questionlist_status)
            //     // console.log(state.curr_questionlist_status[action.payload.module])
            
                const newModule = {
                    ...state.curr_questionlist_status[action.payload.module],
                    [action.payload.qn]: {
                        module: action.payload.module,
                        status: !state.curr_questionlist_status[action.payload.module][action.payload.qn].status
                    }
                }
            
            console.log("question no:",action.payload.qn)
            console.log("new module",newModule);
            console.log("status",state.curr_questionlist_status[action.payload.module][action.payload.qn].status);
    
                const newState = {
                    ...state.curr_questionlist_status,
                    [action.payload.module]: newModule
                }
        
            return{...state,curr_questionlist_status:newState};
           
        default:
            return state;

    }
}