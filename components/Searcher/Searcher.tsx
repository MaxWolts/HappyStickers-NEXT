import styles from './styles.module.css'


const Searcher = ({setDataSearcher}) => {
  const search = (value) => {
    setDataSearcher(value.target.value.toLowerCase())
  }
  return (
    <div className={`${styles.searcherContainer}`} id='search'>
      <div className={styles.searcher}>
          <input type="text" name="" id="" onChange={search} aria-label='ingresa lo que quieres buscar' placeholder='Buscar stickers...'/>
          <button className="open-searcher" aria-label='buscar' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </button>
      </div>
  </div>
  )
}

export default Searcher
