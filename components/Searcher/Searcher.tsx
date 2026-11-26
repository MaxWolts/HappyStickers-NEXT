import styles from './styles.module.css'

type SearcherProps = {
  value: string
  onSearchChange: (value: string) => void
}

const Searcher = ({ value, onSearchChange }: SearcherProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <div className={styles.field}>
      <label htmlFor="sticker-search" className={styles.label}>
        Buscar stickers
      </label>
      <input
        id="sticker-search"
        type="search"
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Pikachu, Jojos, Batman…"
        autoComplete="off"
      />
    </div>
  )
}

export default Searcher
