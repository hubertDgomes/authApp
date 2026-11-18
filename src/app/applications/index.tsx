import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

export default function Applications() {
  const [application, setApplication] = useState({
    company: '',
    role: '',
    title: '',
    link: '',
    status: 'Applied',
    appliedDate: '',
    platform: '',
    description: ''
  })

  const [loading, setLoading] = useState(false)
  const API_URL = 'http://192.168.0.108:3000'
  const router = useRouter()

  const {token} = useContext(AuthContext)

  const handleSubmitApplication = async () => {
    if (!application.company.trim() || !application.role.trim()) {
      Alert.alert('Missing information', 'Company and role are required.')
      return
    }
    if (loading) return

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(application),
        credentials: "include"
      })
      const data = await res.json()
      console.log(data._id)
      if (!res.ok) {
        Alert.alert("Alert", data.message)
        return;
      }
      Alert.alert("Application Submitted!" , "You application has been saved.")
      setApplication({
        company: '',
        role: '',
        title: '',
        link: '',
        status: 'Applied',
        appliedDate: '',
        platform: '',
        description: ''
      })
      router.push({
        pathname: '/applications/[details]',
        params : {details: data._id}
      })
    }
    catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={{ flex: 1 }}
      className=" bg-[#F5F4F0]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 pb-8 pt-6">
          <View className="flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#183D37]">
              <Text className="text-xl font-bold text-white">A</Text>
            </View>
            <Text className="ml-3 text-sm font-bold tracking-[2px] text-[#183D37]">
              AUTHAPP
            </Text>
          </View>

          <View className="mt-10">
            <View className="mb-5 self-start rounded-full bg-[#E3ECE6] px-4 py-2">
              <Text className="text-xs font-semibold tracking-[2px] text-[#366458]">
                JOB TRACKER
              </Text>
            </View>
            <Text className="text-4xl font-bold leading-[44px] text-[#183D37]">
              Add an{'\n'}application.
            </Text>
            <Text className="mt-3 text-base leading-6 text-[#65736D]">
              Keep your job search organized in one place.
            </Text>

            <View className="mt-8">
              <Text className="mb-2 text-sm font-semibold text-[#294B43]">
                Company *
              </Text>
              <TextInput
                value={application.company}
                onChangeText={(company) =>
                  setApplication({ ...application, company })
                }
                placeholder="Company name"
                placeholderTextColor="#98A39D"
                autoCapitalize="words"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Role *
              </Text>
              <TextInput
                value={application.role}
                onChangeText={(role) =>
                  setApplication({ ...application, role })
                }
                placeholder="e.g. Software Engineer"
                placeholderTextColor="#98A39D"
                autoCapitalize="words"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Job title
              </Text>
              <TextInput
                value={application.title}
                onChangeText={(title) =>
                  setApplication({ ...application, title })
                }
                placeholder="Optional"
                placeholderTextColor="#98A39D"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Job link
              </Text>
              <TextInput
                value={application.link}
                onChangeText={(link) =>
                  setApplication({ ...application, link })
                }
                placeholder="https://"
                placeholderTextColor="#98A39D"
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Status
              </Text>
              <TextInput
                value={application.status}
                onChangeText={(status) =>
                  setApplication({ ...application, status })
                }
                placeholder="e.g. Applied"
                placeholderTextColor="#98A39D"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Applied date
              </Text>
              <TextInput
                value={application.appliedDate}
                onChangeText={(appliedDate) =>
                  setApplication({ ...application, appliedDate })
                }
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#98A39D"
                keyboardType="numbers-and-punctuation"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />

              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Platform
              </Text>
              <TextInput
                value={application.platform}
                onChangeText={(platform) =>
                  setApplication({ ...application, platform })
                }
                placeholder="e.g. LinkedIn"
                placeholderTextColor="#98A39D"
                autoCapitalize="words"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />
              <Text className="mb-2 mt-4 text-sm font-semibold text-[#294B43]">
                Description
              </Text>
              <TextInput
                value={application.description}
                onChangeText={(description) =>
                  setApplication({ ...application, description })
                }
                placeholder="Write the full job description"
                placeholderTextColor="#98A39D"
                autoCapitalize="words"
                className="h-14 rounded-2xl border border-[#D7DDD8] bg-white px-4 text-base text-[#183D37]"
              />
            </View>
            <View>
              <Pressable
                onPress={handleSubmitApplication}
                accessibilityRole="button"
                className="mt-7 h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-[#183D37] active:opacity-80"
              >
                {loading ? <ActivityIndicator /> :
                  <>
                    <Text className="text-base font-semibold text-white">Submit you application</Text>
                  </>}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
