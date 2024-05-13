"use client";
import { Inter } from "next/font/google";
import React from "react";
import { Provider } from "react-redux";
import "./index.css";
import { store, persistor } from "../store";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { injectStore } from "../api";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Math Teacher",
//   description: "Uk Math Teacher",
// };

axios.defaults.withCredentials = true;

injectStore(store);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Maths Directory</title>

      <body className="bg-[#fff] min-h-screen">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
