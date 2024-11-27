import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import userReducer from './userSlice/userSlice'
import productReducer from './productSlice/productSlice'
import productSlice from './productSlice/allProductSlice'
import productDetailsSlice from './productSlice/productDetails'
import cartReducer from './productSlice/cartSlice'
import updateProductSlice from './productSlice/updateProduct'
import newReviewSlice from './reviewSlice/addReview'
import productReviewsSlice from './reviewSlice/allReviews'
import orderSlice from './orderSlice/createOrder'
import allUsersSlice from './userSlice/allUsersSlice'
import profileSlice from './userSlice/userProfileSlice'
import adminProductSlice from './productSlice/GetAllAdminProduct'


//to store many reduers
const rootReducer = combineReducers({
  user: userReducer,
  allUsers: allUsersSlice,
  userProfile: profileSlice,
  newProduct: productReducer, 
  allProducts: productSlice,
  allAdminProducts: adminProductSlice,
  productDetails: productDetailsSlice,
  updateProduct: updateProductSlice,
  newReview: newReviewSlice,
  allReviews: productReviewsSlice,
  orderDetails: orderSlice, 
  cart: cartReducer,
})

//to persist state in storage
const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  //middleware to prevent default error
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { serializableCheck: false }
  )
})

export const persister = persistStore(store)