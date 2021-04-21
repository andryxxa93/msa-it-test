import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const AuthScreen = (props) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [showErrorMsg, setShowErrorMsg] = useState(false)

    const loginInput = useRef();
    const passwordInput = useRef();
    
    const dispatch = useDispatch();

    const authHandler = () => {
        if (!login.trim() || !password.trim()) {
            setShowErrorMsg(true)
        }
        if (login && password) {
            setShowErrorMsg(false)
            try {
                dispatch(authActions.login(login, password))
                props.navigation.navigate('Orders')
            } catch (error) {
                Alert.alert('Ошибка входа', error.message, [{text:'Окей'}])
            }
        }
    }

    useEffect(() => {
        loginInput.current.focus();
    }, [])

    return (
       <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={20}
            style={styles.authContainer}
       >
            <Text style={styles.greetingText}>Добро пожаловать!</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={loginInput}
                    style={styles.input} 
                    autoCapitalize='none' 
                    placeholderTextColor='black' 
                    onChangeText={setLogin} 
                    value={login} 
                    placeholder='Логин'
                    onSubmitEditing={() => passwordInput.current.focus()}
                />
                <TextInput
                    ref={passwordInput}
                    autoCapitalize='none' 
                    style={styles.input} 
                    placeholderTextColor='black'
                    secureTextEntry
                    onChangeText={setPassword} 
                    value={password} 
                    placeholder='Пароль'/>
                {showErrorMsg && <Text style={{color: 'red', fontSize: 14}}>Заполните все поля</Text>}
            </View>
            <TouchableOpacity
                style={styles.authButton}
                onPress={authHandler}
            >
                <Text style={styles.authButtonText}>
                    ВОЙТИ
                </Text>
            </TouchableOpacity>
       </KeyboardAvoidingView>
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
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? '40%' : 0       
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