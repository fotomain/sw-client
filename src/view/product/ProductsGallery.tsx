/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";

import useStyles from '../../styles';

import {useDispatch, useSelector} from "react-redux";
import {productActions, productSlice} from "../../redux/product/productSlice";
import {Button, TextField} from "@mui/material";
import ClassWooEntity from "../../api/WooEntityRoot";

import {css} from "@emotion/react";
import ProductCardForGallery from "./card/ProductCardForGallery";
import {useLocation} from "react-router-dom";
import {capitalizeFirstLetter} from "../../redux/product/READ_PRODUCTS_QUERY";

const debug_local=true
export const ProductsGallery = () => {


    const createStarted = useSelector((state:any) => state.productsState.createStarted);
    const productsState = useSelector((state:any) => state.productsState );
    const isReading = useSelector((state:any) => state.productsState.isReading);
    const deleteStarted = useSelector((state:any) => state.productsState.deleteStarted);
    const deleteError = useSelector((state:any) => state.productsState.deleteError);
    const dispatch = useDispatch();



    const  routerParams= useLocation();
    console.log("routerParams555 routerParams.pathname1",routerParams.pathname)

    const categoryState = useSelector((state:any) => state.categoryState );

    useEffect(() => {

        if("/"!==routerParams.pathname) {
            let tName = routerParams.pathname.replace("/", "")
            tName = ('all' === tName) ? '' : tName
            tName = capitalizeFirstLetter(tName)

            dispatch(productSlice.actions.read({
                category_name: tName
            }))
        }
        else {
            if(0!==categoryState.categoriesArray.length) {
                console.log("categoryState.categoriesArray1", categoryState.categoriesArray)
                dispatch(productSlice.actions.read({
                    category_name: categoryState.categoriesArray[0].name,
                }))
            }        }
        }, [routerParams.pathname,categoryState.categoriesArray]);

    const initState={
        name: '',
        stateMoment: 0,
        // name: 'Am'
    }
    const [state, setState] = useState(initState);

    const uiState = useSelector((state:any) => state.uiState );

    useEffect(() => {
            console.log('=== globalSearchText1', uiState.globalSearchText)
            dispatch(productActions.read({filter: {name: uiState.globalSearchText}}))
        },
        [uiState.globalSearchText]
    );

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',
            // NavBar
            paddingTop:'45px'
        }}>


            <h4>{(isReading && 0===productsState.productsArray.length) ? 'Products Loading...' : null}</h4>


            <div
                css={css`
                    width: 100vw;
                    gap:12px; 
                    flex-direction: row; display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    //background-color: red;
                `}
            >

                {((0 !== productsState.productsArray.length)) && productsState.productsArray.map((el: any, i: number) => {
                    return <React.Fragment key={i}>

                        {/*<ProductDetailsPage product={el} productIndex={i}/>*/}
                        <ProductCardForGallery product={el} productIndex={i}/>


                    </React.Fragment>
                })}

            </div>

        </div>
    );
};

export default ProductsGallery
