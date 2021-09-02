import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as dashboardAction from '../Actions/dashBoardAction';
import questions from '../Static/question.json';
import "./App.css";
function Question_list(props) {
    
    console.log("question props",props);
    const[loading,setLoading]=useState(true);
    let curr_module=props.location.state;
    //console.log("current module",curr_module);
    let questionList=questions[curr_module].question;
    //console.log("question list",questionList.question);

  
  
    const toggle=(e, module, qn)=>{
        //console.log("question no:",qn);
        let status=props.allQuestionStatus.curr_questionlist_status[curr_module][qn].status;
        console.log("toggle status:",status);
        props.updateQuestionStatus(module, qn);
        props.updateQuestionStatusInFirebase({"module":module,"qn":qn,"status":!status});
        
        //console.log(checkBoxRef.current);
        
        // const dummy = listArr
        // dummy.map(item => {
        //     if(item.question_no == qn){
        //         item.status = !item.status
        //     }
        //     return item
        // })
        // setListArr(dummy)
        
      
        

     
       //props.updateQuestion({"question_no":question_no,"module_name":curr_module,"status":true})
    }

    //const element=document.getElementById("question-container");
    //console.log("class name",element.className);
    useEffect(()=>{
        console.log("useState Called");
        setLoading(false);
    },[])

    return (
        <>
        <div>
            <h1>Question is coming soon.......</h1>
            {
                loading==true?
                <>
                    <h1>Please wait Loading.....</h1>
                </> :
                <>
                <ul style={{listStyle:'none',margin:10}} id="question-ul">
                        {
                            
                            questionList.map((data)=>{
                                
                                //let class_name='active';
                                //let class_name=props.dashboard.curr_questionlist_status!=null?props.dashboard.curr_questionlist_status[curr_module][data["question-no"]].status?'active-div':"inactive-div":'inactive-div';
                                let status=(props.allQuestionStatus.curr_questionlist_status[curr_module][data["question-no"]].status);
        
                                let class_name=status==true?'active-div':'inactive-div';

                                return(
                                    <li style={{margin:10}} className="question-li" key={data["question-no"]}>
                                        <div style={{width:750,height:40,border:2}} id="question-container" className={class_name}>
                                
                                        <span className="question-span">{data["question-no"]}</span>
                                        <span className="question-span">{data["question-name"]}</span>
                                        <input type="checkbox" className="checkBox" defaultChecked={status} id="checkBox" onClick={(e) => toggle(e, curr_module, data["question-no"])}></input>

                                        </div>
                                    </li>
                                )
                            })
                        } 
                    </ul>
                </>
            }
             
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
   // console.log("state-->",state);
    return {
        allQuestionStatus:state.dashboard
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateQuestionStatus: (module, qn) => dispatch(dashboardAction.updateQuestionStatus(module, qn)),
        updateQuestionStatusInFirebase:(module,qn,status)=>dispatch(dashboardAction.updateStatusInFirebase(module,qn,status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question_list)
