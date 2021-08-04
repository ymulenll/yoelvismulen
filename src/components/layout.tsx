import { Navbar } from './navbar'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <div className="mb-14 sm:ml-20">{children}</div>
    </div>
  )
}
