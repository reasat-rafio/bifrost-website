import { AssetElement } from "lib/@types/landing-types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ModalWrapper } from "components/common/modal-wrapper";
import { Video } from "./video";
import { Youtube } from "./youtube";

export interface PopupProps {
  asset: AssetElement;
  setSelectedVideo: Dispatch<SetStateAction<AssetElement>>;
}

const Popup: React.FC<PopupProps> = ({ asset, setSelectedVideo }) => {
  useEffect(() => {
    window.addEventListener("scroll", () => setSelectedVideo(null));
    return () =>
      window.removeEventListener("scroll", () => setSelectedVideo(null));
  }, []);

  return (
    <ModalWrapper onCloseAction={() => setSelectedVideo(null)} show={!!asset}>
      {!!asset && (
        <motion.div
          className=" flex h-full w-full items-center justify-center"
          layout
          layoutId={asset._key}
        >
          {asset._type === "video" && (
            <Video mp4={asset.mp4} webm={asset.webm} />
          )}
          {asset._type === "youtube" && <Youtube url={asset.url} />}
        </motion.div>
      )}
    </ModalWrapper>
  );
};

export default Popup;
