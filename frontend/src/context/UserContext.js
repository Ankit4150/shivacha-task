import { createContext, useState, useEffect } from "react";
import Summaryapi from "../common";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        Summaryapi.userdetails.url,
        {
          method: Summaryapi.userdetails.method,
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setUserDetails(null);
        return;
      }

      const data = await response.json();

      console.log("userdata", data);

      setUserDetails(data);
    } catch (error) {
      console.log(error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        getUserDetails,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};