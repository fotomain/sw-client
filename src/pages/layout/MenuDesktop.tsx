/** @jsxImportSource @emotion/react */

import {useDispatch, useSelector} from "react-redux";
import {categorySlice} from "../../redux/category/categorySlice";

import {css} from "@emotion/react";

import {uiSlice} from "../../redux/ui/uiSlice";

import {Link} from "react-router-dom";

const MenuDesktop = () => {

    const dispatch = useDispatch();
    const uiState = useSelector((state: any) => state.uiState);

    const categoryState = useSelector((state: any) => state.categoryState);

    return <menu css={css`
        cursor: pointer;
        margin-right: auto; //background-color:red;
        margin-left: 12px;
        justify-content: flex-start;
        flex-direction: row;
        display: flex;
        padding: 0;
        width: auto;`}>
        {/*<div>{JSON.stringify(uiState.menuActiveItem)}</div>*/}
        <ul
            css={css`
                margin-left: 0;
                padding: 0;
                width: auto;
                list-style-type: none;
                justify-content: start;
                align-items: center;
                gap: 12px;
                flex-direction: row;
                display: flex;
            `}
        >
            {(0 === categoryState.categoriesArray.length) ? null
                : categoryState.categoriesArray.map((el: any, ii: number) => {
                    return <li
                        key={ii}
                        css={css`
                            height: 28px; //params1 ui.heightMenuAndInputSearch
                            border-bottom: 1px solid ${(ii === uiState.menuActiveItem.menuNumber) ? uiState.colorPrimary : 'transparent'};
                        `}
                        onClick={() => {
                            dispatch(uiSlice.actions.setValue({
                                key: "menuActiveItem",
                                value: {menuNumber: ii, category_name: el.name},
                            }))

                            dispatch(categorySlice.actions.setValue({
                                key: "activeCategory",
                                value: el,
                            }))

                            // navigate(`/`+el.name )

                        }}

                    >
                        <Link
                            data-testid={(ii === uiState.menuActiveItem.menuNumber) ? 'active-category-link' : 'category-link'}
                            css={css`
                                color: ${(ii === uiState.menuActiveItem.menuNumber) ? uiState.colorPrimary : 'black'};
                                text-decoration: none;
                            `}
                            to={`/` + el.name}>
                            {el.display_name.toUpperCase()}
                        </Link>
                    </li>
                })}
        </ul>
    </menu>
}

export default MenuDesktop
