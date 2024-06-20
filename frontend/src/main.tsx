import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import App from "./App.tsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <AppContextProvider>
              <App />
            </AppContextProvider>
          </QueryClientProvider>
        </Router>
      </GoogleOAuthProvider>
    </I18nextProvider>
  </StrictMode>
);
