import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

// Encryption transform configuration
const encryptor = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_REDUX_KEY!,
  onError: (error) => {
    console.error("Encryption error:", error);
    storage.removeItem("persist:root");
  }
});

// Redux-persist configuration
const persistConfig = {
  key: "siher",
  storage,
  transforms: [encryptor],
  timeout: 2000
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure the store
const store = configureStore({
  reducer: {
    user: persistedUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
