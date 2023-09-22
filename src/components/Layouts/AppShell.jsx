import React from 'react'
import Navbar from '../Navbar/Navbar'

const AppShell = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default AppShell