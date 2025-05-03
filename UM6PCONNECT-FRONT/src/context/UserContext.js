import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Fetch fresh user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user._id || !user.token) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const updatedUser = { ...res.data, token: user.token };
        setUserState(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
  
    fetchUserProfile();
  }, [user?._id]);
  
  
  // Update user with new data
  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUserState(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Logout logic (used in Navbar)
  const logoutUser = () => {
    setUserState(null);
    localStorage.removeItem("user");
  };

  // Sync logout across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user" && !e.newValue) {
        setUserState(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
