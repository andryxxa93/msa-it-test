import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const AuthScreen = (props) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const authHandler = () => {
        try {
            dispatch(authActions.login(login, password))
            props.navigation.navigate('Orders')
        } catch (error) {
            Alert.alert('Ошибка входа', error.message, 'Окей')
        }
    }

    return (
       <SafeAreaView style={styles.authContainer}>
            <Text style={styles.greetingText}>Добро пожаловать!</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    placeholderTextColor='black' 
                    onChangeText={setLogin} 
                    value={login} 
                    placeholder='Логин'
                />
                <TextInput 
                    autoCapitalize='none' 
                    style={styles.input} 
                    placeholderTextColor='black'
                    secureTextEntry
                    onChangeText={setPassword} 
                    value={password} 
                    placeholder='Пароль'/>
            </View>
            <TouchableOpacity
                style={styles.authButton}
                onPress={authHandler}
            >
                <Text style={styles.authButtonText}>
                    ВОЙТИ
                </Text>
            </TouchableOpacity>
       </SafeAreaView>
    )
}


AuthScreen.navigationOptions = navData => {
    return {
        headerTransparent: true,
        headerTitle: ''
    }
}

export default AuthScreen;


const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'        
    },
    greetingText: {
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: 0.3
    },
    inputContainer: {
        width: '90%',
        marginVertical: 50,
        flexDirection: 'column'
    },
    input: {
        paddingLeft: 11,
        marginTop: 12,
        width: '100%',
        height: 56,
        borderColor: '#1E6FB9',
        borderWidth: 2,
        borderRadius: 6,
        fontSize: 18
    },
    authButton: {
        width: '90%',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E6FB9',
        borderRadius: 6
    },
    authButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    }
})