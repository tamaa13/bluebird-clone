import React from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const Navbar = () => {
    const route = useRouter()

    const logout = () => {
        localStorage.clear()
        route.push('/login')
    }

    return (
        <div className={`nav-container ${inter.className}`}>
            <div className='li-menu'>
                <a >Wellcome, Tama</a>
                <a onClick={logout} className='logout'>Logout</a>
            </div>
        </div>
    )
}

export default Navbar