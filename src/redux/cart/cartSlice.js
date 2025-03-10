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

        [THIS_SLICE_ENTITY]:[],
        [THIS_SLICE_OPTIONS]:[]
    },
    reducers:{
        createStart: (state,action) => {
            state.createStarted=true;
            state.createError="";
            console.log("=== product_ isCreating1",action);
        },
        create: (state,action) => {
            console.log("=== product_ createExecute true ",action);
        },
        createSuccess: (state,action) => {
            state[THIS_SLICE_ENTITY] = [...state[THIS_SLICE_ENTITY],{id:action.payload.id, name:action.payload.name+ ' #' + action.payload.id }]
            state.createStarted=false;
            console.log("=== catCreateSuccess1 action ",action);
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
            const newData=[]
            state[THIS_SLICE_ENTITY]=newData
            state.deleteStarted=false;
        },
        deleteSuccess: (state,action) => {
            state.deleteStarted=false;
        },
        deleteFailure: (state,action) => {
            state.deleteStarted=false;
            state.deleteError=action.payload.deleteError;
        },

    }
})

// export const productsRead=(p)=> {
//     return abstractSlice.actions.read(p)
// }
export const cartActions = {

    createStart             : abstractSlice.actions.createStart ,
    create                  : abstractSlice.actions.create,
    cartCreateSuccess    : abstractSlice.actions.createSuccess,

    read        : abstractSlice.actions.read,
    readSuccess : abstractSlice.actions.readSuccess,
    readFailure : abstractSlice.actions.readFailure,

    deleteStart   : abstractSlice.actions.deleteStart,
    delete        : abstractSlice.actions.delete,
    deleteFailure : abstractSlice.actions.deleteFailure,
    cartDeleteSuccess    : abstractSlice.actions.deleteSuccess,


};

export const cartSlice=abstractSlice

export const cartReducer=abstractSlice.reducer

