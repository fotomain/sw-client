/** @jsxImportSource @emotion/react */

import React, {useDeferredValue, useEffect, useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {productActions, productSlice} from "../../redux/product/productSlice";

import {css} from "@emotion/react";
import ProductCardForGallery from "./card/ProductCardForGallery";
import {useLocation} from "react-router-dom";
export const ProductsGallery = () => {

    const productsState = useSelector((state:any) => state.productsState );
    const dispatch = useDispatch();


    const  routerParams= useLocation();
    console.log("routerParams555 routerParams.pathname1",routerParams.pathname)

    const categoryState = useSelector((state:any) => state.categoryState );

    const uiState = useSelector((state:any) => state.uiState );

    useEffect(() => {

            let filterFinal ={}
            if(categoryState.activeCategory){
                filterFinal={...filterFinal,category_name:
                        ("all"===categoryState.activeCategory.name?"":categoryState.activeCategory.name)
                }
                filterFinal={...filterFinal,filter: {filterProductName: uiState.globalSearchText}}

                console.log("categoryState.activeCategory1",filterFinal)

                dispatch(productActions.read(filterFinal))
            }
        },
        [categoryState.activeCategory,uiState.globalSearchText]
    );

    const WorkList = (props:any) =>{
        const {workData}=props;
        const stableArray = useDeferredValue(workData)
        console.log("stableArray1",stableArray)

        const ProductsList = useMemo(() => {

                return stableArray.map((el: any, i: number) => {
                        return <React.Fragment key={i}>

                            {/*<ProductDetailsPage product={el} productIndex={i}/>*/}
                            <ProductCardForGallery product={el} productIndex={i}/>

                        </React.Fragment>
                    }
                )

            }
            , [stableArray]);

        return <>{ProductsList}</>

    }

    return (
        <div
            style={{
                display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',
                // NavBar
                paddingTop:'45px'
            }}
        >

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

                {(null===categoryState.activeCategory)?null:
                    <WorkList workData={productsState.productsArray}/>
                }

            </div>

        </div>
    );
};

export default ProductsGallery
