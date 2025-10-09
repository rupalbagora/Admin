import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // keep if you use cookies/sessions; okay with JWTs too
});

// ✅ Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    // Optional: Log outgoing requests in dev mode
    if (import.meta.env.MODE === "development") {
      console.log("📤 Request:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (optional but useful)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Common error logging
      console.error(
        `🚫 API Error [${error.response.status}]:`,
        error.response.data?.error || error.response.statusText
      );

      // 🔐 Handle unauthorized token
      if (error.response.status === 401) {
        console.warn("⚠️ Unauthorized or token expired. Logging out...");
        // localStorage.removeItem("token");
        // window.location.href = "/login"; // uncomment if you want auto logout
      }
    }
    return Promise.reject(error);
  }
);

export default API;
