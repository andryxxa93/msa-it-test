import { DELETE_ORDER, GET_ORDERS, DOUBLE_ORDER } from '../actions/orders';

const initialState = {
    orders: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {...state, orders: [...action.orders]}
        case DELETE_ORDER:
            const filtrdedOrders = state.orders.filter(order => order.id !== action.orderId)
            return {...state, orders: [...filtrdedOrders]}
        case DOUBLE_ORDER:
            const doubleOrder = (obj) => {
                const newObj = {};
                for (const key in obj) {
                    if (Array.isArray(obj[key])) {
                        newObj[key] = [...obj[key]]
                        continue
                    }
                    newObj[key] = obj[key]
                }
                return newObj
            }
            const selectedOrder = state.orders.find(order => order.id === action.orderId)
            
            const newOrder = doubleOrder(selectedOrder);
            newOrder.id = Date.now() / Math.random();

            const updatedOrders = [...state.orders];
            updatedOrders.push(newOrder);

            return {...state, orders: [...updatedOrders]};  
        default:
            return state
    }
}