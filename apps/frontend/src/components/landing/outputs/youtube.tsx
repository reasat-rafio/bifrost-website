import getYouTubeID from "get-youtube-id";
import { YoutubeProps } from "lib/@types/global-types";
import YT from "react-youtube";

export const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  const id = getYouTubeID(url as string);
  return (
    <section>
      <YT
        className="aspect-video h-full w-full rounded-primary object-contain"
        videoId={id as string}
      />
    </section>
  );
};
