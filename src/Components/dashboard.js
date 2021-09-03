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

//images
import lock from '../Static/images/lock.png';


//material ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                    console.log(solved_question);
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


    const handleClick = (value) => {

        props.updateModule(value);
        //props.loadData();
        history.push("/questions", value);
    }



    const calc = (val1, val2) => {
        val1 = Number(val1);
        val2 = Number(val2);
        let ans = (val1 / val2) * 100;
        ans = Math.floor(ans).toString();
        return ans;
    }


    return (
        <>

            {!isLoaded(props.authFirebase) ? <h1>Please Login First</h1> :
                <>
                    {data == null || solvedQuestion == null ? <h1>Please wait fetching.....</h1> :
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
                                                    <img className='lock-unlock' src={lock}></img>
                                                </div>

                                                <div className='card-content'>
                                                    <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                    <p className="card-text">Total : {data["Array"]}</p>
                                                </div>
                                                <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                            </div>
                                        </div>

                                        <div onClick={() => handleClick("Matrix")} class="card">
                                            <div class="card-container">
                                                <div className="card-header">
                                                <div className="topic-title">
                                                        <h4 className='card-title'><b>Matrix</b></h4>
                                                        </div>
                                                    <img className='lock-unlock' src={lock}></img>
                                                </div>

                                                <div className='card-content'>
                                                    <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                    <p className="card-text">Total : {data["Array"]}</p>
                                                </div>
                                                <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
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
                                            <div onClick={() => handleClick("Array")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>String</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Matrix")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Hashing</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Array")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>2-pointer</b></h4>
                                                    </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Matrix")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                        <div className="topic-title">
                                                        <h4 className='card-title'><b>Binary Search</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
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
                                            <div onClick={() => handleClick("Array")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Stack & Queue</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Matrix")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>LinkedList</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Array")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Recursion</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Matrix")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Backtracking</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
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
                                            <div onClick={() => handleClick("Array")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Greedy</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Matrix")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Tree</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>



                                        </div>

                                        <div className='level1-container'>
                                            <div onClick={() => handleClick("Array")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Graph</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
                                                </div>
                                            </div>

                                            <div onClick={() => handleClick("Matrix")} class="card">
                                                <div class="card-container">
                                                    <div className="card-header">
                                                    <div className="topic-title">
                                                        <h4 className='card-title'><b>Dp</b></h4>
                                                        </div>
                                                        <img className='lock-unlock' src={lock}></img>
                                                    </div>

                                                    <div className='card-content'>
                                                        <p className="card-text">Solved : {solvedQuestion["Array"]}</p>
                                                        <p className="card-text">Total : {data["Array"]}</p>
                                                    </div>
                                                    <Progressbar bgcolor="#99ff66" progress={calc(solvedQuestion["Array"], data["Array"])} height={30} />
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
        updateModule:(module)=>dispatch(dashboardAction.updateCurrModule(module))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
