const data = require('../../data/orders.json');

export const GET_ORDERS = 'GET_ORDERS';
export const DOUBLE_ORDER = 'DOUBLE_ORDER';
export const ORDER_ID = 'ORDER_ID';
export const DELETE_ORDER = 'DELETE_ORDER';

export const getOrders = (userId) => {
    return {type: GET_ORDERS, orders: data.filter(order => order.client_id === userId)}
}

export const doubleOrder = (orderId) => {
    return {type: DOUBLE_ORDER, orderId}
}

export const deleteOrder = (orderId) => {
    return {type: DELETE_ORDER, orderId}
}