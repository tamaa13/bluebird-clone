import React, { useState, useEffect } from 'react';
import styles from './CarouselPromo.module.css';
import useStore from '@/store';
const CarouselPromo = () => {
  const images = useStore((state) => state.images);

  const image = [
    'https://strapi-jkt-digi46.s3.ap-southeast-3.amazonaws.com/bni_credit_card_banner_fitur_mbanking_small_b8d822ed1c.jpg',
    'https://strapi-jkt-digi46.s3.ap-southeast-3.amazonaws.com/bni_banner_qris_mudah_2020_small_8f0e73341a.jpg',
    'https://strapi-jkt-digi46.s3.ap-southeast-3.amazonaws.com/bni_sms_notifikasi_2020_small_3f0447da34.jpg',
    'https://strapi-jkt-digi46.s3.ap-southeast-3.amazonaws.com/promo_bni_point_plus_januari_2021_small_1fb82bf7c6.jpg',
    'https://strapi-jkt-digi46.s3.ap-southeast-3.amazonaws.com/Cicilan_0_Top_Merchant_7b7948916b.jpg',
    'https://strapi-jkt-digi46.s3.ap-southeast-3.amazonaws.com/bni_credit_card_apply_kk_via_mobile_small_e1e8aaf172.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.imageContainer}>
          <img
            src={image[currentIndex]}
            alt={`Image ${currentIndex}`}
            className={styles.carouselImage}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselPromo;