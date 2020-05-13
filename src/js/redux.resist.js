import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import armaReducers from "./reducers";
import {createTransform} from "redux-persist";
import Flatted from "flatted";

export const transformCircular = createTransform(
    (inboundState, key) => Flatted.stringify(inboundState),
    (outboundState, key) => Flatted.parse(outboundState),
);

const persistConfig = {
    key: 'signin',
    storage: storage,
    whitelist: ['signin'],
    transforms: [transformCircular]
};
const pReducer = persistReducer(persistConfig, armaReducers);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };