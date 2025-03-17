/** @jsxImportSource @emotion/react */

import {useEffect} from "react";
import {productSlice} from "../redux/product/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {categorySlice} from "../redux/category/categorySlice";
import {dividerClasses} from "@mui/material";
import {css} from "@emotion/react";
import {ui} from "./LayoutPage";
import {uiSlice} from "../redux/ui/uiSlice";
import {NavigateOptions, useNavigate} from "react-router";

const MenuDesktop = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const uiState = useSelector((state:any) => state.uiState );

    const categoryState = useSelector((state:any) => state.categoryState );

    console.log("categoryState1",categoryState)

    useEffect(() => {
        dispatch(categorySlice.actions.read({}))
    }, []);

    return <menu css={css`
            cursor: pointer;
            margin-right: auto; //background-color:red;
            margin-left: 12px;         
            justify-content:flex-start; flex-direction:row; display: flex; padding: 0; width: auto;` } >
        {/*<div>{JSON.stringify(uiState.menuActiveItem)}</div>*/}
            <ul
                css={css`
                    margin-left: 0;
                    padding: 0;
                    width:auto;
                    list-style-type: none;
                    justify-content: start;
                    align-items: center;
                    gap: 12px;
                    flex-direction: row;
                    display: flex;
                `}
            >
                {!(categoryState.categoriesArray && categoryState.categoriesArray.length>0)?null
                    :categoryState.categoriesArray.map((el:any,ii:number)=>{
                        return <li css={css`
                        height: 28px;
                        border-bottom: 1px solid ${(ii===uiState.menuActiveItem.menuNumber)?ui.colorMain:'transparent'};
                        color: ${(ii===uiState.menuActiveItem.menuNumber)?ui.colorMain:'black'};
                    `}
                               onClick={()=>{
                                   dispatch(uiSlice.actions.setValue({
                                       key:"menuActiveItem",
                                       value: {menuNumber:ii, category_name:el.name},
                                   }))

                                   navigate(`/home`,
                                       { state: {category_name:el.name} } as NavigateOptions
                                   )

                               }}

                    >
                        {el.display_name.toUpperCase()}
                    </li>
                })}
            </ul>
  </menu>
}

export default MenuDesktop
