import styles from './ParallaxLayer.module.css'

type ParallaxLayerProps = {
  children: React.ReactNode
  depth: number
  className?: string
}

const ParallaxLayer = ({ children, depth, className }: ParallaxLayerProps) => {
  const layerClassName = className
    ? `${styles.layer} ${className}`
    : styles.layer

  return (
    <div className={layerClassName} data-parallax-depth={depth}>
      {children}
    </div>
  )
}

export default ParallaxLayer
