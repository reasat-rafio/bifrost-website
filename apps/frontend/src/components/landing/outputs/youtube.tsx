import getYouTubeID from "get-youtube-id";
import { YoutubeProps } from "lib/@types/global-types";
import { useWindowSize } from "lib/hooks";
import { useLayoutEffect, useRef, useState } from "react";
import YT from "react-youtube";

export const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const id = getYouTubeID(url as string);

  useLayoutEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.offsetWidth);
  }, [windowWidth]);

  return (
    <div
      ref={containerRef}
      className="relative my-auto aspect-video h-fit w-full bg-gray/5"
    >
      <YT
        opts={{
          height: "100%",
          width: `${width}px`,
          playerVars: {
            autoplay: 0,
          },
        }}
        className="absolute inset-0"
        videoId={id as string}
      />
    </div>
  );
};
