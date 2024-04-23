import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
// import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          {/* <SearchContextProvider> */}
          <App />
          {/* </SearchContextProvider> */}
        </AppContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
