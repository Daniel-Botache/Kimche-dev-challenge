import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { client } from "./Apollo/Client";
import Home from "./views/Home";
import { ApolloProvider, InMemoryCache } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Home />
      </>
    </ApolloProvider>
  );
}

export default App;
