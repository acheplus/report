import axios, { AxiosError } from 'axios'
import { setCookie, parseCookies } from 'nookies'
import { AuthContext, signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = null) {
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: '/api/v1',
        headers: {
            Authorization: `Bearer ${cookies['achereport.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            if ( error.response.data?.code === 'token.expired' ) {
                //renovar o token
                cookies = parseCookies(ctx);
    
                const { 'achereport.refreshtoken': refreshToken } = cookies
                const originalConfig = error.config
    
                if(!isRefreshing) {
                    isRefreshing = true
    
                    api.post('/refresh', {
                        refreshToken
                    }).then(response => {
                        const { token, refreshToken } =  response.data
        
                        setCookie(ctx, 'achereport.token', token, {
                            maxAge: 60 * 60 * 24 * 30, // 30 days
                            path: '/'
                        })
                        setCookie(ctx, 'achereport.refreshtoken', refreshToken, {
                            maxAge: 60 * 60 * 24 * 30, // 30 days
                            path: '/'
                        })
        
                        api.defaults.headers['Authorization'] =  `Bearer ${token}`
                        failedRequestQueue.forEach(request => request.onSuccess(token))
                        failedRequestQueue = []
                    }).catch(err => {
                        failedRequestQueue.forEach(request => request.onFailed(err))
                        failedRequestQueue = []
    
                        if(process.browser){
                            signOut()
                        } else {
                            return Promise.reject(new AuthTokenError())
                        }
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
                }
                
                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`
    
                            resolve(api(originalConfig))
                        },
                        onFailed: (err: AxiosError) => {
                            reject(err)
                        }
                    })
                })
            } else {
                if (process.browser) {
                    signOut()
                } else {
                    return Promise.reject(new AuthTokenError())
                }
            }
        }
        return Promise.reject(error)
    })
    return api
}


