import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const Modal = ({
  show = false,
  icon,
  iconSrc, // ✅ New prop
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  dontShowAgainText = "Don’t show again",
  variant = "normal", // 'normal' | 'warning'
  showAgain = null,
  onToggleShowAgain = () => {},
  onCancel,
  onConfirm,
}) => {
  const isWarning = variant === "warning";

  const confirmBtnClass = cn(
    "h-11 px-4 py-2.5 rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] flex justify-center items-center gap-2 text-base font-semibold leading-normal",
    isWarning ? "bg-red-600 text-white outline-red-600" : "bg-blue-500 text-white outline-blue-500"
  );
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="relative p-6 flex gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center outline outline-8 outline-offset-[-4px]",
                  icon === "delete"
                    ? "bg-red-100 outline-red-50"
                    : "bg-orange-100 outline-orange-50"
                )}
              >
                {iconSrc && <img src={iconSrc} alt="Modal Icon" />}
              </div>
              <div className="flex-1">
                <h2 className="text-color1 text-lg font-semibold font-poppins leading-7">
                  {title}
                </h2>
                <p className="text-color1 text-sm font-normal font-poppins leading-tight mt-2">
                  {description}
                </p>
              </div>
              <button
                onClick={onCancel}
                className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Footer */}
            <div className="pt-4 px-6 pb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                {showAgain !== null && (
                  <label className="flex items-center gap-2 text-color1 text-sm font-medium font-inter">
                    <input
                      type="checkbox"
                      checked={showAgain}
                      onChange={onToggleShowAgain}
                      className="w-4 h-4 border border-gray-300 rounded"
                    />
                    {dontShowAgainText}
                  </label>
                )}
                <div className="ml-auto flex gap-3">
                  <button
                    onClick={onCancel}
                    className="px-4 py-2.5 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] border border-color1 text-color1 text-base font-semibold font-inter"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    className="h-11 px-4 py-2.5 rounded-lg shadow-sm flex justify-center items-center gap-2 text-base font-semibold leading-normal bg-gradient-custom text-white"
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
