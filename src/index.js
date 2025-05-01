import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import client from "./apollo/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
