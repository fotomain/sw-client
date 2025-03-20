/** @jsxImportSource @emotion/react */

import React, {useDeferredValue, useEffect, useState} from "react";

import {css} from "@emotion/react";

import IconSearch from "../core/universal/IconSearch";
import {globalSearchText, uiSlice} from "../../redux/ui/uiSlice";
import {useDispatch, useSelector} from "react-redux";

const InputSearchNavBar = () => {

    const initState={
        searchText: '',
        stateMoment: 0,
        // name: 'Am'
    }
    const [state, setState] = useState(initState);

    const deferredText = useDeferredValue(state.searchText);

    const handleSubmit = (e:any) => {
        e.preventDefault();
    };

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("deferredQuery1",deferredText)
        dispatch(uiSlice.actions.setValue({
            key: globalSearchText,
            value: state.searchText,
        }))
    },[deferredText])

    const uiState = useSelector((state:any) => state.uiState );

    return <form
        css={css` 
            height: 28px; //params1 ui.heightMenuAndInputSearch
            flex-grow: 1;
            margin-right: 24px; 
            margin-left: 24px;
            border-bottom: 1px solid ${uiState.colorPrimary};
            justify-content:center; align-items:center; flex-direction: row; display: flex;
        `}
         onSubmit={handleSubmit}
    >
        <IconSearch/>
        <input
            css={css` 
                width:100%; border: none; font-size: 20px;
                outline: none;
            `}
            type="text"
            // fullWidth
            value={state.searchText}
            // sx={{ m: 1, width: '55ch' }}
            onChange={(e: any) => setState((prevState) => {
                return ({
                    ...prevState,
                    searchText: e.target.value,
                    stateMoment: Date.now()
                })
            })}
        />
        {/*{error && <p className={classes.error}>{error}</p>}*/}
    </form>

}

export default InputSearchNavBar;
