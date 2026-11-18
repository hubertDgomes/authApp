import { AuthContext } from '@/context/AuthContext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'

type ApplicationRecord = {
  _id?: string
  company?: string
  role?: string
  title?: string
  link?: string
  status?: string
  appliedDate?: string
  platform?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

function isApplicationRecord(value: unknown): value is ApplicationRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const record = value as Record<string, unknown>
  const stringFields = [
    'company',
    'role',
    'title',
    'link',
    'status',
    'appliedDate',
    'platform',
    'description',
    'createdAt',
    'updatedAt',
  ]

  return stringFields.every(
    (field) => record[field] === undefined || typeof record[field] === 'string',
  )
}

function formatDate(value?: string) {
  if (!value) return 'Not provided'

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <View className="border-b border-[#E8EBE7] py-4 last:border-b-0">
      <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-[#849089]">
        {label}
      </Text>
      <Text selectable className="mt-2 text-base leading-6 text-[#183D37]">
        {value?.trim() || 'Not provided'}
      </Text>
    </View>
  )
}

export default function Details() {
  const { details } = useLocalSearchParams<{ details: string }>()
  const applicationId = Array.isArray(details) ? details[0] : details
  const router = useRouter()
  const { token } = useContext(AuthContext)
  const [application, setApplication] = useState<ApplicationRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const API_URL = 'http://192.168.0.108:3000'

  useEffect(() => {
    let active = true

    const fetchApplication = async () => {
      if (!applicationId) {
        setError('Application could not be found.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_URL}/api/application/${applicationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Could not load this application (status ${response.status}).`)
        }

        const data: unknown = await response.json()
        const record = Array.isArray(data) ? data[0] : data
        if (!isApplicationRecord(record)) {
          throw new Error('The server returned no application details.')
        }

        if (active) setApplication(record)
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong while loading this application.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchApplication()

    return () => {
      active = false
    }
  }, [applicationId, token])

  return (
    <ScrollView
      className="flex-1 bg-[#F5F4F0]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="px-6 pb-10 pt-6">
        <View className="flex-row items-center">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#183D37]">
            <Text className="text-xl font-bold text-white">A</Text>
          </View>
          <Text className="ml-3 text-sm font-bold tracking-[2px] text-[#183D37]">
            AUTHAPP
          </Text>
        </View>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          className="mt-8 self-start rounded-full bg-white px-4 py-2 active:opacity-70"
        >
          <Text className="text-sm font-semibold text-[#366458]">‹  Back</Text>
        </Pressable>

        <View className="mt-8">
          <View className="self-start rounded-full bg-[#E3ECE6] px-4 py-2">
            <Text className="text-xs font-semibold tracking-[2px] text-[#366458]">
              JOB TRACKER
            </Text>
          </View>
          <Text className="mt-5 text-4xl font-bold leading-[44px] text-[#183D37]">
            Application{'\n'}details.
          </Text>
          <Text className="mt-3 text-base leading-6 text-[#65736D]">
            Your job opportunity, all in one place.
          </Text>
        </View>

        {loading ? (
          <View className="mt-8 items-center rounded-3xl bg-white p-8">
            <ActivityIndicator color="#183D37" />
            <Text className="mt-3 text-sm text-[#65736D]">Loading application…</Text>
          </View>
        ) : error ? (
          <View className="mt-8 rounded-3xl border border-[#E8C9C4] bg-white p-5">
            <Text className="text-base font-semibold text-[#8A3E35]">
              Unable to load application
            </Text>
            <Text className="mt-2 leading-6 text-[#65736D]">{error}</Text>
          </View>
        ) : application ? (
          <>
            <View className="mt-8 rounded-3xl bg-[#183D37] p-6">
              <Text className="text-xs font-semibold tracking-[2px] text-[#DDE9E3]">
                {application.company || 'COMPANY'}
              </Text>
              <Text className="mt-3 text-2xl font-bold leading-8 text-white">
                {application.role || application.title || 'Application'}
              </Text>
              {application.title ? (
                <Text className="mt-1 text-base text-[#DDE9E3]">
                  {application.title}
                </Text>
              ) : null}
              <View className="mt-5 self-start rounded-full bg-[#DDE9E3] px-4 py-2">
                <Text className="text-xs font-bold text-[#183D37]">
                  {application.status || 'Status not set'}
                </Text>
              </View>
            </View>

            <View className="mt-5 rounded-3xl bg-white px-5">
              <DetailItem label="Company" value={application.company} />
              <DetailItem label="Role" value={application.role} />
              <DetailItem label="Job title" value={application.title} />
              <DetailItem label="Status" value={application.status} />
              <DetailItem label="Applied date" value={formatDate(application.appliedDate)} />
              <DetailItem label="Platform" value={application.platform} />
              <DetailItem label="Job link" value={application.link} />
            </View>

            {application.description ? (
              <View className="mt-5 rounded-3xl bg-white p-5">
                <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-[#849089]">
                  Job description
                </Text>
                <Text selectable className="mt-3 text-base leading-7 text-[#183D37]">
                  {application.description}
                </Text>
              </View>
            ) : null}

            <Pressable
              onPress={() => router.push('/applications/AllApp')}
              accessibilityRole="button"
              className="mt-7 h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-[#183D37] active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">
                See all applications
              </Text>
            </Pressable>

            <Text className="mt-6 text-center text-xs text-[#849089]">
              Added {formatDate(application.createdAt)}
              {application.updatedAt
                ? ` · Updated ${formatDate(application.updatedAt)}`
                : ''}
            </Text>
          </>
        ) : null}
      </View>
    </ScrollView>
  )
}
