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
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="flex flex-col items-center justify-center w-full flex-1 px-3 sm:px-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Bienvenido a mi web 👋
          </h1>

          <div className="flex flex-wrap items-center justify-around mt-6 sm:w-full">
            <Link href="/videos">
              <a className="p-6 mt-6 text-left border w-full max-w-lg rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h2 className="text-2xl font-bold">Videos 📺</h2>
                <p className="mt-4 text-xl">
                  Videos sobre programación web, AWS y mucho más.
                </p>
              </a>
            </Link>

            <Link href="/playlists">
              <a className="p-6 mt-6 text-left border w-full max-w-lg rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h2 className="text-2xl font-bold">Series 🍿</h2>
                <p className="mt-4 text-xl">Series de diferentes tecnologías</p>
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
