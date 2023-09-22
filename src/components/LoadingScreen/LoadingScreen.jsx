import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.5s, visibility 0.5s',
    zIndex: 9999,
};

const loaderStyle = {
    backgroundImage: 'url("https://media.tenor.com/V1wdPWATCx0AAAAC/sama.gif")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
};

const loaderTextStyle = {
    marginTop: '300px',
};

const finishScreenStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.5s, visibility 0.5s',
    zIndex: 9999,
};

const finishContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
};

const finishHeaderStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
};

const finishTextStyle = {
    fontSize: '18px',
    marginBottom: '20px',
};

const finishButtonTextStyle = {
    backgroundColor: '#229ED9',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
};

const LoadingScreen = () => {
    const route = useRouter()
    const [isVisible, setIsVisible] = useState(true);
    const [isFinishScreenVisible, setIsFinishScreenVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.name) {
            route.push('/login')
        }
        const timeout = setTimeout(() => {
            setIsVisible(false);
            setIsFinishScreenVisible(true);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleFinishButtonClick = () => {
        Swal.fire(
            'Anda telah sampai !',
            'Terimakasih telah menggunakan jasa kami :)',
            'success'
        )
        route.push('/')
    };

    return (
        <div>
            <div style={{ ...loaderContainerStyle, opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden' }}>
                <div style={loaderStyle}>
                    <div style={loaderTextStyle}>Driver Sedang di Jalan...</div>
                </div>
            </div>
            <div style={{ ...finishScreenStyle, opacity: isFinishScreenVisible ? 1 : 0, visibility: isFinishScreenVisible ? 'visible' : 'hidden' }}>
                <div style={finishContentStyle}>
                    <h2 style={finishHeaderStyle}>Pesanan Selesai</h2>
                    <p style={finishTextStyle}>Terima kasih telah menggunakan layanan kami.</p>
                    <button onClick={handleFinishButtonClick} style={finishButtonTextStyle}>Orderan Selesai</button>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
