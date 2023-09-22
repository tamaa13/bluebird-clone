import { useRouter } from 'next/router'
import React from 'react'

const Car = () => {
    const router = useRouter()

    const order = () => {
        router.push('/order')
    }

    return (
        <>
            <div style={{ display: 'flex', gap: 45, padding: '30px', alignItems: 'center', justifyContent: 'center' }}>
                <div onClick={order}>
                    <img src="https://www.bluebirdgroup.com/storage/armadaservicetype/626901eccdb74.png" alt="" style={{ width: 50 }} />
                    Ride
                </div>
                <div onClick={order}>
                    <img src="https://www.bluebirdgroup.com/storage/armadaservicetype/6269018684038.png" alt="" style={{ width: 50 }} />
                    Rent
                </div>
                <div onClick={order}>
                    <img src="https://www.bluebirdgroup.com/storage/armadaservicetype/6269031a6d7d5.png" alt="" style={{ width: 50 }} />
                    Delivery
                </div>
                <div onClick={order}>
                    <img src="https://www.bluebirdgroup.com/storage/armadaservicetype/62baa4896b805.png" alt="" style={{ width: 50 }} />
                    Shuttle
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                marginLeft: '40px',
                width: '80%',
                background: 'linear-gradient(to bottom, #EEEEEE, #FFFAF4)',
                height: '180px',
                borderRadius: '10px',
                marginTop: '40px'
            }}>

                <div style={{ display: 'flex', alignItems: 'end', marginBottom: 4, marginLeft: 13 }}>
                    <img src="https://reservation.bluebirdgroup.com/content/images/icon/imgOnlinePayment1.png" alt="" style={{ width: 50 }} />
                    EZPay
                    <button onClick={order} style={{ marginLeft: 143, width: 30, height: 30, backgroundColor: '#229ED9', border: 'none', borderRadius: 10, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'end', marginBottom: 20, marginLeft: 62 }}>Tinggal naik, bayar non-tunai</div>
            </div>
        </>
    )
}

export default Car