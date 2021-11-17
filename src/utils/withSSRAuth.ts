import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie } from "nookies";
import decode from 'jwt-decode'
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOption = {
    permissions?: string[];
    roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOption) {
    return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = ctx.req.cookies
        const token = cookies['achereport.token']

        if (!token){
            return {
            redirect: {
                destination: '/',
                permanent: false
            }
            }
        }

        if (options) {
            const user = decode<{permissions: string[], roles: string[]}>(token)
            const { permissions, roles } = options

            const userHasValidPermissions = validateUserPermissions({
                user,
                permissions,
                roles 
            })
            
            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false
                    }
                }
            }
        }

        try {
            return await fn(ctx)
        } catch (err) {
            destroyCookie(ctx, 'achereport.token')
            destroyCookie(ctx, 'achereport.refreshtoken')
            console.log(err)
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
}