import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { getJsonPlaceholderApi } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          <Link href="/posts/first-post">
            <a>My First Post</a>
          </Link>
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, body, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {body}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const allPostsData = await getJsonPlaceholderApi()
  return {
    props: {
      allPostsData
    }
  }
}