import Layout from '@/components/layout';
import styles from '@/styles/about.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import backIcon from '/public/icons/back-icon.svg';
import backDarkIcon from "/public/icons/back-dark-icon.svg";
import contactIcon from '/public/icons/contact-icon.svg';
import instaIcon from '/public/icons/insta-icon.svg';
import locationIcon from '/public/icons/location-icon.svg';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import useTheme from '@/hooks/useTheme';

const About = () => {
  const{theme} = useTheme();
    const router = useRouter();
    const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);

    return ( 
      <>
      <Head>
      <title>{holdingInfo?.name}</title>
      <meta name="description" content={holdingInfo?.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={holdingInfo.logo} />
    </Head>
        <Layout footer={false}>
        <div className={styles.about}>
        <div className={styles['main-title']}>
   <div className={styles.back} onClick={() => router.push(`/${holdingInfo.id}/profile`)}>
   {theme === 'dark'?
            <Image src={backDarkIcon} alt="back icon" width={24} height={24} />
            :
            <Image src={backIcon} alt="back icon" width={24} height={24} />
             }
              <p>
                بازگشت
              </p>
   </div>
   <p className={styles.title}>
     درباره ما
   </p>
   </div>
   <div className={styles['infos']}>
   <div className={styles['info-item']}>
  <div className={styles.contact}>
  <Image
                src={contactIcon}
                alt="contact icon"
                width={24}
                height={24}
              />
              <p>
                شماره تماس:
              </p>
  </div>
  <span>
    {holdingInfo.phone}
  </span>
   </div>
   <div className={styles['info-item']}>
   <div className={styles.instagram}>
  <Image
                src={instaIcon}
                alt="insta icon"
                width={24}
                height={24}
              />
              <p>
                اینستاگرام:
              </p>
  </div>
  <span>
   {holdingInfo.instagram}
  </span>
   </div>
   </div>
   <div className={styles.address}>
   <div className={styles.title}>
  <Image
                src={locationIcon}
                alt="location icon"
                width={24}
                height={24}
              />
              <p>
                آدرس شعبه مرکزی:
              </p>
  </div>
    <div>
    </div>
    <p className={styles['address-text']}>
   {holdingInfo.address}
    </p>
   </div>
   <div className={styles.desc}>
    <p className={styles.title}>
    {holdingInfo.name}
    </p>
    <p>
   {holdingInfo.description}
    </p>
   </div>
        </div>
        </Layout>
        </>
     );
}
 
export default About;