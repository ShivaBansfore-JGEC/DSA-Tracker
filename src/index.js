import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import rootReducer from './Reducers/rootReducer';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools} from 'redux-devtools-extension'


const firebaseConfig = {
  apiKey: "AIzaSyB8ukQ2uX1KHFi3pgTgCoMeeVr8fo8CeK0",
  authDomain: "dsa-tracker-c4538.firebaseapp.com",
  projectId: "dsa-tracker-c4538",
  storageBucket: "dsa-tracker-c4538.appspot.com",
  messagingSenderId: "862932677070",
  appId: "1:862932677070:web:407e0eda8b1634dda47b9f"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();



const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), 
    reduxFirestore(firebase) // redux bindings for firestore,  
  )
);



ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}
      >
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
