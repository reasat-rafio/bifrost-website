import { GradientBorder } from 'components/common/GradientBorder'
import { useCtx } from 'contexts/global'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ToastProps {}

const ToastIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'success':
      return (
        <div className="bg-green-800 rounded-md p-1">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      )
    case 'error':
      return (
        <div className="bg-orange-500 rounded-md p-1">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      )
  }
}

export const Toast: React.FC<ToastProps> = ({}) => {
  const {
    state: { toasts },
    action: { removeToast },
  } = useCtx()

  return (
    <motion.div className="fixed bottom-5 right-5 flex flex-col w-auto space-y-3">
      <AnimatePresence>
        {toasts.map(({ id, content, type }) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            key={id}
            className="w-auto flex ml-auto"
          >
            <GradientBorder key={id} borderRadious="8px">
              <div className="flex items-center p-4">
                <div
                  id="toast-simple"
                  className="flex items-center w-full max-w-xs space-x-4 text-gray-500  divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                  role="alert"
                >
                  {ToastIcon({ type })}

                  <div className="pl-4 text-sm font-normal">{content}</div>
                </div>
                <button
                  onClick={() => removeToast(id)}
                  type="button"
                  className="rounded-lg focus:ring-2 focus:ring-slate-600 p-1.5 inline-flex hover:bg-slate-700 ml-4 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </GradientBorder>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
