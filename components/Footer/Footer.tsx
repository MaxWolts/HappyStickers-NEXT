'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AiOutlineTwitter,
  AiFillGithub,
  AiFillLinkedin,
  AiFillFire,
} from 'react-icons/ai'
import profilePic from '@images/footer.png'
import memeOne from '@images/1.jpg'
import memeTwo from '@images/2.jpg'
import styles from './styles.module.css'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const Footer = () => {
  const [memeState, setMemeState] = useState('false')
  const activateMeme = () => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return
    setMemeState('firts')
    setTimeout(() => {
      setMemeState('second')
    }, 500)
    setTimeout(() => {
      setMemeState('three')
    }, 1000)
    setTimeout(() => {
      setMemeState('false')
    }, 1500)
  }
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <p className={styles.logo}>HappyStickers</p>
            <p className={styles.tagline}>
              Hecho con <strong>amor</strong>, <strong>café</strong> y... un
              poco de <strong>NEXT</strong> que me encontré.
            </p>
          </div>

          <nav className={styles.column} aria-label="Pie de página">
            <h2 className={styles.columnTitle}>Tienda</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/#catalogo" className={styles.link}>
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/carrito" className={styles.link}>
                  Carrito
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Redes</h2>
            <p className={styles.note}>
              Si quieres ver más cositas que hago o contactar conmigo, puedes
              hacerlo por cualquiera de mis redes.
            </p>
            <ul className={styles.list}>
              <li>
                <a href="https://twitter.com/max_wolts" className={styles.link}>
                  <AiOutlineTwitter
                    className={styles.icon}
                    aria-hidden="true"
                  />
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/MaxWolts" className={styles.link}>
                  <AiFillGithub className={styles.icon} aria-hidden="true" />
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/maxwolts/"
                  className={styles.link}
                >
                  <AiFillLinkedin className={styles.icon} aria-hidden="true" />
                  Linkedin
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.link}
                  onClick={activateMeme}
                >
                  <AiFillFire className={styles.icon} aria-hidden="true" />
                  No tocar
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Image className={styles.image} src={profilePic} alt="" sizes="22rem" />
      </footer>
      {memeState !== 'false' ? (
        <div className={styles.memeContainer}>
          {memeState === 'firts' ? (
            <Image className={styles.memeImage} src={memeOne} alt="Meme bonk" />
          ) : (
            <Image className={styles.memeImage} src={memeTwo} alt="Meme bonk" />
          )}
          {memeState === 'three' ? (
            <audio
              src="https://res.cloudinary.com/max-wolts/video/upload/v1670534752/Bonk_Sound_Effect_x4lkjr.mp3"
              autoPlay={true}
            ></audio>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export default Footer
