import React from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';


const CustomSafeAreaView = (props) => {
    return (
        Platform.OS === 'android' 
        ?   <View style={{...props.style, paddingTop: '10%', paddingBottom: 20}}>
                {props.children}
            </View>
        :   <SafeAreaView style={props.style}>
                {props.children}
            </SafeAreaView>
    )
}

export default CustomSafeAreaView;