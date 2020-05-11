import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import armaReducers from "./reducers";

const persistConfig = {
    key: 'signin',
    storage: storage,
    whitelist: ['signin'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, armaReducers);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };