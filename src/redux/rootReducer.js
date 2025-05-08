import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authSlice from './slice/auth.slice';
import menuSlice from './slice/menu.slice';
import orderSlice from './slice/order.slice';

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  authReducer: authSlice,
  menuReducer: menuSlice,
  orderReducer: orderSlice,
});

export default rootReducer;
