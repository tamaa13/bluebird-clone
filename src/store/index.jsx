import { create } from 'zustand'

const useStore = create((set) => ({
    images: [],
    confirmation: { address: '', destination: '', type: '', duration: '' },
    destination: {},
    setImages: (images) => set(() => ({ images: images })),
    updateConfirmation: (confirmation) => set(() => ({ confirmation: confirmation })),
    setDestination: (destination) => set(() => ({ destination: destination })),
}))

export default useStore