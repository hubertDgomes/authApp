import { AuthContext } from '@/context/AuthContext'
import { Link, useRouter } from 'expo-router'
import { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Home() {
  const { signOut } = useContext(AuthContext)
  const router = useRouter()

  return (
    <View className="flex-1 justify-between bg-[#F5F4F0] px-6 pb-8 pt-6">
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
            ACCOUNT ACTIVE
          </Text>
        </View>
        <Text className="text-4xl font-bold leading-[44px] text-[#183D37]">
          You’re in.{'\n'}Welcome home.
        </Text>
        <Text className="mt-4 text-base leading-6 text-[#65736D]">
          Your account is ready. This is your secure space to get started.
        </Text>

        <View className="relative mt-8 h-48 justify-between overflow-hidden rounded-[28px] bg-[#183D37] p-6">
          <View className="absolute -right-7 -top-8 h-32 w-32 rounded-full bg-[#D5A76B]" />
          <View className="absolute -bottom-12 right-14 h-32 w-32 rounded-full bg-[#426E62]" />
          <Text className="text-xs font-semibold tracking-[2px] text-[#DDE9E3]">
            YOUR AUTHAPP
          </Text>
          <Text className="max-w-[240px] text-xl font-semibold leading-7 text-white">
            Secure access.{'\n'}Made simple.
          </Text>
        </View>
      </View>
      <View>
        <Pressable
          onPress={() => router.push("/applications")}
          accessibilityRole="button"
          className="h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-white active:opacity-80"
        >
          <Text className="text-base font-semibold text-[#183D37]">Add you new application</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => router.push("/applications")}
          accessibilityRole="button"
          className="h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-[#183D37] active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Check all your recent applications</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={signOut}
          accessibilityRole="button"
          className="h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-white active:opacity-80"
        >
          <Text className="text-base font-semibold text-[#183D37]">Log out</Text>
        </Pressable>
        <Text className="mt-4 text-center text-xs leading-5 text-[#849089]">
          Thanks for being here.
        </Text>
      </View>

    </View>
  )
}