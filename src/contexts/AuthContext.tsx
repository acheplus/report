import { createContext, ReactNode, useState , useEffect} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/apiClient'
import Router from 'next/router'

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
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)
let authChannel: BroadcastChannel

export function signOut() {
    destroyCookie(undefined, 'achereport.token')
    destroyCookie(undefined, 'achereport.refreshtoken')
    authChannel.postMessage('signOut')

    Router.push('/')
}

export function AuthProvider({children}: AuthProviderProps) {
    const [ user, setUser] = useState<User>()
    const isAuthenticated = !!user;

    useEffect(() => {
        if (!authChannel) {
            authChannel = new BroadcastChannel('auth')
        }
        authChannel.onmessage = (message) => {
            switch(message.data){
                case 'signOut':
                    signOut()
                    break;
                case 'signIn':
                    Router.push('/dashboard')
                    break
                default:
                    break
            }
        }
    })

    useEffect(() => {
        const { 'achereport.token': token} = parseCookies()
        if (!authChannel) {
            authChannel = new BroadcastChannel('auth')
        }

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

            setCookie(undefined, 'achereport.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })
            setCookie(undefined, 'achereport.refreshtoken', refreshToken, {
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

            Router.push('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    )
}