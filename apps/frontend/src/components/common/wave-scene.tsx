import clsx from 'clsx'
import ThreeJSWaves from 'src/components/ThreeJSWaves'

interface WaveSceneProps {
  className?: string
  play: boolean
}

export const WaveScene: React.FC<WaveSceneProps> = ({ className = 'translate-y-[25vh]', play }) => {
  return (
    <div
      className={clsx(
        'absolute left-0 bottom-0 w-full h-full flex items-end',
        className,
        play ? 'block' : 'hidden',
      )}
    >
      <div className="relative ">
        <ThreeJSWaves play={play} />
      </div>
    </div>
  )
}
