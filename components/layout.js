import Head from 'next/head'

export const siteTitle = 'AchePlus - Desenvolvendo Soluções'

export default function Layout({children, home}) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <title>{siteTitle}</title>
                <meta property="og:title" content="AchePlus - Desenvolvendo Soluções" key="title" />
                <link rel="icon" href="icon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap"
                rel=" stylesheet "
                />
            </Head> 

                {home ? (
                    <>{children}</>
                ) : (
                    <>{children}</>
                )}
           
        </>
    )
}
