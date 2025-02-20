
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {productsReducer} from "./productsSlice";


const sagaMiddleware = createSagaMiddleware();

const reduxStore = configureStore({
	reducer: {
		productsState: productsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default reduxStore;
