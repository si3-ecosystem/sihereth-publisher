import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import contentReducer from "./contentSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

// Encryption transform configuration
const encryptor = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_REDUX_KEY!,
  onError: (error) => {
    console.error("Encryption error:", error);
    storage.removeItem("persist:root");
  }
});

const userPersistConfig = {
  key: "siheruser",
  storage,
  transforms: [encryptor],
  timeout: 2000
};

const contentPersistConfig = {
  key: "sihercontent",
  storage,
  transforms: [encryptor],
  timeout: 2000
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedContentReducer = persistReducer(contentPersistConfig, contentReducer);

// Configure the store
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    content: persistedContentReducer
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });
    if (process.env.NODE_ENV === "development") {
      middlewares.push(logger);
    }
    return middlewares;
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
