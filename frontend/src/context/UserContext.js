import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        console.log("Decoded User:", decoded);

        setUserDetails(decoded);
      } catch (error) {
        console.log("Token Decode Error:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};