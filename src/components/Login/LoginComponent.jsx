import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const LoginComponent = () => {
    const route = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        const apiUrl = 'http://localhost:3001/login';

        const credentials = {
            email: email,
            password: password,
        };

        try {
            if (email && password !== '') {
                const response = await axios.post(apiUrl, credentials);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Berhasil',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    localStorage.setItem('name', response.data.username)
                    await route.push('/')
                    setError(null);
                } else {
                    setError('Gagal melakukan login. Periksa kembali email dan password Anda.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email atau Password salah!',
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email atau Password salah!',
                })
            }


        } catch (error) {
            setError('Gagal melakukan login. Terjadi kesalahan pada server.');
            console.log(error)
        }
    };
    // const name = localStorage.getItem('name')
    // console.log(name)
    useEffect(() => {
        const name = localStorage.getItem('name')
        console.log(name)
        if (localStorage.name) {
            route.push('/')
        } else {
            route.push('/login')
        }
    }, [])

    return (
        <div
            style={{
                width: '300px',
                marginTop: '30%',
                marginLeft: '12%',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Login</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Masukkan Email Anda"
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Masukkan Password Anda"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
            </div>
            <button
                onClick={handleLogin}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    fontSize: '18px',
                    backgroundColor: '#229ED9',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Login
            </button>
            {error && (
                <p style={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>{error}</p>
            )}
        </div>
    );
};

export default LoginComponent;
