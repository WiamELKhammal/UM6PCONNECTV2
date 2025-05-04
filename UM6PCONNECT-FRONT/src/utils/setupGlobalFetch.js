export const setupGlobalFetch = (logoutUser, user) => {
    const originalFetch = window.fetch;
  
    window.fetch = async (url, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        Authorization: user?.token ? `Bearer ${user.token}` : "",
        "Content-Type": "application/json",
      };
  
      try {
        const response = await originalFetch(url, { ...options, headers });
  
        if (response.status === 401) {
          console.warn("Session expired (fetch). Logging out...");
          logoutUser();
          return null;
        }
  
        return response;
      } catch (err) {
        console.error("Global fetch error:", err);
        throw err;
      }
    };
  };
  