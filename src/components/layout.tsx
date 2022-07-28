import { Navbar } from './navbar'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex min-h-full flex-col bg-gray-50 text-black dark:bg-zinc-900 dark:text-gray-100">
        {/* <main className="sm:ml-20">{children}</main> */}
        <main>{children}</main>
        <footer className="mt-auto mb-12 flex h-20 w-full items-center justify-center border-t dark:border-gray-400">
          Yoelvis Mulen - {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
