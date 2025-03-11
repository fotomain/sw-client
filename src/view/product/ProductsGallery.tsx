/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";

import useStyles from '../../styles';

import {useDispatch, useSelector} from "react-redux";
import {productActions, productSlice} from "../../redux/product/productSlice";
import {Button, TextField} from "@mui/material";
import ClassWooEntity from "../../api/WooEntityRoot";
import {READ_PRODUCTS_QUERY} from "../../redux/product/READ_PRODUCTS_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "../../redux/cart/graphql/ADD_TO_CART_MUTATION";
import ProductCard from "./ProductCard";
import ProductDetailsPage from "./ProductDetailsPage";
import {css} from "@emotion/react";

const debug_local=true
export const ProductsGallery = () => {


    const createStarted = useSelector((state:any) => state.productsState.createStarted);
    const productsState = useSelector((state:any) => state.productsState );
    const isReading = useSelector((state:any) => state.productsState.isReading);
    const deleteStarted = useSelector((state:any) => state.productsState.deleteStarted);
    const deleteError = useSelector((state:any) => state.productsState.deleteError);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        console.log("dispatch1")
        dispatch(productSlice.actions.read({scope:'all'}))
    }, []);

    const initState={
        name: '',
        stateMoment: 0,
        // name: 'Am'
    }
    const [state, setState] = useState(initState);

    const handleSubmit = (e:any) => {
        e.preventDefault();
    };

    useEffect(() => {
        if(0!==state.stateMoment) {
            console.log('=== state.name', state.name)
            //dispatch(getMovies(name));
            dispatch(productActions.read({filter: {name: state.name}}))
        }}, [state.name]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
            <h3 className={classes.title}>Products</h3>
            <h4>{(deleteStarted) ? 'Serverside delete started...' : null}</h4>
            <h4>{(deleteError) ? 'deleteError ' + deleteError : null}</h4>

            <form className={classes.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    // fullWidth
                    value={state.name}
                    // sx={{ m: 1, width: '55ch' }}
                    onChange={(e: any) => setState((prevState) => {
                        return ({
                            ...prevState,
                            name: e.target.value,
                            stateMoment: Date.now()
                        })
                    })}
                />
                {/*{error && <p className={classes.error}>{error}</p>}*/}
            </form>


            {((isReading)) ? null :
                <div style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                    <Button
                        variant={"contained"}
                        onClick={async () => {

                            const runParams = {
                                all: true,
                                // 'search':'Pork',
                                'id': 6791,
                                // 'entity_guid':'prod735x4',
                                'per_page': 100,
                                'page': 1,
                            }

                            console.log("res1")
                            const woo_products = new ClassWooEntity('products')
                            const readDataAll = await woo_products.read(
                                runParams
                            )

                            console.log("██████ readDataAll", readDataAll.data)

                        }}
                    >
                        READ ALL
                    </Button>
                </div>
            }

            <h4>{(isReading) ? 'Products Loading...' : null}</h4>

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

                {((!isReading) && (0 !== productsState.productsArray.length)) && productsState.productsArray.map((el: any, i: number) => {
                    return <React.Fragment key={i}>

                        <ProductDetailsPage product={el} productIndex={i}/>

                    </React.Fragment>
                })}

            </div>

        </div>
    );
};

export default ProductsGallery
