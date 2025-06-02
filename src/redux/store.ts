import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import contentReducer from "./contentSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

// Get the encryption key from environment variables
const encryptionKey = process.env.NEXT_PUBLIC_REDUX_KEY;
if (!encryptionKey) {
  throw new Error("NEXT_PUBLIC_REDUX_KEY environment variable is not set");
}

// Encryption transform configuration
const encryptor = encryptTransform({
  secretKey: encryptionKey,
  onError: (error) => {
    console.error("Encryption error:", error);
    storage.removeItem("persist:root");
  }
});

// Create separate persist configs for each reducer
const userPersistConfig = {
  key: "siher-user",
  storage,
  transforms: [encryptor],
  timeout: 2000,
  whitelist: ["id", "email", "name", "domain"] // explicitly specify which fields to persist
};

const contentPersistConfig = {
  key: "siher-content",
  storage,
  transforms: [encryptor],
  timeout: 2000
};

// Create persisted reducers with their specific configs
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
