import { Navbar } from './navbar'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="sm:ml-20">{children}</main>
        <footer className="flex items-center justify-center mt-auto w-full mb-12 h-20 border-t">
          Yoelvis Mulen - {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
