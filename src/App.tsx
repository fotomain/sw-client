import {Navigate, Route, Routes} from "react-router-dom";
import {LayoutPage} from "./view/LayoutPage";
import ProductsGallery from "./view/product/ProductsGallery";
import ProductDetailsPage from "./view/product/ProductDetailsPage";
import React, {useEffect} from "react";
import {categorySlice} from "./redux/category/categorySlice";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice} from "./redux/cart/cartSlice";
import {css} from "@emotion/react";
import SpinnerFast from "./view/SpinnerFast";

const App = () => {

    const dispatch = useDispatch();
    const categoryState = useSelector((state:any) => state.categoryState );
    const cartState = useSelector((state:any) => state.cartState );

    useEffect(() => {
        dispatch(categorySlice.actions.read({}))
    }, []);

    useEffect(() => {

        // const del1 = localStorage.removeItem("cartID")
        const cartLocalGUID = localStorage.getItem("cartID")
        if(''===cartState.cartGUID) {
            if (null !== cartLocalGUID) {
                console.log("=== CREATE_CART_MUTATION cartLocalId exist ", cartLocalGUID)
                dispatch(cartSlice.actions.setCartGUID(cartLocalGUID))
            } else {
                dispatch(cartSlice.actions.createCart({}))
            }
        }
        else {
            // if (null == cartLocalGUID) {
                // always if login or after new order
                localStorage.setItem("cartID", cartState.cartGUID)
            // }
        }
    }, [cartState.cartGUID]);

    return<>

        <Routes>

            <Route path='/' element={<LayoutPage />} >

                <Route index element={<ProductsGallery/>} />

                <Route path='/home' element={<ProductsGallery/>} />

                <Route
                    path="/product"
                    element = {<ProductDetailsPage />}
                />

                {(!(categoryState.categoriesArray && (0!==categoryState.categoriesArray.length)))?null
                    :categoryState.categoriesArray.map((el:any,ii:number)=> {
                        return <Route path={'/' +el.name} element={<ProductsGallery/>} key={ii}  />
                    })
                }

            </Route>

        </Routes>

    </>
}

export default App
