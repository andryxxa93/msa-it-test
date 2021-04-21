import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import AuthScreen from '../screens/AuthScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SelectedOrderScreen from '../screens/SelectedOrderScreen';

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
    Order: SelectedOrderScreen
}, {
    navigationOptions: {
        drawerLabel: () => null
    }
})

const OrdersDrawerNavigator = createDrawerNavigator({
    Order: OrdersNavigator
}, {
    contentComponent: props => {
    const dispatch = useDispatch();
    return <View style={{flex: 1, paddingTop: 20}}>
    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <Button title='Logout' color={'red'} onPress={() => {
            dispatch(authActions.logout());
            props.navigation.navigate('Auth');
        }}/>
    </SafeAreaView>
    </View>}
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Orders: OrdersDrawerNavigator,
})

export default createAppContainer(MainNavigator)