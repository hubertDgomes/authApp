import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const API_URL = 'http://192.168.0.108:3000'
  const router = useRouter()

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      Alert.alert('Success', data.message)
      router.replace('/login')
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

          <View className="py-8">
            <View className="mb-5 self-start rounded-full bg-[#E3ECE6] px-4 py-2">
              <Text className="text-xs font-semibold tracking-[2px] text-[#366458]">
                GET STARTED
              </Text>
            </View>
            <Text className="text-4xl font-bold leading-[44px] text-[#183D37]">
              Create your{'\n'}account.
            </Text>
            <Text className="mt-3 text-base leading-6 text-[#65736D]">
              Join us and make your secure space your own.
            </Text>

            <View className="mt-7">
              <Text className="mb-2 text-sm font-semibold text-[#294B43]">
                Full name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#98A39D"
                autoComplete="name"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
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

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor="#98A39D"
                secureTextEntry
                autoComplete="new-password"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                accessibilityRole="button"
                className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#183D37] active:opacity-80"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-base font-semibold text-white">
                    Create account
                  </Text>
                )}
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="text-sm text-[#65736D]">
              Already have an account?{' '}
            </Text>
            <Link href="/login" asChild>
              <Pressable accessibilityRole="link">
                <Text className="text-sm font-bold text-[#183D37]">Log in</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}