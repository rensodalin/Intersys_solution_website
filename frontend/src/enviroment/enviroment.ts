const environment =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://intersys-solution-website-3.onrender.com"
    : "");

export default environment;