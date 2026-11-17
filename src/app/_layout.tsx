import { SplashScreen, Stack } from "expo-router";
import '../global.css'
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect } from "react";
import AuthProvider, { AuthContext } from "@/context/AuthContext";


SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}

function RootNavigator() {
  const { token, loading } = useContext(AuthContext)

  useEffect(() => {
    if (!loading) SplashScreen.hideAsync()
  }, [loading])

  if (loading) return null

  const isLoggedIn = !!token

  return (
    <SafeAreaView className="flex-1">
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_left" }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  )
}
