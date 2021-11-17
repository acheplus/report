import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = ctx.req.cookies

        if (cookies['achereport.token']){
            return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
            }
        }

        return await fn(ctx)
    }
}