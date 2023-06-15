import Link from 'next/link'
import styles from './styles.module.css'
import {AiOutlineArrowRight} from 'react-icons/ai'
import image from '../../public/images/menu.png'
import { useState } from 'react'

const Menu = ({openMenu, menuHanddler}) => {
  const [load, setLoad] = useState(false);
  const handdleLoadImage = () => {
    setLoad(!load)
  }
  return (
    <div className={styles.effect}>
      <div className={styles.NewMenu}>
        <img src={image.src} className={styles.image} onLoad={handdleLoadImage}></img>
        <ul className={`${load? styles.links : styles.aux}`}>
          <li className={styles.topLink}>
            <Link className={styles.link} href="/" passHref onClick={menuHanddler} >Inicio</Link>
          </li>
          <li className={styles.middleLink}>
            <Link className={styles.link} href="/carrito" passHref onClick={menuHanddler}>Carrito</Link>
          </li>
          <li className={styles.bottomLink}>
            <Link className={styles.link} href="/about" passHref onClick={menuHanddler}>Conocenos</Link>
          </li>
        </ul>
        <button className={styles.button} onClick={menuHanddler}><AiOutlineArrowRight/></button>
      </div>
    </div>
  )
}

export default Menu
