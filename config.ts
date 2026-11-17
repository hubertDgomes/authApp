// config.ts
import { Platform } from "react-native";
import Constants from "expo-constants";

const PORT = 5000;

function getApiUrl() {
  // 1. Use .env value if you set one (EXPO_PUBLIC_API_URL=http://192.168.x.x:5000)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. Auto-detect your PC's IP from the Expo dev server (works on a real phone)
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host) {
    return `http://${host}:${PORT}`;
  }

  // 3. Fallbacks for emulator/simulator
  return Platform.OS === "android"
    ? `http://10.0.2.2:${PORT}`
    : `http://localhost:${PORT}`;
}

export const API_URL = getApiUrl();