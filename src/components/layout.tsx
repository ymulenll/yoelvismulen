import { Navbar } from './navbar'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <div className="sm:ml-16">{children}</div>
    </div>
  )
}
