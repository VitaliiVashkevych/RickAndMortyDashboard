"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Rick and Morty Dashboard</title>
      </head>
      <body>
        <Provider store={store}>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
};
export default Layout;
