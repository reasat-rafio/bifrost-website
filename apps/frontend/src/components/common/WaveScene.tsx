import clsx from 'clsx'
import ThreeJSWaves from 'src/components/ThreeJSWaves'

interface WaveSceneProps {
  className?: string
}

export const WaveScene: React.FC<WaveSceneProps> = ({ className = 'translate-y-[25vh]' }) => {
  return (
    <div className={clsx('absolute left-0 bottom-0 w-full h-full flex items-end', className)}>
      <div className="relative ">
        <ThreeJSWaves />
      </div>
    </div>
  )
}
