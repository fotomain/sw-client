import React, {useEffect, useState} from "react";

import useStyles from './../styles';

import {useDispatch, useSelector} from "react-redux";
import {productActions, productsSlice} from "../redux/productsSlice";
import {Button, TextField} from "@mui/material";
import ClassWooEntity from "../api/WooEntityRoot";

const debug_local=true
export const ProductsGallery = () => {


    const createStarted = useSelector((state:any) => state.productsState.createStarted);
    const productsState = useSelector((state:any) => state.productsState );
    const isReading = useSelector((state:any) => state.productsState.isReading);
    const deleteStarted = useSelector((state:any) => state.productsState.deleteStarted);
    const deleteError = useSelector((state:any) => state.productsState.deleteError);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        console.log("dispatch1")
        dispatch(productsSlice.actions.read({scope:'all'}))
    }, []);

    const initState={
        name: ''
        // name: 'Am'
    }
    const [state, setState] = useState(initState);

    const handleSubmit = (e:any) => {
        e.preventDefault();
    };

    useEffect(() => {
        console.log('=== state.name',state.name)
        //dispatch(getMovies(name));
        dispatch(productActions.read({filter:{name:state.name}}))
    }, [state.name]);

    return (
        <div style={{display:'flex',flexDirection:'column',alignContent:'center', alignItems:'center'}}>
            <h3 className={classes.title}>Products Search</h3>
            <h4>{(deleteStarted)?'Serverside delete started...':null}</h4>
            <h4>{(deleteError)?'deleteError '+deleteError:null}</h4>

            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    fullWidth
                    value={state.name}
                    sx={{ m: 1, width: '55ch' }}
                    onChange={(e:any) => setState((prevState)=> {
                        return ({
                            ...prevState,
                            name: e.target.value
                        })
                    })}
                />
                {/*{error && <p className={classes.error}>{error}</p>}*/}
            </form>


            {((isReading))?null:(createStarted)?'Create...':
                 <div style={{display:'flex',flexDirection:'row',gap:'8px'}} >
                    <Button
                        variant={"contained"}
                        onClick={async () => {

                            const runParams = {
                                all:true,
                                // 'search':'Pork',
                                'id':6791,
                                // 'entity_guid':'prod735x4',
                                'per_page':100,
                                'page':1,
                            }

                            console.log("res1")
                            const woo_products = new ClassWooEntity('products')
                            const readDataAll = await woo_products.read(
                                runParams
                            )

                            console.log("██████ readDataAll",readDataAll.data)

                        }}
                    >
                        READ ALL
                    </Button>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            dispatch(productActions.create({
                                id: Date.now(),
                                name: 'Mixus'
                            }))
                        }}
                    >
                        CREATE
                    </Button>
                </div>
            }

            {/*<div>productsState</div>*/}
            {/*<div>{JSON.stringify(productsState)}</div>*/}

            <h4>{(isReading)?'Products Loading...':null}</h4>

            {((!isReading) && (0!==productsState.productsArray.length)) && productsState.productsArray.map((el:any,ii:number)=>{
                return <React.Fragment key={ii}>
                    <div style={{paddingBottom:'4px', display:'flex', flexDirection:'row',alignContent:'center', alignItems:'center'}}>
                        <div style={{width:'100px'}}>{el.id}</div>
                        <div style={{width:'20px' }}> </div>
                        <div style={{width:'250px'}}>{el.name}</div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                dispatch(productActions.delete({
                                    id: el.id,
                                }))
                            }}
                        >
                            DELETE
                        </Button>
                    </div>
                </React.Fragment>
            })}

        </div>
    );
};

export default ProductsGallery