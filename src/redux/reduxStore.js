
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {productsReducer} from "./product/productSlice";
import {cartReducer} from "./cart/cartSlice";


const sagaMiddleware = createSagaMiddleware();

const reduxStore = configureStore({
	reducer: {
		productsState: productsReducer,
		cartState: cartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default reduxStore;
