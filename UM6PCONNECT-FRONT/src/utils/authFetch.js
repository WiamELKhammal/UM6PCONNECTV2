// utils/authFetch.js
export const authFetch = async (url, options = {}, logoutUser, user) => {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 401) {
        console.warn("Session expired. Logging out...");
        logoutUser(); // ✅ Call the context's logout function
        return null;
      }
  
      return res;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };
  