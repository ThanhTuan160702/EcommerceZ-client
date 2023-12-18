import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import producSlice from './products/productSlice'
import storage from 'redux-persist/lib/storage';
import userSlice from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn','token']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: producSlice,
    user: persistReducer(userConfig, userSlice)
  },
});

export const persistor = persistStore(store)
