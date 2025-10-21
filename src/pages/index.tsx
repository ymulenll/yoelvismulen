import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2">
        <Head>
          <title>
            Yoelvis Mulen {'{'} code {'}'}
          </title>
          <meta name="robots" content="noindex" />
        </Head>

        <section className="flex w-full flex-1 flex-col items-center justify-center px-3 pb-16 text-center sm:px-20">
          <h1 className="text-4xl font-bold md:text-6xl">
            Bienvenido a mi web 👋
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-around sm:w-full">
            <Link href="/videos">
              <a className="mt-6 w-full max-w-lg rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                <h2 className="text-2xl font-bold">Videos 📺</h2>
                <p className="mt-4 text-xl">
                  Videos sobre programación web, AWS y mucho más.
                </p>
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
