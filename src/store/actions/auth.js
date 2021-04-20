const clients = require('../../data/clients.json');

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (login, password) => {
    
    const user = clients.find(client => client.login === login.trim());
        if (user && user.password === password.trim()) {
            return {type: LOGIN, userId: user.id}
        } else if (!user) {
            throw new Error('Неверный логин')
        } else {
            throw new Error('Неверный пароль')
        }
}

export const logout = () => {
    return {type: LOGOUT}
}