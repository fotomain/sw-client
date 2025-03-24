

import { createRoot } from 'react-dom/client';

import './index.css'
import './styles.css'

import { Provider } from 'react-redux';
import reduxStore from "./redux/reduxStore";

import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";

const container = document.getElementById('root');

if(container) {
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
        <Provider store={reduxStore}>

            <Router
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >

                <App/>

            </Router>

        </Provider>
    );
}


