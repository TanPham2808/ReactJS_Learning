import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer'; // Khai báo để Redux biết có sự tồn tại của userReducer

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer // Khai báo với 1 tên định danh là user
});

export default rootReducer;