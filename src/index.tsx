

import { createRoot } from 'react-dom/client';

import './index.css'
import './styles.css'

import { Provider } from 'react-redux';
import reduxStore from "./redux/reduxStore";

import React, {Suspense} from "react";
import {LayoutPage} from "./view/LayoutPage";
import DataJsonGenerator from "./database/generator/DataJsonGenerator";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import ProductDetailsPage from "./view/product/ProductDetailsPage";
import ProductsGallery from "./view/product/ProductsGallery";
import App from "./App";


const container = document.getElementById('root');

// const generatorMode = true
const generatorMode = false

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


