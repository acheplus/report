import { createContext, ReactNode, useState , useEffect} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/apiClient'
import Router, {useRouter} from 'next/router'
import {BroadcastChannel} from "broadcast-channel";

type User = {
    username: string;
    email: string;
    permissions: string[];
    roles: string[];
    prefeitura: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials): Promise<void>;
    user: User;
    isAuthenticated: boolean;
    authChannel: BroadcastChannel;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    destroyCookie({}, 'achereport.token', {
        path: '/'
    })
    destroyCookie({}, 'achereport.refreshtoken', {
        path: '/'
    })
    Router.push("/")
}

export function AuthProvider({children}: AuthProviderProps) {
    const router = useRouter()
    const [ user, setUser] = useState<User>()
    const isAuthenticated = !!user;
    let authChannel: BroadcastChannel = new BroadcastChannel('auth')

    useEffect(() => {

        authChannel.onmessage = (message) => {
            switch(message){
                case 'signOut':
                    router.push('/')
                case 'signIn':
                    router.push('/previne')
                default:
                    break
            }
        }
    })

    useEffect(() => {
        const { 'achereport.token': token} = parseCookies()

        if(token) {
            api.get('/me')
            .then( response => {
                const { username, email, permissions, roles, prefeitura } = response.data

                setUser({ username, email, permissions, roles, prefeitura })

            })
            .catch(error => {
                signOut()
            })
        }
    }, [])

    async function signIn({email, password}: SignInCredentials) {
        try { 
            const response = await api.post('tokens', {
                email,
                password
            })

            const { token, refreshToken, permissions, roles, username, prefeitura } = response.data

            setCookie(null, 'achereport.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })
            setCookie(null, 'achereport.refreshtoken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            setUser({
                username,
                prefeitura,
                email,
                permissions,
                roles
            })

            api.defaults.headers['Authorization'] =  `Bearer ${token}`

            authChannel.postMessage('signIn')

            await router.push('/previne')
        } catch (err) {
            alert('Usuário ou senha incorretos.')
        }
    }
    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user, authChannel}}>
            {children}
        </AuthContext.Provider>
    )
}