import { BASE_URL } from "@/constants/Service";
import { AuthContextType } from "@/models/Auth";
import { httpClient } from "@/utils/httpClient";
import axios from "axios";
import React, { ReactNode, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoading: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext<AuthContextType>(AuthContext);

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    mutate,
    isValidating,
  } = useSWR(`${BASE_URL}/profile`, fetcher);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await httpClient.delete(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("access_token");

      toast.success("Logged out successfully");
      mutate(null, false); // Invalidate user data
      navigate("/");
    } catch (error) {
      console.log("Unknown error at Logout ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: mutate,
        logout,
        isLoading: isValidating, // Set isLoading to SWR's isValidating state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
