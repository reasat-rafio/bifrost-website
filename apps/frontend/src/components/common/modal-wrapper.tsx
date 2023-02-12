import { Portal } from "@reach/portal";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ModalWrapperProps {
  show: boolean;
  onCloseAction: () => void;
  children: ReactNode;
}

export const BackDropVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      display: {
        delay: 0.5,
      },
    },
  },
  enter: {
    opacity: 1,
    transition: {},
  },
};

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  show,
  children,
  onCloseAction,
}) => {
  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="hidden"
            variants={BackDropVariants}
            className="fixed top-0 left-0 z-50 min-h-screen w-screen bg-black/80 backdrop-blur-lg"
          >
            <motion.span
              onClick={onCloseAction}
              className="fixed top-10 right-10 z-20 cursor-pointer rounded-full bg-white p-1 backdrop-blur-lg"
              whileHover={{ scale: 1.1 }}
            >
              <X className="h-7 w-7 lg:h-9 lg:w-9" />
            </motion.span>

            <div className="mx-auto flex h-screen max-w-6xl items-center justify-center overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const X = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
