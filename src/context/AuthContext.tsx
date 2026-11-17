import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'


export const AuthContext = createContext<any>(null)


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkInitialAuth = async () => {
            setLoading(true)
            try {
                const saved = await SecureStore.getItemAsync("token")
                setToken(saved)
            }
            catch (err) {
                setToken(null)
            }
            finally {
                setLoading(false)
            }
        }
        checkInitialAuth()
    }, [])


    const signIn = async (newToken : any) => {
        await SecureStore.setItemAsync("token" , newToken)
        setToken(newToken)
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync("token")
        setToken(null)
    }

    return(
        <>
        <AuthContext.Provider value={{loading , token , signIn, signOut}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export default AuthProvider