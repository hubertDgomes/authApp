import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'

export default function Applications() {
  const [application, setApplication] = useState({
    company: '',
    role: '',
    title: '',
    link: '',
    status: '',
    appliedDate: '',
    platform: '',
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={{flex: 1}}
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
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
