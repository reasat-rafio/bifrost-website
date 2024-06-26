// import { useIntersection } from "lib/hooks";
import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "./play-icon";

interface VideoProps {
  mp4?: string;
  webm?: string;
}

export const Video: React.FC<VideoProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const intersecting = useIntersection(videoRef, {
  //   threshold: 0.1,
  // })?.isIntersecting;

  const [play, setPlay] = useState(true);
  const [hovered, setHovered] = useState(false);
  // useEffect(() => {
  //   if (!intersecting) {
  //     setPlay(false);
  //     videoRef?.current?.pause();
  //   }
  // }, [intersecting]);
  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-full w-full overflow-hidden object-cover object-center"
    >
      <div className="relative h-full w-full">
        <PlayIcon
          play={play}
          hovered={hovered}
          setPlay={setPlay}
          videoRef={videoRef}
        />
        <video
          className="h-full w-full object-contain"
          ref={videoRef}
          width="100%"
          height="100%"
          // controls={play}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
        >
          <source src={props?.webm} type="video/webm" />
          <source src={props?.mp4} type="video/mp4" />
          Sorry, your browser doesn&apos;t support embedded videos.
        </video>
      </div>
    </div>
  );
};
