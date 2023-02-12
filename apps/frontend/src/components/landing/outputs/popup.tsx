import { AssetElement } from "lib/@types/landing-types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ModalWrapper } from "components/common/modal-wrapper";
import { Video } from "./video";

interface PopupProps {
  asset: AssetElement;
  setSelectedVideo: Dispatch<SetStateAction<AssetElement>>;
}

export const Popup: React.FC<PopupProps> = ({ asset, setSelectedVideo }) => {
  return (
    <ModalWrapper onCloseAction={() => setSelectedVideo(null)} show={!!asset}>
      {!!asset && (
        <motion.div className="h-full w-full" layout layoutId={asset._key}>
          {asset._type === "video" && (
            <Video mp4={asset.mp4} webm={asset.webm} />
          )}
        </motion.div>
      )}
    </ModalWrapper>
  );
};
