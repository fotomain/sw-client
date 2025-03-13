

import { createRoot } from 'react-dom/client';

import './index.css'
import './styles.css'

import { Provider } from 'react-redux';
import reduxStore from "./redux/reduxStore";

import React from "react";
import {HomePage} from "./view/HomePage";
import DataJsonGenerator from "./database/generator/DataJsonGenerator";
const container = document.getElementById('root');

// const generatorMode = true
const generatorMode = false

if(container) {
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
        <Provider store={reduxStore}>
            {generatorMode && <DataJsonGenerator/>}
            <HomePage/>
        </Provider>
    );
}


