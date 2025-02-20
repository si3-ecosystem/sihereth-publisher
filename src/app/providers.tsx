"use client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "@/redux/store";
import { ReactNode } from "react";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      {children}
    </Provider>
  );
};

export default Providers;
