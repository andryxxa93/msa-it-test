import React, { useEffect, useReducer } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalize } from 'react-native-globalize';
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FIRSTDATE':
            return {...state, firstDelivery: action.payload}
        case 'NEARESTDELIVERY':
            return {...state, nearestDelivery: action.payload}
        case 'LASTDATE':
            return {...state, lastDelivery: action.payload}
        case 'NEARESTDATE':
            return {...state, nearestDate: action.payload}
        case 'ADDRESS':
            return {...state, address: action.payload}
        case 'PERCENT':
            return {...state, deliveredPercent: action.payload}
        case 'DAYSPAST':
            return {...state, daysPast: action.payload}
        case 'DAYSLEFT':
            return {...state, daysLeft: action.payload}
        case 'WEEKDAY':
            return {...state, weekday: action.payload}
        default:
            return state
    }
}

const Card = (props) => {

    const { formatDate } = useGlobalize();

    const orders = useSelector(state => state.orders.orders);
    const deliveries = orders.find(order => order.id === props.id).deliveries;

    const [state, dispatch] = useReducer(
        reducer, 
        {
            nearestDelivery: {},
            firstDelivery: '',
            lastDelivery: '',
            nearestDate: '',
            address: '',
            deliveredPercent: 0,
            daysPast: 0,
            daysLeft: 0,
            weekday: ''
        }
    )

    const getDeliveriesInfo = () => {
        const now = Date.now();

        const sortedDeliveries = [...deliveries].sort((a, b) => Date.parse(a.date) > Date.parse(b.date) ? 1 : -1);
        
        let nearestDelivery = sortedDeliveries.find(delivery => Date.parse(delivery.date) > now) || sortedDeliveries[deliveries.length -1];
        dispatch({type: 'NEARESTDELIVERY', payload: nearestDelivery});
        
        const firstDelivery = formatDate(new Date(sortedDeliveries[0].date), { skeleton: "MMMd" }).replace('.', '');
        dispatch({type: 'FIRSTDATE', payload: firstDelivery});

        const lastDelivery = formatDate(new Date(sortedDeliveries[deliveries.length - 1].date), {skeleton: 'MMMd'}).replace('.', '');
        dispatch({type: 'LASTDATE', payload: lastDelivery});

        const nearestDate = formatDate(new Date(nearestDelivery.date), {skeleton: 'MMMd'});
        dispatch({type: 'NEARESTDATE', payload: nearestDate});

        const address = nearestDelivery.address;
        dispatch({type: 'ADDRESS', payload: address});

        const getDaysPastAndLeft = () => {
            const firstDate = Date.parse(sortedDeliveries[0].date);
            const lastDate = Date.parse(sortedDeliveries[sortedDeliveries.length  - 1].date);

            let daysPast = Math.ceil((now - firstDate) / (1000 * 3600 * 24));
            let daysLeft;
            const interval = Math.ceil((lastDate - firstDate) / (1000 * 3600 * 24));
            
            if (daysPast < 0) {
                daysPast = 0
                daysLeft = interval
            }
            if (daysPast > interval) {
                daysPast = interval
                daysLeft = 0                
            }
            daysLeft = interval - daysPast

            const correctWordForm = (day) => {
                let daysWordForm;
                day = day.toString();
                if (day.search(/^[1]{1}\b|^[0-9]{1,2}1$/gm) !== -1 && day.search(/^[1][1-4]{1}\b/gm) === -1) {
                    daysWordForm = 'день';
                } else if (day.search(/^[2-4]{1}\b|^[2-9][2-4]|^[1][0-9][2-4]$/gm) !== -1) {
                    daysWordForm = 'дня';
                } else if (day >= 11 && day <= 14 || day.search(/^[1-4]{3}/gm) !== -1) {
                    daysWordForm = 'дней';
                } else {
                    daysWordForm = 'дней';
                }
                return daysWordForm;
            }

            dispatch({type: 'DAYSPAST', payload: `${daysPast} ${correctWordForm(daysPast)}`});
            dispatch({type: 'DAYSLEFT', payload: `${daysLeft} ${correctWordForm(daysLeft)}`});
        }
        getDaysPastAndLeft()
        
        const getDeliveredPercent = () => {
            let deliveredCount = 0;
            sortedDeliveries.forEach(delivery => {
                if (Date.parse(delivery.date) <= now) {
                    deliveredCount++
                }
            })
            const deliveredPercent = deliveredCount / (sortedDeliveries.length / 100);
            dispatch({type: 'PERCENT', payload: deliveredPercent});
        }
        getDeliveredPercent()

        const getWeekDay = () => {
            const weekday = formatDate(new Date(nearestDelivery.date), {skeleton: 'EEEE'})
            let inWord = weekday === 'вторник' ? 'во' : 'в';
            if (weekday[weekday.length - 1] === 'а') {
                const correctWeekday = weekday.slice(0, -1) + 'у';
                return dispatch({type: 'WEEKDAY', payload:`${inWord} ${correctWeekday}`});
            }
            return dispatch({type: 'WEEKDAY', payload: `${inWord} ${weekday}`});
        }
        getWeekDay()
    }

    useEffect(() => {
        getDeliveriesInfo()
    }, [])


    return (
       <TouchableOpacity
            onPress={() => props.onPressHandler(state, props.id)} 
            style={styles.container}>
           <ProgressBar
                orderId={props.id}
                state={state}
            />
           <View style={styles.delivery}>
                <View style={styles.dateInfo}>
                    <Text style={styles.month}>
                        {state.nearestDate.replace(/[^a-zа-яё]/gm, '')}
                    </Text>
                    <Text style={styles.day}>
                        {state.nearestDate.replace(/[^\d]/gm, '')}
                    </Text>
                </View>
                <View style={styles.deliveryInfo}>
                    <Text style={styles.nearestDate}>
                        Ближайшая доставка
                    </Text>
                    <Text style={styles.weekday}>
                        {state.weekday} -
                    </Text>
                    <Text style={styles.time}>
                        c {state.nearestDelivery.interval 
                            ? state.nearestDelivery.interval.replace('-', 'до') 
                            : null
                        }
                    </Text>
                    <Text style={styles.location}>
                        {state.address}
                    </Text>
                </View>
           </View>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingHorizontal: 17,
        paddingTop: 25,
        paddingBottom: 17,
        width: '100%',
        height: 250,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
    },
    delivery: {
        marginTop: 23,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 57.77,
        height: 99.69,
        backgroundColor: '#1E6FB9',
        borderRadius: 4
    },
    month: {
        color: 'white',
        fontSize: 11,
        fontWeight: '500',
        lineHeight: 15
    },
    day: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    deliveryInfo: {
        marginLeft: 23
    },
    nearestDate: {
        fontSize: 17,
        fontWeight: '700',
    },
    weekday: {
        fontSize: 17,
        color: '#1E6FB9',
        fontWeight: '700'
    },
    time: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '500'
    },
    location: {
        fontSize: 12,
        color: '#949494'
    }


})

export default Card;

