import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';


const ProgressBar = ({state, orderId}) => {

    const {packageName, packageCalories} = useSelector(state => state.orders.orders.find(order => order.id === orderId))

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.daysleft}>
                    {state.daysPast}
                </Text>
                <View>
                    <Text style={styles.type}>
                        {packageName}
                    </Text>
                    <Text style={styles.calories}>
                        {packageCalories}
                    </Text>
                </View>
            </View>
        <View style={styles.progressBar}>
            <View>
                <View style={styles.progress}>
                    <View style={{...styles.line, width: `${state.deliveredPercent}%`}}>
                        <View style={styles.dot}></View>
                    </View>
                </View>
            </View>
            <View style={styles.progressInfo}>
                <Text style={styles.progressDay}>
                    {state.firstDelivery}
                </Text>
                <Text style={{...styles.progressDay,...styles.progressDayesLeft}}>
                    Осталось {state.daysLeft}
                </Text>
                <Text style={styles.progressDay}>
                    {state.lastDelivery} 
                </Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    header: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    daysleft: {
        fontSize: 35,
        fontWeight: '700'
    },
    type: {
        fontSize: 10,
        color: '#B1B1B1'
    },
    calories: {
        fontSize: 14,
        fontWeight: '700'
    },
    progress: {
        marginTop: 20,
        width: '100%',
        height: 6,
        backgroundColor: '#E9E9E9',
        borderRadius: 4
    },
    line: {
        width: '30%',
        height: '100%',
        backgroundColor: '#1E6FB9',
        borderRadius: 4,
        alignItems: 'flex-end'
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    progressInfo: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressDay: {
        fontSize: 11,
        color: '#9E9E9E'
    },
    progressDayesLeft: {
        color: 'black'
    }



})

export default ProgressBar;