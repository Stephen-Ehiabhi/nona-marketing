"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BetaSignup from "./BetaSignup";

const ModalContext = createContext<{
  open: () => void;
  close: () => void;
  isOpen: boolean;
}>({ open: () => {}, close: () => {}, isOpen: false });

export function useSignupModal() {
  return useContext(ModalContext);
}

export function SignupModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={close}
            >
              <div
                className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-px">
                  <div className="w-full h-full rounded-[27px] bg-[#0a0a0a]" />
                </div>

                <div className="relative p-7 md:p-9">
                  {/* Close */}
                  <button
                    onClick={close}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-all cursor-pointer z-10"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>

                  <BetaSignup theme="dark" onComplete={close} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
