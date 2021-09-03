import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import * as dashboardAction from '../Actions/dashBoardAction';
import questions from '../Static/question.json';
import "./App.css";
function Question_list(props) {
    
    console.log("question props",props.allQuestionStatus);
    const[loading,setLoading]=useState(true);
    const[questions_arr,setQuestionArr]=useState([]);
    const [currsearchText,setText]=useState('');

    let curr_module=props.allQuestionStatus.curr_module;
    console.log("questions",curr_module);
    let questionList=questions[curr_module].question;
    
    console.log("question array",questions_arr);

    useEffect(()=>{
        if(currsearchText==''){
            setQuestionArr(questionList);
        }
    },[questions_arr])

  
  
    const toggle=(e, module, qn)=>{
        //console.log("question no:",qn);
        let status=props.allQuestionStatus.curr_questionlist_status[curr_module][qn].status;
        console.log("toggle status:",status);
        props.updateQuestionStatus(module, qn);
        props.updateQuestionStatusInFirebase({"module":module,"qn":qn,"status":!status});
        
    }

    const handleSearch=(e)=>{
        let value=e.target.value;
        setText(value);
        console.log("i am from onChange method");
        console.log("question arr:",questions_arr);
        let question_array = questions_arr.filter((Obj) => {
            let title = Obj["question-name"].trim().toLowerCase();
            return title.includes(value.toLowerCase());
        });
        setQuestionArr(question_array);
        console.log("array question-->",questions_arr);

    }

    
    useEffect(()=>{
        console.log("useState Called");
        setLoading(false);
    },[])

    return (
        <>
        <div className="serchBox-container">
            <input className="secrchBox" value={currsearchText} type='text' placeholder='search your question here...' onChange={handleSearch}></input>
        </div>
        <div className="question-containers">
            <div className="question-heading">
                <div className="question-title">
                    <h4>Title</h4>
                </div>
                <div className="difficulty">
                    <h4>Difficulty</h4>
                </div>
                <div className="status">
                    <h4>Status</h4>
                </div>

                <div className="Attempt">
                    <h4>Attempt</h4>
                </div>


            </div>
            {
                loading==true?
                <>
                    <h1>Please wait Loading.....</h1>
                </> :
                <>
                <div className="question-list-container">
                <ul style={{listStyle:'none'}} id="question-ul">
                        {
                            
                            
                            questions_arr.map((data)=>{
                                
                                //let class_name='active';
                                //let class_name=props.dashboard.curr_questionlist_status!=null?props.dashboard.curr_questionlist_status[curr_module][data["question-no"]].status?'active-div question-wrap':"inactive-div question-wrap":'inactive-div';
                                let status=(props.allQuestionStatus.curr_questionlist_status[curr_module][data["question-no"]].status);
        
                                let class_name=status==true?'active-div question-wrap':'inactive-div question-wrap';

                                return(
                                    <div className="list-container">
                                    <li  className="question-li" key={data["question-no"]}>
                                        <div id="question-container" className={class_name}>
                                        <div className="question-name">
                                        <span>{data["question-name"]}</span>
                                        </div>
                                        <div className="question-difficulty">
                                            <span>{data["difficulty"]}</span>
                                        </div>
                                        <div className="checkboc-container">
                                        <input type="checkbox" className="checkBox" defaultChecked={status} id="checkBox" onClick={(e) => toggle(e, curr_module, data["question-no"])}></input>
                                            </div>
                                        <div className="question-attempt">
                
                                            <a href="https://www.interviewbit.com/courses/programming/">
                                                <div className="attemp-btn">Solve</div>
                                            </a>
                                        </div>
                                        </div>

                                    </li>
                                    </div>
                                )
                            })
                        } 
                    </ul>
                    </div>
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
