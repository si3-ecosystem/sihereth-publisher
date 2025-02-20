import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentReducer";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === "development") {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
});
