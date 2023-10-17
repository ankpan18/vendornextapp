'use client';
import Link from 'next/link';
import styles from '../styles/Header.module.css'; // Import a CSS module
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react";
import Expand from '../assets/bars-solid.svg';
import Image from 'next/image';
import React, { useRef } from 'react'



const Header = () => {
    const { data: session } = useSession();
    const head=useRef(null);

    const handleClick = () => {
      if(head.current.children[1].style.display==="none")
    {
      head.current.style.flexDirection="column";
      head.current.children[1].style.display="flex";
      head.current.children[1].style.flexDirection="column";
      head.current.children[1].height="50vh";
      head.current.children[2].children[0].style.display="flex";
      head.current.children[2].children[0].style.flexDirection="column-reverse";
    }
    else
    {
      head.current.children[1].style.display="none";
      head.current.children[2].children[0].style.display="none";
    }
  
  }
  return (
      <div className={styles.container} ref={head}>
        <div className={styles.div2}>
            <Image src={Expand} alt="Expand" className={styles.expand} onClick={handleClick}/>
          </div>
        <div className={styles.div1} >
          
        <div className={styles.link}>
        <Link href="/"> 
            Home
          </Link>
        </div>
        <div className={styles.link}>
        <Link href="/display"> 
            Display
          </Link>
        </div>
        <div className={styles.link}>
          <Link href="/create">
            Create
          </Link>
        </div>
        </div>
        <div>
        {session?<div className={styles.signin}>
        <p>{session.user.name}</p>

        <button className={styles.btn1} onClick={() => signOut()}>Logout</button>
        </div>:<div className={styles.signin}>
        <button className={styles.btn1} onClick={() => signIn('google')}>Sign In</button>
          </div>}
        </div>
      </div>
  )
}

export default Header