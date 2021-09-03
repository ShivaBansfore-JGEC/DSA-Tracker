import * as actionTypes from '../Actions/actionTypes';
export const loadDataRequest=()=>{
    return{
        type:actionTypes.LOAD_DATA_REQUEST
    }
}

export const sendDataToStore=(data)=>{
  
    return{
        type:actionTypes.LOAD_DATA_SUCCESS,
        payload:data
    }
}

export const updateCurrModule=(curr_module)=>{
    return{
        type:actionTypes.UPDATE_CURR_MODULE,
        module:curr_module
    }
}


export const updateQuestionStatus = (module, qn) => async (dispatch) => {
    console.log("hello")
    dispatch({ type:actionTypes.UPDATE_QUESTION_STATUS, payload: { module: module, qn: qn } })
}

export const  updateStatusInFirebase=(userData)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        const uid=firebase.auth().currentUser.uid;
        
         firestore.collection("users").doc(uid).update({
            [userData.qn]:{
                status:userData.status,
                module:userData.module
            }
        }).then(()=>{

        }).catch((err)=>{
            console.log(err.message);
        })

    }
}



