import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  //  Fetch User Profile When User ID Changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user || !user._id) return;

        const response = await axios.get(`http://localhost:5000/api/profile/${user._id}`);
        setUser(response.data); //  Update state with fresh data
        localStorage.setItem("user", JSON.stringify(response.data)); //  Update local storage
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user?._id]); //  Runs only when user ID changes

  //  Function to Update User Instantly
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedUserData };
      localStorage.setItem("user", JSON.stringify(newUser)); //  Store updated user instantly
      return newUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
