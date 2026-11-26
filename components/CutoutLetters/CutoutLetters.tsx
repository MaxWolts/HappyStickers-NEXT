import styles from './styles.module.css'

type CutoutLettersProps = {
  text: string
  className?: string
}

type CutoutLetter = {
  character: string
  position: number
}

const splitIntoWords = (text: string) => {
  let position = 0

  return text
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) =>
      Array.from(word).map((character): CutoutLetter => {
        const letter = { character, position }
        position += 1
        return letter
      }),
    )
}

const LETTER_STYLES = [styles.paper, styles.outline, styles.accent, styles.ink]

const pickLetterStyle = (position: number) =>
  LETTER_STYLES[position % LETTER_STYLES.length]

const CutoutLetters = ({ text, className }: CutoutLettersProps) => {
  const words = splitIntoWords(text)
  const wordsClassName = className
    ? `${styles.words} ${className}`
    : styles.words

  return (
    <span className={wordsClassName} aria-hidden="true">
      {words.map((letters, wordIndex) => (
        <span key={wordIndex} className={styles.word}>
          {letters.map((letter) => (
            <span
              key={letter.position}
              className={`${styles.letter} ${pickLetterStyle(letter.position)}`}
              data-cutout-letter
            >
              {letter.character}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

export default CutoutLetters
