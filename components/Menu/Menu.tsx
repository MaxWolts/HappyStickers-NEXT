'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineArrowRight } from 'react-icons/ai'
import image from '@images/menu.png'
import styles from './styles.module.css'

type MenuProps = {
  menuHanddler: () => void
}

const Menu = ({ menuHanddler }: MenuProps) => {
  const [load, setLoad] = useState(false)
  const handdleLoadImage = () => {
    setLoad(!load)
  }
  return (
    <div className={styles.effect}>
      <div className={styles.NewMenu}>
        <Image
          src={image}
          alt=""
          className={styles.image}
          onLoad={handdleLoadImage}
        />
        <ul className={`${load ? styles.links : styles.aux}`}>
          <li className={styles.topLink}>
            <Link className={styles.link} href="/" onClick={menuHanddler}>
              Inicio
            </Link>
          </li>
          <li className={styles.middleLink}>
            <Link
              className={styles.link}
              href="/carrito"
              onClick={menuHanddler}
            >
              Carrito
            </Link>
          </li>
          <li className={styles.bottomLink}>
            <Link className={styles.link} href="/about" onClick={menuHanddler}>
              Conocenos
            </Link>
          </li>
        </ul>
        <button className={styles.button} onClick={menuHanddler}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Menu
