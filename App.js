import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';


import AppNavigator from './src/navigation/AppNavigator';
import authReducer from './src/store/reducers/auth';
import ordersReducer from './src/store/reducers/orders';


const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer
})

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    );
}

