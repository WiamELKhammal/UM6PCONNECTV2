import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("LocalStorage User:", storedUser); // Debugging log
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    console.log("User Context Updated:", user); // Debugging log
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
