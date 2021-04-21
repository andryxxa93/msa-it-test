import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useGlobalize } from 'react-native-globalize';

import imageUri from '../../assets/bag.png';

const Delivery = (props) => {
    const { formatDate } = useGlobalize();

    const date = formatDate(new Date(props.date), { skeleton: "MMMMd" });
    const weekday = formatDate(new Date(props.date), { skeleton: "EEEE" });

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