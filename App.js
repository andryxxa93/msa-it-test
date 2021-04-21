import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { GlobalizeProvider, loadCldr } from 'react-native-globalize';


import AppNavigator from './src/navigation/AppNavigator';
import authReducer from './src/store/reducers/auth';
import ordersReducer from './src/store/reducers/orders';


const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer
})

const store = createStore(rootReducer);

loadCldr(
    require('react-native-globalize/locale-data/ru'),
);

export default function App() {
    return (
        <Provider store={store}>
            <GlobalizeProvider locale="ru">
                <AppNavigator/>
            </GlobalizeProvider>
        </Provider>
    );
}

