import {Route, Routes} from "react-router-dom";
import {LayoutPage} from "./view/LayoutPage";
import ProductsGallery from "./view/product/ProductsGallery";
import ProductDetailsPage from "./view/product/ProductDetailsPage";
import React, {useEffect} from "react";
import {categorySlice} from "./redux/category/categorySlice";
import {useDispatch, useSelector} from "react-redux";

const App = () => {

    const dispatch = useDispatch();
    const categoryState = useSelector((state:any) => state.categoryState );

    useEffect(() => {
        dispatch(categorySlice.actions.read({}))
    }, []);


    return<>

        <Routes>

            <Route path='/' element={<LayoutPage />} >

                <Route index element={<ProductsGallery/>} />

                <Route path='/home' element={<ProductsGallery/>} />

                <Route
                    path="/product"
                    element = {<ProductDetailsPage />}
                />

                {(!categoryState.categoriesArray || 0===categoryState.categoriesArray.length)?null
                    :categoryState.categoriesArray.map((el:any,ii:number)=> {
                        return <Route path={'/' +el.name} element={<ProductsGallery/>} key={ii}  />
                    })
                }

            </Route>

        </Routes>

    </>
}

export default App
