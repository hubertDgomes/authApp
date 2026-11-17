import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function AuthIndex() {
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
            WELCOME
          </Text>
        </View>

        <Text className="text-4xl font-bold leading-[44px] text-[#183D37]">
          Your space,{'\n'}your way.
        </Text>
        <Text className="mt-4 text-base leading-6 text-[#65736D]">
          Sign in to continue or create an account to get started. A simpler,
          more secure experience is just a tap away.
        </Text>

        <View className="relative mt-8 h-40 justify-between overflow-hidden rounded-[28px] bg-[#183D37] p-6">
          <View className="absolute -right-7 -top-8 h-32 w-32 rounded-full bg-[#D5A76B]" />
          <View className="absolute -bottom-12 right-14 h-32 w-32 rounded-full bg-[#426E62]" />
          <Text className="text-xs font-semibold tracking-[2px] text-[#DDE9E3]">
            MADE FOR YOU
          </Text>
          <Text className="max-w-[220px] text-xl font-semibold leading-7 text-white">
            Secure access.{'\n'}A fresh start.
          </Text>
        </View>
      </View>

      <View>
        <Link href="/login" asChild>
          <Pressable
            accessibilityRole="button"
            className="h-14 items-center justify-center rounded-2xl bg-[#183D37] active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">Log in</Text>
          </Pressable>
        </Link>

        <Link href="/signup" asChild>
          <Pressable
            accessibilityRole="button"
            className="mt-3 h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-white active:opacity-80"
          >
            <Text className="text-base font-semibold text-[#183D37]">
              Create an account
            </Text>
          </Pressable>
        </Link>

        <Text className="mt-4 text-center text-xs leading-5 text-[#849089]">
          By continuing, you agree to keep your account details secure.
        </Text>
      </View>
    </View>
  )
}
