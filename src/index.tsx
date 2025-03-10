

import { createRoot } from 'react-dom/client';

import './index.css'
import './styles.css'

import { Provider } from 'react-redux';
import reduxStore from "./redux/reduxStore";

import React from "react";
import {HomePage} from "./view/HomePage";
const container = document.getElementById('root');


if(container) {
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
        <Provider store={reduxStore}>
            <HomePage/>
        </Provider>
    );
}


