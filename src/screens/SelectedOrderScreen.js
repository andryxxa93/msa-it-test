import React from 'react';
import { Alert, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as ordersActions from '../store/actions/orders';

import ProgressBar from '../Components/ProgressBar';

import addBtn from '../../assets/addOrderButton.png';
import trashBtn from '../../assets/trash.png';
import Delivery from '../Components/Delivery';

const SelectedOrderScreen = (props) => {

    const state = props.navigation.getParam('state');
    const orderId = props.navigation.getParam('orderId');
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders.orders.find(order => order.id === orderId));
    
    const doubleOrderHandler = () => {
        Alert.alert('Заказ дублирован', 'Ваш заказ успешно дублирован!', [{text: 'Окей'}]);
        dispatch(ordersActions.doubleOrder(orderId));
    }

    const onDeleteHandler = () => {
        Alert.alert('Отмена заказа', 'Вы точно хотите отменить этот заказ?', [
            {text: 'Нет', style: 'default'},
            {text: 'Да', style: 'destructive', onPress: () => {
                props.navigation.goBack();
                dispatch(ordersActions.deleteOrder(orderId))
            }}
        ])
    }

    if (!order) {
        return <Text>Заказ удалён</Text>
    }

    return (
       <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 18}}>
                <ProgressBar
                    id={orderId}
                    state={state}       
                />
                <Text style={styles.headerText}>
                    Доставки
                </Text>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={order.deliveries}
                    keyExtractor={delivery => `${delivery.id}`}
                    renderItem={delivery => <Delivery date={delivery.item.date} interval={delivery.item.interval}/>}
                />
            </View>
            <View style={{paddingHorizontal: 18}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={doubleOrderHandler} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Дублировать заказ
                        </Text>
                        <Pressable>
                            <Image source={addBtn}/>
                        </Pressable>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity onPress={onDeleteHandler} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Отменить заказ
                        </Text>
                        <Pressable style={{marginRight: 3}}>
                            <Image source={trashBtn}/>
                        </Pressable>
                    </TouchableOpacity>
                </View>
            </View>
       </SafeAreaView>
    )
}

SelectedOrderScreen.navigationOptions = navData => {

    return {
        headerTitle: '',
        headerTintColor: 'white',
        headerStyle: {
            shadowColor: 'transparent',
        },
        headerLeft: () => <Pressable style={{marginLeft: 20}} onPress={() => navData.navigation.navigate('Orders')}>
            <Text style={{fontSize: 17, color: '#1E6FB9'}}>Назад</Text>
        </Pressable>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },  
    headerText: {
        marginTop: 35,
        fontSize: 17,
        fontWeight: '700'
    },
    list: {
        marginTop: 40,
        maxHeight: '35%'
    },
    buttonContainer: {
        marginTop: 60,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    button: {
        height: 55,
        paddingLeft: 17,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 17
    },
    divider: {
        left: 0,
        height: 1,
        backgroundColor: '#D6D6D6'
    }
})

export default SelectedOrderScreen;