import { AuthContext } from '@/context/AuthContext'
import { Link, useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const API_URL = 'http://192.168.0.108:3000'
  const router = useRouter()
  const { signIn } = useContext(AuthContext)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      if (typeof data.token !== 'string' || !data.token) {
        throw new Error('Login response did not include a valid token')
      }

      await signIn(data.token)
    } catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-[#F5F4F0]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-between px-6 pb-8 pt-6">
          <View className="flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#183D37]">
              <Text className="text-xl font-bold text-white">A</Text>
            </View>
            <Text className="ml-3 text-sm font-bold tracking-[2px] text-[#183D37]">
              AUTHAPP
            </Text>
          </View>

          <View className="py-10">
            <View className="mb-5 self-start rounded-full bg-[#E3ECE6] px-4 py-2">
              <Text className="text-xs font-semibold tracking-[2px] text-[#366458]">
                WELCOME BACK
              </Text>
            </View>
            <Text className="text-4xl font-bold leading-[44px] text-[#183D37]">
              Good to see{'\n'}you again.
            </Text>
            <Text className="mt-3 text-base leading-6 text-[#65736D]">
              Sign in to pick up right where you left off.
            </Text>

            <View className="mt-8">
              <Text className="mb-2 text-sm font-semibold text-[#294B43]">
                Email address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#98A39D"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-5 text-sm font-semibold text-[#294B43]">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#98A39D"
                secureTextEntry
                autoComplete="current-password"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Pressable
                onPress={handleLogin}
                disabled={loading}
                accessibilityRole="button"
                className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#183D37] active:opacity-80"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-base font-semibold text-white">
                    Log in
                  </Text>
                )}
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-[#65736D]">New to AuthApp? </Text>
            <Link href="/signup" asChild>
              <Pressable accessibilityRole="link">
                <Text className="text-sm font-bold text-[#183D37]">
                  Create an account
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
