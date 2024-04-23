// AppContextProvider.js
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiCall from "../services/apiCall";
import { IUser } from "../utils/types";
import { useNavigate } from "react-router-dom";

// Define the shape of the toast message
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Define the shape of the context
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  signOut: () => void;
  setLoginStatus: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  user: IUser | undefined;
  tokenError: boolean;
  userError: boolean;
};

// Create the context with initial value as undefined
const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // State for toast message
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const navigate = useNavigate();

  // Query to validate token
  const { isError: tokenError } = useQuery(
    "validateToken",
    apiCall.validateToken,
    {
      retry: false,
    }
  );

  // State for logged in status
  const [isLoggedIn, setIsLoggedIn] = useState(!tokenError);

  // Function to update logged in status
  const setLoginStatus = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  // Query to fetch user profile
  const {
    data: user,
    isError: userError,
    refetch,
  } = useQuery("user", apiCall.fetchProfile, {
    enabled: !tokenError, // fetch user profile if logged in successfully
    retry: false,
  });

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  // Function to sign out
  const signOut = async () => {
    try {
      await apiCall.signOut();
      setIsLoggedIn(false); // Update logged in status on sign out
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  // Provide the context
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn,
        setLoginStatus,
        user,
        tokenError,
        userError,
        signOut,
      }}>
      {/* Show toast message when available */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {/* Render children */}
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
