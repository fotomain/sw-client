import {createSlice} from "@reduxjs/toolkit";

const THIS_SLICE_ENTITY = 'cartArray'
const THIS_SLICE_OPTIONS = 'cartOptionsArray'
const THIS_SLICE_NAME = 'cartSlice'

const abstractSlice=createSlice({
    name: THIS_SLICE_NAME,
    initialState:{

        createStarted:false,
        createError:'',

        isReading:false,
        readError:'',

        deleteStarted:false,
        deleteError:'',

        [THIS_SLICE_ENTITY]:{},
        [THIS_SLICE_OPTIONS]:[],

        isEmpty:true,
        cartGUID:'',

        createCartStarted:false,

    },
    reducers:{
        createStart: (state,action) => {
            state.createStarted=true;
            state.createError="";
            // console.log("=== cart_ isCreating1",action);
        },
        create: (state,action) => {
            // console.log("=== cart_ createExecute true ",action);
        },
        createSuccess: (state,action) => {
            console.log("createSuccess action8",action.payload?.cart_lines?.length, action.payload)
            state[THIS_SLICE_ENTITY] = action.payload;
            state.isEmpty=(action.payload?.cart_lines?.length===0);
            state.createStarted=false;
        },
        createFailure: (state,action) => {
            state.isReading=false;
            state.createError=action.payload.createError;
        },

        read: (state,action) => {
            state.isReading=true;
            state.readError="";
        },
        readSuccess: (state,action) => {
            console.log("readSuccess action101",action.payload)
            state[THIS_SLICE_ENTITY] = action.payload;
            if(null===action.payload) {
                state.isEmpty=true;
            }else {
                state.isEmpty=(action.payload?.cart_lines?.length===0);
            }
            state.isReading=false;
        },
        readFailure: (state,action) => {
            state.isReading=false;
            state.readError=action.payload.readError;
        },

        deleteStart: (state,action) => {
            state.deleteStarted=true;
            state.deleteError="";
        },
        delete: (state,action) => {
            // const newData=[]
            state.deleteStarted=false;
        },
        deleteSuccess: (state,action) => {
            console.log("delete8 action.payload",action.payload)
            state[THIS_SLICE_ENTITY]=action.payload;
            state.isEmpty=(action.payload?.cart_lines?.length===0);
            state.deleteStarted=false;
        },
        deleteFailure: (state,action) => {
            state.deleteStarted=false;
            state.deleteError=action.payload.deleteError;
        },

        setCartGUID: (state,action) => {
            state.cartGUID=action.payload;
        },

        createCartStart: (state,action) => {
            state.createCartStarted=true;
        },

        createCart: (state,action) => {
            // go to saga
        },
        createCartSuccess: (state,action) => {
            state.cartGUID=action.payload;
            state.createCartStarted=false;
        },

        deleteCart: (state,action) => {

        },
        deleteCartStart: (state,action) => {

        },
        deleteCartSuccess: (state,action) => {

        },


    }
})

export const cartActions = {

    createStart             : abstractSlice.actions.createStart ,
    create                  : abstractSlice.actions.create,
    createSuccess       : abstractSlice.actions.createSuccess,

    read        : abstractSlice.actions.read,
    readSuccess : abstractSlice.actions.readSuccess,
    readFailure : abstractSlice.actions.readFailure,

    deleteStart   : abstractSlice.actions.deleteStart,
    delete        : abstractSlice.actions.delete,
    deleteFailure : abstractSlice.actions.deleteFailure,
    deleteSuccess : abstractSlice.actions.deleteSuccess,

    setCartGUID         : abstractSlice.actions.setCartGUID,
    createCart          : abstractSlice.actions.createCart,
    createCartStart     : abstractSlice.actions.createCartStart,
    createCartSuccess   : abstractSlice.actions.createCartSuccess,

    deleteCart          : abstractSlice.actions.deleteCart,
    deleteCartStart     : abstractSlice.actions.deleteCartStart,
    deleteCartSuccess   : abstractSlice.actions.deleteCartSuccess,


};

export const cartSlice=abstractSlice

export const cartReducer=abstractSlice.reducer

