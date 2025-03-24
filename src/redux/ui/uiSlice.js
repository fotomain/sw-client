import {createSlice} from "@reduxjs/toolkit";

const THIS_SLICE_ENTITY = 'uiData'
const THIS_SLICE_OPTIONS = 'uiOptionsArray'
const THIS_SLICE_NAME = 'uiSlice'

export const globalSearchText="globalSearchText"
export const makeOpenCartView="makeOpenCartView"

const abstractSlice=createSlice({
    name: THIS_SLICE_NAME,
    initialState:{

        colorPrimary:"#5ece7b", //"blue",

        colorCardBackground:[
            'var(--YellowHorse)',
            'var(--TinySweetBlue)',
            'var(--PinkiePie)',
            'var(--Green8)',
            'var(--CreamyLightTan)',
            'var(--GreenThumb)',
            'var(--BlueUnderling)',
            'var(--PinkyRing)',
            'var(--EggYellows)',
        ],

        createStarted:false,
        createError:'',

        isReading:false,
        readError:'',

        deleteStarted:false,
        deleteError:'',

        [THIS_SLICE_ENTITY]:{},
        [THIS_SLICE_OPTIONS]:[],

        makeOpenCartView:false,
        globalSearchText:'',
        menuActiveItem:{menuNumber:0, category_name:''},

    },
    reducers:{
        setValue: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        createStart: (state,action) => {
            state.createStarted=true;
            state.createError="";

        },
        create: (state,action) => {

        },
        createSuccess: (state,action) => {

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
            console.log("readSuccess action1",action.payload)
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

export const uiActions = {

    createStart             : abstractSlice.actions.createStart ,
    create                  : abstractSlice.actions.create,
    createSuccess           : abstractSlice.actions.createSuccess,

    read        : abstractSlice.actions.read,
    readSuccess : abstractSlice.actions.readSuccess,
    readFailure : abstractSlice.actions.readFailure,

    deleteStart     : abstractSlice.actions.deleteStart,
    delete          : abstractSlice.actions.delete,
    deleteFailure   : abstractSlice.actions.deleteFailure,
    deleteSuccess   : abstractSlice.actions.deleteSuccess,

    setValue        : abstractSlice.actions.setValue,

};

export const uiSlice=abstractSlice

export const uiReducer=abstractSlice.reducer

