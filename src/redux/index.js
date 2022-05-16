import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth_reducer";
import cartReducer from "./cart_reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "cart"],
};
const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["status", "loginError", "registerError"],
};
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  blacklist: ["status", "error"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export let persistor = persistStore(store);
