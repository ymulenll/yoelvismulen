import { Navbar } from './navbar'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="sm:ml-20">{children}</main>
      <footer className="flex items-center justify-center mt-4 w-full h-20 border-t">
        Yoelvis Mulen - {new Date().getFullYear()}
      </footer>
    </div>
  )
}
