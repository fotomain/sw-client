/** @jsxImportSource @emotion/react */

import React, {useDeferredValue, useEffect, useState} from "react";

import {css} from "@emotion/react";
import {ui} from "../LayoutPage";
import IconSearch from "../core/universal/IconSearch";
import {uiSlice} from "../../redux/ui/uiSlice";
import {useDispatch} from "react-redux";

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
            key: "globalSearchText",
            value: state.searchText,
        }))
    },[deferredText])

    return <form
        css={css` 
            flex-grow: 1;
            margin-right: 24px; 
            margin-left: 24px;
            border-bottom: 1px solid ${ui.colorMain};
            justify-content:center; align-items:center; flex-direction: row; display: flex;
        `}
         onSubmit={handleSubmit}
    >
        <IconSearch/>
        <input
            css={css` 
                width:100%; border: none; font-size: 24px;
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
