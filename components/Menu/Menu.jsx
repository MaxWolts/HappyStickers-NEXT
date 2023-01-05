import styles from './styles.module.css'
import Link from 'next/link'
import {AiOutlineArrowRight} from 'react-icons/ai'

function Menu({openMenu, setOpenMenu}) {
  return (
    <div className={`${styles.menu}`}>
      <ul className={styles.links}>
        <li>
          <Link className={styles.link} href="/" passHref onClick={()=>{setOpenMenu(false)}}>Inicio</Link>
        </li>
        <li>
          <Link className={styles.link} href="/carrito" passHref>Carrito</Link>
        </li>
        <li>
          <Link className={styles.link} href="/about" passHref>Quienes somos</Link>
        </li>
      </ul>
      <button className={styles.button} onClick={()=>{setOpenMenu(false)}}><AiOutlineArrowRight/></button>
    </div>
  )
}

export default Menu
