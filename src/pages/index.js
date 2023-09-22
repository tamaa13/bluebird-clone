import { Inter } from 'next/font/google'
import CarouselPromo from '../components/CarouselPromo/CarouselPromo'
import { useEffect } from 'react'
import axios from 'axios'
import useStore from '../store'
import Car from '@/components/Car/Car'
import Navbar from '@/components/Navbar/Navbar'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const route = useRouter()
  const setImages = useStore(state => state.setImages)

  useEffect(() => {
    if (!localStorage.name) {
      route.push('/login')
    }
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://content.digi46.id/promos')
        if (response.status === 200) {
          await setImages(response?.data)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className={`${inter.className}`}>
      <Navbar />
      <CarouselPromo />
      <Car />
    </div>
  )
}
