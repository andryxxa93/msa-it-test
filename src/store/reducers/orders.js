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
            const deepClone = obj => {
                if (obj === null) return null;
                let clone = Object.assign({}, obj);
                Object.keys(clone).forEach(
                  key =>
                    (clone[key] =
                      typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
                );
                return Array.isArray(obj) && obj.length
                  ? (clone.length = obj.length) && Array.from(clone)
                  : Array.isArray(obj)
                  ? Array.from(obj)
                  : clone;
              };
              
            const selectedOrder = state.orders.find(order => order.id === action.orderId)
            
            const newOrder = deepClone(selectedOrder);
            newOrder.id = Date.now() / Math.random();

            const updatedOrders = [...state.orders];
            updatedOrders.push(newOrder);

            return {...state, orders: [...updatedOrders]};  
        default:
            return state
    }
}