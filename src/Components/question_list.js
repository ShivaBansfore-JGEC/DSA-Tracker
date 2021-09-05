import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import * as dashboardAction from '../Actions/dashBoardAction';
import questions from '../Static/question.json';
import "./App.css";
function Question_list(props) {

   // console.log("question props", props.allQuestionStatus);
    const [loading, setLoading] = useState(true);
    const [questions_arr, setQuestionArr] = useState([]);
    const [currsearchText, setText] = useState('');
    const [isSorted, setSorted] = useState(false);
    const [limit, setLimit] = useState(4);
    const [currentPage, setPage] = useState(1);
    const [QuestionSet,setQuestion]=useState([]);
    const [m,setm]=useState('');


    let curr_module = props.allQuestionStatus.curr_module;
    let questionList = questions[curr_module].question;



    useEffect(()=>{
        setQuestion(questions);
    },[QuestionSet]);
    
    useEffect(()=>{
        setm(props.allQuestionStatus.curr_module);
    },[])


    useEffect(() => {
        setQuestionArr(questionList);
    }, [])



    const toggle = (e, module, qn) => {
        //console.log("question no:",qn);
        let status = props.allQuestionStatus.curr_questionlist_status[curr_module][qn].status;
        console.log("toggle status:", status);
        props.updateQuestionStatus(module, qn);
        props.updateQuestionStatusInFirebase({ "module": module, "qn": qn, "status": !status });

    }

    const handleSearch = (e) => {
        let value = e.target.value;
        if (value != '') {
            let question_array = questionList.filter((Obj) => {
                let title = Obj["question-name"].trim().toLowerCase();
                return title.includes(value.toLowerCase());
            });
            setQuestionArr(question_array);
        } else {
            setQuestionArr(questionList);
        }
        setText(value);

    }

    const sortAscend = () => {
        
        let ascn_arr = questions_arr.sort((objA, objB) => {
            if (objA["difficulty"] === objB["difficulty"]) {
                return 1;
            } else if (objA["difficulty"] == "Easy" && objB["difficulty"] == "Medium") {
                return 1;
            } else if (objA["difficulty"] == "Medium" && objB["difficulty"] == "Easy") {
                return -1;
            } else if (objA["difficulty"] == "Easy" && objB["difficulty"] == "Hard") {
                return 1;
            } else if (objA["difficulty"] == "Hard" && objB["difficulty"] == "Easy") {
                return -1;
            } else if (objA["difficulty"] == "Medium" && objB["difficulty"] == "Hard") {
                return 1;
            } else if (objA["difficulty"] == "Hard" && objB["difficulty"] == "Medium") {
                return -1;
            }
        });
        let arr=[...ascn_arr];
        
        setQuestionArr(arr);
    }


    const sortDescend = () => {
        console.log("desc clicked");
        let desc_arr = questions_arr.sort((objA, objB) => {
            if (objA["difficulty"] === objB["difficulty"]) {
                return 1;
            } else if (objA["difficulty"] == "Easy" && objB["difficulty"] == "Medium") {
                return -1;
            } else if (objA["difficulty"] == "Medium" && objB["difficulty"] == "Easy") {
                return 1;
            } else if (objA["difficulty"] == "Easy" && objB["difficulty"] == "Hard") {
                return -1;
            } else if (objA["difficulty"] == "Hard" && objB["difficulty"] == "Easy") {
                return 1;
            } else if (objA["difficulty"] == "Medium" && objB["difficulty"] == "Hard") {
                return -1;
            } else if (objA["difficulty"] == "Hard" && objB["difficulty"] == "Medium") {
                return 1;
            }
        });
        let arr1=[...desc_arr];
        console.log("sord desc", arr1);
        setQuestionArr(arr1);

    }

    const handlePageChange = (pageNumber) => {
        console.log("handle changed called:", pageNumber);
        setPage(pageNumber);
    }

    useEffect(() => {
        console.log("useState Called");
        setLoading(false);
    }, [])



    let noOfpages = Math.ceil(questions_arr.length / limit);
    console.log("no of pages", noOfpages);
    let pageNumberArr = [];

    for (let i = 1; i <= noOfpages; i++) {
        pageNumberArr.push(i);
    }

    let si = (currentPage - 1) * limit;
    let ei = si + limit;
    let filterList = questions_arr.slice(si, ei);

    if (filterList.length == 0 && questions_arr.length != 0) {
        setPage(1);
    }
    

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
                        <div className="sort-icon-container">
                            <i className="fa fa-sort-asc" onClick={sortAscend}></i>
                            <i className="fa fa-sort-desc" onClick={sortDescend}></i>
                        </div>
                    </div>
                    <div className="status">
                        <h4>Status</h4>
                    </div>

                    <div className="Attempt">
                        <h4>Attempt</h4>
                    </div>


                </div>
                {
                    loading == true ?
                        <>
                            <h1>Please wait Loading.....</h1>
                        </> :
                        <>
                            <div className="question-list-container">
                                {console.log("pageNumberArr:", pageNumberArr)}
                               
                                <ul style={{ listStyle: 'none' }} id="question-ul">
                                    {
                                        

                                        filterList.map((data) => {

                                            //let class_name='active';
                                            //let class_name=props.dashboard.curr_questionlist_status!=null?props.dashboard.curr_questionlist_status[curr_module][data["question-no"]].status?'active-div question-wrap':"inactive-div question-wrap":'inactive-div';
                                            let status = (props.allQuestionStatus.curr_questionlist_status[curr_module][data["question-no"]].status);

                                            let class_name = status == true ? 'active-div question-wrap' : 'inactive-div question-wrap';
                                            let bg_color = data["difficulty"] == "Easy" ? "green" : data["difficulty"] == "Hard" ? "red" : "orange";
                                            return (
                                                <div className="list-container">
                                                    <li className="question-li" key={data["question-no"]}>
                                                        <div id="question-container" className={class_name}>
                                                            <div className="question-name">
                                                                <span>{data["question-name"]}</span>
                                                            </div>
                                                            <div style={{ color: bg_color }} className="question-difficulty">
                                                                <span>{data["difficulty"]}</span>
                                                            </div>
                                                            <div className="checkboc-container">
                                                                <input type="checkbox" className="checkBox" defaultChecked={status} id="checkBox" onClick={(e) => toggle(e, curr_module, data["question-no"])}></input>
                                                            </div>
                                                            <div className="question-attempt">

                                                                <a href={data["url"]}>
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

                <nav aria-label="...">
                    <ul className="pagination">

                        {
                            //creating li of number of pages using map
                            pageNumberArr.map(pageNumber => {

                                let classStyleName = pageNumber == currentPage ? 'page-item active' : 'page-item';

                                return (
                                    <li onClick={() =>handlePageChange(pageNumber)} className={classStyleName} key={pageNumber}>
                                        <span className="page-link">{pageNumber}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    // console.log("state-->",state);
    return {
        allQuestionStatus: state.dashboard
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateQuestionStatus: (module, qn) => dispatch(dashboardAction.updateQuestionStatus(module, qn)),
        updateQuestionStatusInFirebase: (module, qn, status) => dispatch(dashboardAction.updateStatusInFirebase(module, qn, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question_list)
