import { cloneDeep } from 'lodash';

import { DELETE_ORDER, GET_ORDERS, DOUBLE_ORDER } from '../actions/orders';

const initialState = {
    orders: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {...state, orders: cloneDeep(action.orders)}
        case DELETE_ORDER:
            const filtrdedOrders = state.orders.filter(order => order.id !== action.orderId)
            return {...state, orders: [...filtrdedOrders]}
        case DOUBLE_ORDER:
            
            const selectedOrder = state.orders.find(order => order.id === action.orderId)
            const newOrder = cloneDeep(selectedOrder);

            newOrder.id = Date.now() / Math.random();

            const updatedOrders = [...state.orders];
            updatedOrders.push(newOrder);

            return {...state, orders: [...updatedOrders]};  
        default:
            return state
    }
}