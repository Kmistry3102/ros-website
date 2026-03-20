import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
});

// ================= REQUEST INTERCEPTOR =================
apiClient.interceptors.request.use(
  (config: any) => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser?.accessToken;

        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: token, // add Bearer if backend requires
          };
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";

    if (status === 401 || status === 403) {
      if (typeof window !== "undefined") {
        console.error("Authentication error:", errorMessage);

        // Clear user data
        localStorage.removeItem("user");
        localStorage.clear();
      }

      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;