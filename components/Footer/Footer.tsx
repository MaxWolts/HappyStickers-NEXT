import { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import profilePic from '@images/footer.png'
import { AiOutlineTwitter, AiFillGithub, AiFillLinkedin, AiFillFire } from 'react-icons/ai';
import memeOne from '@images/1.jpg'
import memeTwo from '@images/2.jpg'

const Footer = () => {
  const [memeState, setMemeState] = useState('false')
  const activateMeme = () => {
    setMemeState('firts')
    setTimeout(()=> {
      setMemeState('second')
    }, 500)
    setTimeout(()=> {
      setMemeState('three')
    }, 1000)
    setTimeout(()=> {
      setMemeState('false')
    }, 1500)
  }
  return (
    <>
      <footer className={styles.footer}>
      <p className={styles.title}>Hecho con <strong>amor</strong>, <strong>café</strong> y... un poco de <strong>NEXT</strong> que me encontre.</p>
      <div className={styles.description}>
        <p >Si quieres ver más cositas que hago o quieres contactar conmigo puedes hacerlo por cualquiera de mis redes.</p>
        <ul>
          <li>

            <a href='https://twitter.com/max_wolts'> <AiOutlineTwitter className={styles.icons}/> Twitter</a>
          </li>
          <li>

            <a href='https://github.com/MaxWolts'> <AiFillGithub className={styles.icons}/> Github</a>
          </li>
          <li>

            <a href='https://www.linkedin.com/in/maxwolts/'> <AiFillLinkedin className={styles.icons}/> Linkedin</a>
          </li>
          <li>
            <button onClick={activateMeme}> <AiFillFire className={styles.icons}/> No tocar</button>
          </li>
        </ul>
      </div>
      <Image className={styles.image} src={profilePic} alt='imagen de backgroun de un conejo con una taza de café'/>

    </footer>
    {memeState !== 'false' &&
      <div className={styles.memeContainer}>

        {memeState === 'firts'?  <Image className={styles.memeImage} src={memeOne} alt='bonk1'/>
          : <>
            <Image src={memeTwo} className={styles.memeImage} alt='bonk2'/>
          </>
        }
        {memeState === 'three' && <audio src="https://res.cloudinary.com/max-wolts/video/upload/v1670534752/Bonk_Sound_Effect_x4lkjr.mp3" autoPlay={true}></audio>}
      </div>
    }
    </>
  )
}

export default Footer
