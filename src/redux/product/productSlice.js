import {createSlice} from "@reduxjs/toolkit";

const THIS_SLICE_ENTITY = 'productsArray'
const THIS_SLICE_OPTIONS = 'productsOptionsArray'
const THIS_SLICE_NAME = 'productSlice'

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
            let deleteData =null
            // const deleteElement = state[THIS_SLICE_ENTITY].find(el=>(el.id === action.payload.id))
            const deleteIndex = state[THIS_SLICE_ENTITY].findIndex(el=>(el.id === action.payload.id))
            console.log("=== deleteIndex",deleteIndex)
                if(-1===deleteIndex){
                    state.deleteError='index not found for Id: '+action.payload.id;
                    return
                }
            console.log("=== state[THIS_SLICE_ENTITY] delete",[...state[THIS_SLICE_ENTITY]])
            let  newData = state[THIS_SLICE_ENTITY];
            newData= [...newData.slice(0,deleteIndex), ...newData.slice(deleteIndex+1,state[THIS_SLICE_ENTITY].length) ]
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
export const productActions = {

    createStart             : abstractSlice.actions.createStart ,
    create                  : abstractSlice.actions.create,
    productCreateSuccess    : abstractSlice.actions.createSuccess,

    read        : abstractSlice.actions.read,
    readSuccess : abstractSlice.actions.readSuccess,
    readFailure : abstractSlice.actions.readFailure,

    deleteStart   : abstractSlice.actions.deleteStart,
    delete        : abstractSlice.actions.delete,
    deleteFailure : abstractSlice.actions.deleteFailure,
    productDeleteSuccess    : abstractSlice.actions.deleteSuccess,


};

export const productSlice=abstractSlice

export const productsReducer=abstractSlice.reducer

