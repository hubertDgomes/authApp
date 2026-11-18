import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native'

const API_URL = 'http://192.168.0.108:3000'

type ApplicationRecord = {
  _id: string
  company?: string
  role?: string
  title?: string
  status?: string
  appliedDate?: string
  createdAt?: string
}

function isApplicationRecord(value: unknown): value is ApplicationRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const record = value as Record<string, unknown>
  const stringFields = [
    '_id',
    'company',
    'role',
    'title',
    'status',
    'appliedDate',
    'createdAt',
  ]

  return (
    typeof record._id === 'string' &&
    stringFields.every(
      (field) => record[field] === undefined || typeof record[field] === 'string',
    )
  )
}

function parseApplications(data: unknown): ApplicationRecord[] {
  let records: unknown

  if (Array.isArray(data)) {
    records = data
  } else if (data && typeof data === 'object' && 'applications' in data) {
    records = data.applications
  }

  if (!Array.isArray(records) || !records.every(isApplicationRecord)) {
    throw new Error('The server returned an invalid applications list.')
  }

  return records
}

async function fetchApplications(token: string | null) {
  const response = await fetch(`${API_URL}/api/allapplications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not load applications (status ${response.status}).`)
  }

  return parseApplications(await response.json())
}

function formatDate(value?: string) {
  if (!value) return 'Applied date not provided'

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
}

export default function AllApplications() {
  const router = useRouter()
  const { token } = useContext(AuthContext)
  const [applications, setApplications] = useState<ApplicationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadApplications = useCallback(async () => {
    try {
      setApplications(await fetchApplications(token))
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Something went wrong while loading applications.',
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [token])

  useEffect(() => {
    let active = true

    fetchApplications(token)
      .then((records) => {
        if (active) setApplications(records)
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Something went wrong while loading applications.',
          )
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token])

  return (
    <View className="flex-1 bg-[#F5F4F0]">
      <FlatList
        data={applications}
        keyExtractor={(item) => item._id}
        onRefresh={() => {
          setRefreshing(true)
          setError(null)
          loadApplications()
        }}
        refreshing={refreshing}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 36,
        }}
        ListHeaderComponent={
          <View>
            <View className="mt-6 flex-row items-center">
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

            <View className="mb-7 mt-8">
              <View className="self-start rounded-full bg-[#E3ECE6] px-4 py-2">
                <Text className="text-xs font-semibold tracking-[2px] text-[#366458]">
                  JOB TRACKER
                </Text>
              </View>
              <Text className="mt-5 text-4xl font-bold leading-[44px] text-[#183D37]">
                All your{'\n'}applications.
              </Text>
              <Text className="mt-3 text-base leading-6 text-[#65736D]">
                {applications.length === 1
                  ? '1 opportunity in your job search.'
                  : `${applications.length} opportunities in your job search.`}
              </Text>
              {applications.length > 0 && error ? (
                <Text className="mt-3 text-sm text-[#8A3E35]">{error}</Text>
              ) : null}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/applications/[details]',
                params: { details: item._id },
              })
            }
            accessibilityRole="button"
            accessibilityLabel={`View ${item.role || item.title || 'application'} at ${item.company || 'company'}`}
            className="mb-4 rounded-3xl border border-[#E8EBE7] bg-white p-5 active:opacity-80"
          >
            <View className="flex-row items-start justify-between">
              <View className="mr-3 flex-1">
                <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-[#65736D]">
                  {item.company || 'Company not provided'}
                </Text>
                <Text className="mt-2 text-xl font-bold leading-7 text-[#183D37]">
                  {item.role || item.title || 'Application'}
                </Text>
                {item.title && item.title !== item.role ? (
                  <Text className="mt-1 text-sm text-[#65736D]">{item.title}</Text>
                ) : null}
              </View>
              <View className="rounded-full bg-[#E3ECE6] px-3 py-2">
                <Text className="text-xs font-semibold text-[#366458]">
                  {item.status || 'No status'}
                </Text>
              </View>
            </View>

            <View className="mt-4 flex-row items-center justify-between border-t border-[#E8EBE7] pt-4">
              <Text className="text-sm text-[#849089]">
                {formatDate(item.appliedDate || item.createdAt)}
              </Text>
              <Text className="text-sm font-semibold text-[#366458]">
                View details  ›
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center pb-10">
            {loading ? (
              <View className="items-center rounded-3xl bg-white p-8">
                <ActivityIndicator color="#183D37" />
                <Text className="mt-3 text-sm text-[#65736D]">
                  Loading applications…
                </Text>
              </View>
            ) : error ? (
              <View className="rounded-3xl border border-[#E8C9C4] bg-white p-5">
                <Text className="text-base font-semibold text-[#8A3E35]">
                  Unable to load applications
                </Text>
                <Text className="mt-2 leading-6 text-[#65736D]">{error}</Text>
                <Pressable
                  onPress={() => {
                    setLoading(true)
                    setError(null)
                    loadApplications()
                  }}
                  accessibilityRole="button"
                  className="mt-4 self-start rounded-xl bg-[#183D37] px-4 py-3 active:opacity-80"
                >
                  <Text className="font-semibold text-white">Try again</Text>
                </Pressable>
              </View>
            ) : (
              <View className="items-center rounded-3xl bg-white p-6">
                <Text className="text-lg font-bold text-[#183D37]">
                  No applications yet
                </Text>
                <Text className="mt-2 text-center leading-6 text-[#65736D]">
                  Add your first job application to start tracking your search.
                </Text>
              </View>
            )}
          </View>
        }
        ListFooterComponent={
          !loading && !error ? (
            <Pressable
              onPress={() => router.push('/applications')}
              accessibilityRole="button"
              className="mt-3 h-14 items-center justify-center rounded-2xl border border-[#C9D2CC] bg-[#183D37] active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">
                Add an application
              </Text>
            </Pressable>
          ) : undefined
        }
      />
    </View>
  )
}
