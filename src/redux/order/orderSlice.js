
import {createSlice} from "@reduxjs/toolkit";

const THIS_SLICE_ENTITY = 'orderArray'
const THIS_SLICE_NAME = 'orderSlice'

const abstractSlice=createSlice({
    name: THIS_SLICE_NAME,
    initialState:{

        createStarted:false,
        momentCreated:0,
        createError:'',

        isReading:false,
        readError:'',

        deleteStarted:false,
        deleteError:'',

        [THIS_SLICE_ENTITY]:[],
    },
    reducers:{
        createStart: (state,action) => {
            state.createStarted=true;
            state.createError="";
        },
        create: (state,action) => {

        },
        createSuccess: (state,action) => {

            state[THIS_SLICE_ENTITY] = action.payload;
            state.momentCreated=Date.now();
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

            state[THIS_SLICE_ENTITY] = action.payload;
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
            state[THIS_SLICE_ENTITY]=action.payload;
            state.deleteStarted=false;
        },
        deleteFailure: (state,action) => {
            state.deleteStarted=false;
            state.deleteError=action.payload.deleteError;
        },

    }
})

export const orderActions = {

    createStart             : abstractSlice.actions.createStart ,
    create                  : abstractSlice.actions.create,
    createSuccess           : abstractSlice.actions.createSuccess,

    read        : abstractSlice.actions.read,
    readSuccess : abstractSlice.actions.readSuccess,
    readFailure : abstractSlice.actions.readFailure,

    deleteStart   : abstractSlice.actions.deleteStart,
    delete        : abstractSlice.actions.delete,
    deleteFailure : abstractSlice.actions.deleteFailure,
    deleteSuccess : abstractSlice.actions.deleteSuccess,


};

export const orderSlice=abstractSlice

export const orderReducer=abstractSlice.reducer

