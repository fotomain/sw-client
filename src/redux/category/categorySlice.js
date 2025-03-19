import {createSlice} from "@reduxjs/toolkit";

const THIS_SLICE_ENTITY = 'categoriesArray'
const THIS_SLICE_NAME = 'categorySlice'

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

        activeCategory:'',

    },
    reducers:{
        setValue: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        createStart: (state,action) => {
            state.createStarted=true;
            state.createError="";
            console.log("=== category_ isCreating1",action);
        },
        create: (state,action) => {
            console.log("=== category_ createExecute true ",action);
        },
        createSuccess: (state,action) => {
            console.log("createSuccess action1",action.payload)
            state[THIS_SLICE_ENTITY] = action.payload;
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
            console.log("readSuccess action3",action.payload)
            state[THIS_SLICE_ENTITY] = action.payload;
            if(""===state.activeCategory){
                state.activeCategory=action.payload[0];
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
            state[THIS_SLICE_ENTITY]=action.payload;
            state.deleteStarted=false;
        },
        deleteFailure: (state,action) => {
            state.deleteStarted=false;
            state.deleteError=action.payload.deleteError;
        },

    }
})

export const categoryActions = {

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

export const categorySlice=abstractSlice

export const categoryReducer=abstractSlice.reducer

