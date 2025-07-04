import { configureStore } from "@reduxjs/toolkit";
import userReducer, { resetAuth } from "./authSlice";
import contentReducer, { clearContent } from "./contentSlice";
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
  timeout: 2000
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

// Root reducer with reset functionality
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') {
    console.log("[ROOT_REDUCER] Resetting store state");
    // Reset all persisted state
    state = undefined;
  }
  return {
    user: persistedUserReducer(state?.user, action),
    content: persistedContentReducer(state?.content, action)
  };
};

// Configure the store
const store = configureStore({
  reducer: rootReducer,
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

// Utility function to handle complete logout
export const handleCompleteLogout = async () => {
  console.log("[LOGOUT] Starting complete logout process...");
  
  // First, purge the persisted store
  try {
    await persistor.purge();
    console.log("[LOGOUT] Persisted store purged successfully.");
  } catch (err) {
    console.error("[LOGOUT] Failed to purge persisted store:", err);
  }
  
  // Then dispatch individual slice reset actions
  store.dispatch(resetAuth());
  store.dispatch(clearContent());
  console.log("[LOGOUT] Individual slice reset actions dispatched");
  
  // Also dispatch root reset action
  store.dispatch({ type: 'RESET_STORE' });
  console.log("[LOGOUT] Root reset action dispatched");
  
  // Verify state is reset
  const currentState = store.getState();
  console.log("[LOGOUT] Current state after logout:", currentState);
};

export default store;
