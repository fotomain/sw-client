
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {productsReducer} from "./product/productSlice";
import {cartReducer} from "./cart/cartSlice";
import {uiReducer} from "./ui/uiSlice";
import {categoryReducer} from "./category/categorySlice";
import {orderReducer} from "./order/orderSlice";


const sagaMiddleware = createSagaMiddleware();

const reduxStore = configureStore({
	reducer: {
		productsState: 	productsReducer,
		cartState: 		cartReducer,
		uiState: 		uiReducer,
		categoryState:	categoryReducer,
		orderState:		orderReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default reduxStore;
