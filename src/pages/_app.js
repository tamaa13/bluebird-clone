import AppShell from '@/components/Layouts/AppShell'
import '../styles/globals.css'
import '../components/Navbar/index.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
