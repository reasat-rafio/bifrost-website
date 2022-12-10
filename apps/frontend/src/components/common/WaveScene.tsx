import ThreeJSWaves from 'src/components/ThreeJSWaves'

interface WaveSceneProps {}

export const WaveScene: React.FC<WaveSceneProps> = ({}) => {
  return (
    <div className="absolute left-0 bottom-0 w-full h-full flex items-end">
      <div className="relative translate-y-[25vh]">
        <ThreeJSWaves />
      </div>
    </div>
  )
}
