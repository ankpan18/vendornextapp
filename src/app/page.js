'use client';
import Image from 'next/image'
import styles from './page.module.css'
import React from "react";
import Back from '../assets/google.png';

export default function Home() {
  return (
    <main className={styles.main}>
  <h3 className={styles.h3}>Login using Google Account in order to view and create Vendor</h3>
  <Image src={Back} alt="Google Logo" className={styles.google}/>
  <p className={styles.p}>This website is made using Next JS</p>
  <p className={styles.p}>You can navigate using Header Links</p>
  <p className={styles.p}>Made By Ankur Panthri</p>
</main>
  )
}
