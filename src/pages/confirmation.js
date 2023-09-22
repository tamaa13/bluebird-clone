import useStore from '@/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const orderConfirmationStyles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '24px',
        marginBottom: '16px',
        textAlign: 'center',
        color: '#333',
    },
    details: {
        marginBottom: '24px',
        fontSize: '16px',
        lineHeight: '1.4',
        color: '#555',
    },
    confirmButton: {
        backgroundColor: '#229ED9',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '18px',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        marginTop: '16px',
        transition: 'background-color 0.3s ease-in-out',
    },
    confirmButtonHover: {
        backgroundColor: 'blue',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#ff6347',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '18px',
        cursor: 'pointer',
        border: '1px solid #ff6347',
        width: '100%',
        marginTop: '16px',
        transition: 'background-color 0.3s ease-in-out',
    },
    cancelButtonHover: {
        backgroundColor: 'orange',
    },
};

const OrderConfirmation = () => {
    const route = useRouter()
    const Confirmation = useStore(state => state.confirmation)
    const { address, destination, type, duration } = Confirmation

    const [isConfirmed, setConfirmed] = useState(false);
    const [confirmButtonHovered, setConfirmButtonHovered] = useState(false);
    const [cancelButtonHovered, setCancelButtonHovered] = useState(false);

    const handleConfirm = () => {
        route.push('/driver')
        setConfirmed(true);
    };

    useEffect(() => {
        if (!localStorage.name) {
            route.push('/login')
        }
    }, [])


    return (
        <div style={orderConfirmationStyles.container}>
            <h2 style={orderConfirmationStyles.title}>Detail Order</h2>
            {isConfirmed ? (
                <p style={orderConfirmationStyles.details}>Your order has been confirmed.</p>
            ) : (
                <>
                    <p style={orderConfirmationStyles.details}>
                        <strong>Address:</strong> {address}
                    </p>
                    <p style={orderConfirmationStyles.details}>
                        <strong>Destination:</strong> {destination}
                    </p>
                    <p style={orderConfirmationStyles.details}>
                        <strong>Fleet Type:</strong> {type}
                    </p>
                    <p style={orderConfirmationStyles.details}>
                        <strong>Estimated Time:</strong> {duration}
                    </p>
                    <p style={orderConfirmationStyles.details}>
                        <strong>Price:</strong> Rp. 150.000
                    </p>
                    <button
                        style={{
                            ...orderConfirmationStyles.confirmButton,
                            ...(confirmButtonHovered && orderConfirmationStyles.confirmButtonHover),
                        }}
                        onMouseEnter={() => setConfirmButtonHovered(true)}
                        onMouseLeave={() => setConfirmButtonHovered(false)}
                        onClick={handleConfirm}
                    >
                        Confirm Order
                    </button>
                    <button
                        style={{
                            ...orderConfirmationStyles.cancelButton,
                            ...(cancelButtonHovered && orderConfirmationStyles.cancelButtonHover),
                        }}
                        onMouseEnter={() => setCancelButtonHovered(true)}
                        onMouseLeave={() => setCancelButtonHovered(false)}
                        onClick={() => setConfirmed(true)}
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}

export default OrderConfirmation;
