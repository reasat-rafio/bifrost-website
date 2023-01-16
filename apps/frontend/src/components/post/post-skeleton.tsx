import { motion, AnimatePresence } from 'framer-motion'

interface PostSkeletonProps {
  loading: boolean
}

export const PostSkeleton: React.FC<PostSkeletonProps> = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 grid animate-pulse lg:grid-cols-2 grid-cols-1 py-16 lg:gap-20 gap-10 "
        >
          <div className="rounded-[14px] bg-slate-700 w-full h-[400px] "></div>
          <div className="space-y-6 py-1">
            {/*  */}
            <div className="h-2 bg-slate-700 rounded w-[50%]"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                <div className="h-2 bg-slate-700 rounded col-span-3"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                <div className="h-2 bg-slate-700 rounded col-span-3"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded w-[30%]"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
