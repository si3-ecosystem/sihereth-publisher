import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../reducers/contentReducer";
import logger from "redux-logger";
export const store = configureStore({
  reducer: {
    content: contentReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },
});
