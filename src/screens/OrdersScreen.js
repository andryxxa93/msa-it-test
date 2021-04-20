import React, { useLayoutEffect, useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Components/Card';
import CustomSafeAreaView from '../Components/CustomSafeAreaView';

import * as ordersActions from '../store/actions/orders';
import * as authActions from '../store/actions/auth';

const OrdersScreen = (props) => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const userId = useSelector(state => state.auth.userId);

    const [delayValue, setDelayValue] = useState(500);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const animation = () => Animated.spring(fadeAnim, {
        toValue: 1,
        tension: 20,
        useNativeDriver: true
      }).start();

    const loadOrders = () => {
       dispatch(ordersActions.getOrders(userId));
    }

    useLayoutEffect(() => {
        loadOrders()
        animation()
    }, [])
    
    const onPressHandler = (state, orderId) => {
        props.navigation.navigate('Order', {state, orderId});
    }

    const logoutHandler = () => {
        props.navigation.navigate('Auth');
        dispatch(authActions.logout())
    }

    const translateX = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [delayValue, 1]
    });

    if (!orders.length) {
        return (<SafeAreaView style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Вы пока не сделали ни одного заказа...</Text>
            <Button onPress={logoutHandler} title='Сменить аккаунт'/>
        </SafeAreaView>)
    }

    return (
       <CustomSafeAreaView style={styles.ordersScreen}>
           <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                            Мои заказы
                    </Text>
                    <Text style={styles.count}>
                        {orders.length}
                    </Text>
                </View>
                {
                    <FlatList
                        data={orders}
                        keyExtractor={order => `${order.id}`}
                        renderItem={order => <Animated.View style={{transform: [{translateX}]}}>
                            <Card onPressHandler={onPressHandler} id={order.item.id}/>
                        </Animated.View>}
                    />
                }

           </View>
       </CustomSafeAreaView>
    )
}


OrdersScreen.navigationOptions = navData => {
    return {
        headerTransparent: true,
        headerTitle: '',
        drawerLabel: () => null
    }
}

const styles = StyleSheet.create({
    ordersScreen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        paddingHorizontal: 18,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },  
    text: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 0.3
    },
    count: {
        fontSize: 20,
        color: '#929292',
        marginLeft: 8
    },
})

export default OrdersScreen;