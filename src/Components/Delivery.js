import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

import imageUri from '../../assets/bag.png';

const Delivery = (props) => {

    const date = new Date(props.date).toLocaleString('ru', {day: 'numeric', month: 'long'});
    const weekday = new Date(props.date).toLocaleString('ru', {weekday: 'long'});

    return (
       <TouchableOpacity style={styles.container}>
           <View style={styles.flex}>
                <Image source={imageUri}/>
            <Text style={styles.date}>
                {date}, {weekday}
            </Text>
           </View>
           <Text>
                {props.interval}
           </Text>
           <MaterialIcons name="arrow-forward-ios" size={24} color="#d7d7d7" />
       </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    date: {
        marginLeft: 10
    }
})

export default Delivery;