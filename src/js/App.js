import React, { Component } from "react";
import ReactDOM from "react-dom";
//import CSS from '../css/main.scss'
//import {AppContainer} from "containers/AppContainer";
import 'babel-polyfill'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import 'bootstrap';
import CSS from '../css/main.scss'
import AppContainer from 'containers/AppContainer'

const wrapper = document.getElementById("root");
let store = createStore(reducers);
const app = ()=>{
    const itemClass = "app__item";
    return   <Provider store={store}>
                    <AppContainer />  
            </Provider>
}


wrapper ? ReactDOM.render(app(), wrapper) : false;
