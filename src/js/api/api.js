console.log("test");
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error("❌ API key is missing. Make sure .env is properly configured.");
} else {
  console.log("✅ API Key Loaded:", API_KEY);
}
