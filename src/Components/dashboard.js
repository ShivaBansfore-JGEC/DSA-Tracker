import React, { useState, useEffect } from 'react';
import Login from './login';
import questions from '../Static/question.json';
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as dashboardAction from '../Actions/dashBoardAction';
import * as authAction from '../Actions/authAction';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import firebase from 'firebase/app';
import Progressbar from './progressBar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



//images
import lock from '../Static/images/lock.png';
import unlock from '../Static/images/unlocked.png';


//material ui
import { makeStyles } from '@material-ui/core/styles';


//-----------------------------

function Dashboard(props) {
    console.log("render");
    console.log("-----> dashboard props:", props);
    const user = firebase.auth().currentUser;
    const firestore = firebase.firestore();
    let cnt = 0;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [solvedQuestion, setSolvedQuestion] = useState(null);
    let history = useHistory();

    //material ui

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            width: 200,
            height: 200,
            margin: 20

        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    //------------------------------------
    const MySwal = withReactContent(Swal)


    useEffect(() => {
        console.log("useeffct 2");


        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                let currUser = user.uid;

                try {
                    let myData = await firestore.collection("users").doc(currUser).get();
                    let dataVal = myData.data();

                    let solved_question = {};
                    let tot_ques = {};
                    let store_data = {}
                    for (let key in dataVal) {
                        if (dataVal[key].status == true)
                            solved_question[dataVal[key].module] = ++solved_question[dataVal[key].module] || 1


                        tot_ques[dataVal[key].module] = ++tot_ques[dataVal[key].module] || 1

                        let new_obj = {}
                        new_obj[key] = dataVal[key];
                        store_data[dataVal[key].module] = { ...store_data[dataVal[key].module], ...new_obj };
                    }
                    console.log("solved questions:", solved_question);
                    console.log("data value", dataVal);
                    props.sendDataToStore(store_data);
                    setData(tot_ques);
                    setSolvedQuestion(solved_question);

                } catch (err) {
                    console.log(toString(err.message));

                }

                console.log("user logged in", user.uid);
            } else {
                history.push('/login');
            }
        });

    }, []);

    const openPopUp = () => {
        MySwal.fire({
            title: <p>Hello World</p>,
            footer: 'Copyright 2018',
            didOpen: () => {
                MySwal.clickConfirm()
            }
        }).then(() => {
            return MySwal.fire(<p>Please complete prevoius module first!.</p>)
        });
    }


    const handleClick = (value) => {

        props.updateModule(value);
        if (value === "Matrix") {
            let nofQuestionsolved=solvedQuestion["Array"]>0?solvedQuestion["Array"]:0;
            let tot=data["Array"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
            
        }else if(value==="String"){
            let nofQuestionsolved=solvedQuestion["Matrix"]>0?solvedQuestion["Matrix"]:0;
            let tot=data["Matrix"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }

        }else if(value==="Hashing"){
            let nofQuestionsolved=solvedQuestion["String"]>0?solvedQuestion["String"]:0;
            let tot=data["String"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }

        }else if(value==="2-pointer"){
            let nofQuestionsolved=solvedQuestion["Hashing"]>0?solvedQuestion["Hashing"]:0;
            let tot=data["Hashing"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }

        }else if(value==="Binary Search"){
            let nofQuestionsolved=solvedQuestion["2-pointer"]>0?solvedQuestion["2-pointer"]:0;
            let tot=data["2-pointer"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }

        }else if(value==="Stack and Queue"){
            let nofQuestionsolved=solvedQuestion["Binary Search"]>0?solvedQuestion["Binary Search"]:0;
            let tot=data["Binary Search"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }else if(value=="LinkedList"){
            let nofQuestionsolved=solvedQuestion["Stack and Queue"]>0?solvedQuestion["Stack and Queue"]:0;
            let tot=data["Stack and Queue"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }

        }else if(value==="Recursion"){
            let nofQuestionsolved=solvedQuestion["LinkedList"]>0?solvedQuestion["LinkedList"]:0;
            let tot=data["LinkedList"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }else if(value==="Backtracking"){
            let nofQuestionsolved=solvedQuestion["Recursion"]>0?solvedQuestion["Recursion"]:0;
            let tot=data["Recursion"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }else if(value==="Greedy"){
            let nofQuestionsolved=solvedQuestion["Backtracking"]>0?solvedQuestion["Backtracking"]:0;
            let tot=data["Backtracking"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }else if(value==="Tree"){
            let nofQuestionsolved=solvedQuestion["Greedy"]>0?solvedQuestion["Greedy"]:0;
            let tot=data["Greedy"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }else if(value==="Graph"){
            let nofQuestionsolved=solvedQuestion["Tree"]>0?solvedQuestion["Tree"]:0;
            let tot=data["Tree"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }else if(value==="Dp"){
            let nofQuestionsolved=solvedQuestion["Graph"]>0?solvedQuestion["Graph"]:0;
            let tot=data["Graph"];
            if(nofQuestionsolved<tot){
                openPopUp();
            }else{
                history.push("/questions", value);
            }
        }
        else {
            history.push("/questions", value);
        }

    }



    const calc = (val1, val2) => {
        val1 = Number(val1);
        val2 = Number(val2);
        let ans = (val1 / val2) * 100;
        ans = Math.floor(ans).toString();
        return ans;
    }

    //inline css
    const loader = {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }


    return (
        <>

            {!isLoaded(props.authFirebase) ? <div style={loader} className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div> :
                <>
                    {data == null || solvedQuestion == null ? <div style={loader} className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> :
                        <>
                            <div className='containers'>
                                <div className='Headline'>
                                    <h4>Track Striver SDE sheet</h4>
                                </div>

                                <div className='topics-container'>

                                    <div className="Level1">
                                        <div className="level1-title">
                                            <h4>level-1</h4>
                                        </div>
                                    </div>
                                    {/*-------------------- Level-1 --------------------------- */}
                                    <div className='level1-container'>
                                        <div onClick={() => handleClick("Array")} class="card">
                                            <div class="card-container">
                                                <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Array</b></h4>
                                                    </div>
                                                    <img className='lock-unlock' src={solvedQuestion["Array"] == 0 ? lock : unlock}></img>
                                                </div>

                                                <div className='card-content'>
                                                    <p className="card-text">Solved : {solvedQuestion["Array"] >= 0 ? solvedQuestion["Array"] : 0}</p>
                                                    <p className="card-text">Total : {data["Array"]}</p>
                                                </div>
                                                <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"] >= 0 ? solvedQuestion["Array"] : 0, data["Array"])} height={30} />
                                            </div>
                                        </div>

                                        <div onClick={() => handleClick("Matrix")} class="card">
                                            <div class="card-container">
                                                <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Matrix</b></h4>
                                                    </div>
                                                    <img className='lock-unlock' src={(solvedQuestion["Array"] == data["Array"] || solvedQuestion["Matrix"] > 0) ? unlock : lock}></img>
                                                </div>

                                                <div className='card-content'>
                                                    <p className="card-text">Solved : {solvedQuestion["Matrix"] >= 0 ? solvedQuestion["Matrix"] : 0}</p>
                                                    <p className="card-text">Total : {data["Matrix"]}</p>
                                                </div>
                                                <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Matrix"] >= 0 ? solvedQuestion["Matrix"] : 0, data["Matrix"])} height={30} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="Level1">
                                        <div className="level1-title">
                                            <h4>level-2</h4>
                                        </div>
                                    </div>
                                    {/*-------------------- Level-2 --------------------------- */}
                                    <div className="level-2-container">
                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("String")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>String</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["String"] >= 0 ? solvedQuestion["String"] : 0}</p>
                                                        <p className="card-text">Total : {data["String"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["String"] >= 0 ? solvedQuestion["String"] : 0, data["String"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Hashing")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Hashing</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Hashing"] >= 0 ? solvedQuestion["Hashing"] : 0}</p>
                                                        <p className="card-text">Total : {data["Hashing"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Hashing"] >= 0 ? solvedQuestion["Hashing"] : 0, data["Hashing"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("2-pointer")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>2-pointer</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["2-pointer"] >= 0 ? solvedQuestion["2-pointer"] : 0}</p>
                                                        <p className="card-text">Total : {data["2-pointer"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["2-pointer"] >= 0 ? solvedQuestion["2-pointer"] : 0, data["2-pointer"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Binary Search")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Binary Search</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Binary Search"] >= 0 ? solvedQuestion["Binary Search"] : 0}</p>
                                                        <p className="card-text">Total : {data["Binary Search"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Binary Search"] >= 0 ? solvedQuestion["Binary Search"] : 0, data["Binary Search"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                    {/*-------------------- Level-3 --------------------------- */}
                                    <div className="Level1">
                                        <div className="level1-title">
                                            <h4>level-3</h4>
                                        </div>
                                    </div>
                                    <div className="level-2-container">
                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Stack and Queue")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Stack & Queue</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Stack and Queue"] >= 0 ? solvedQuestion["Stack and Queue"] : 0}</p>
                                                        <p className="card-text">Total : {data["Stack and Queue"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Stack and Queue"] >= 0 ? solvedQuestion["Stack and Queue"] : 0, data["Stack and Queue"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("LinkedList")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>LinkedList</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["LinkedList"] >= 0 ? solvedQuestion["LinkedList"] : 0}</p>
                                                        <p className="card-text">Total : {data["LinkedList"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["LinkedList"] >= 0 ? solvedQuestion["LinkedList"] : 0, data["LinkedList"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Recursion")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Recursion</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Recursion"] >= 0 ? solvedQuestion["Recursion"] : 0}</p>
                                                        <p className="card-text">Total : {data["Recursion"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Recursion"] >= 0 ? solvedQuestion["Recursion"] : 0, data["Recursion"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Backtracking")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Backtracking</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Backtracking"] >= 0 ? solvedQuestion["Backtracking"] : 0}</p>
                                                        <p className="card-text">Total : {data["Backtracking"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Backtracking"] >= 0 ? solvedQuestion["Backtracking"] : 0, data["Backtracking"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                    </div>
                                    {/*-------------------- Level-4 --------------------------- */}
                                    <div className="Level1">
                                        <div className="level1-title">
                                            <h4>level-4</h4>
                                        </div>
                                    </div>
                                    <div className="level-2-container">
                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Greedy")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Greedy</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Greedy"] >= 0 ? solvedQuestion["Greedy"] : 0}</p>
                                                        <p className="card-text">Total : {data["Greedy"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Greedy"] >= 0 ? solvedQuestion["Greedy"] : 0, data["Greedy"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Tree")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Tree</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Tree"] >= 0 ? solvedQuestion["Tree"] : 0}</p>
                                                        <p className="card-text">Total : {data["Tree"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Tree"] >= 0 ? solvedQuestion["Tree"] : 0, data["Tree"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Graph")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Graph</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Graph"] >= 0 ? solvedQuestion["Graph"] : 0}</p>
                                                        <p className="card-text">Total : {data["Graph"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Graph"] >= 0 ? solvedQuestion["Graph"] : 0, data["Graph"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Dp")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                            <h4 className='card-title'><b>Dp</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={unlock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Dp"] >= 0 ? solvedQuestion["Dp"] : 0}</p>
                                                        <p className="card-text">Total : {data["Dp"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Dp"] >= 0 ? solvedQuestion["Dp"] : 0, data["Dp"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                </div>
                            </div>
                        </>

                    }

                </>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        allQuestionStatus: state.dashboard,
        authMine: state.auth,
        authFirebase: state.firebase.auth,
        setUser: state.setCurrentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(authAction.signout()),
        sendDataToStore: (data) => dispatch(dashboardAction.sendDataToStore(data)),
        updateModule: (module) => dispatch(dashboardAction.updateCurrModule(module))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
