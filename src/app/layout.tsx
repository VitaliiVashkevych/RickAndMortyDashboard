"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Rick and Morty Dashboard</title>
      </head>
      <body>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <>{children}</>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
};
export default Layout;
