"use client";

/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BetaSignup from "./BetaSignup";
import { Icon, EASE } from "./site/ui";
import { photo } from "@/lib/photos";

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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 z-[100] bg-ink/45 backdrop-blur-[6px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-0 z-[101] flex items-end justify-center md:items-center md:p-6"
              onClick={close}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Join the Kusin beta"
                onClick={(e) => e.stopPropagation()}
                className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-paper shadow-[0_40px_120px_rgba(15,14,13,0.35)] md:max-w-[920px] md:flex-row md:rounded-[32px] md:p-2.5"
              >
                {/* Photo panel */}
                <div className="relative h-36 shrink-0 overflow-hidden md:h-auto md:w-[44%] md:rounded-[24px]">
                  <img
                    src={photo("handsChopping", 1000)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,14,13,0.05)_40%,rgba(15,14,13,0.55)_100%)]" />
                  <div className="absolute inset-x-4 bottom-4 hidden md:block">
                    <div className="glass rounded-[20px] p-4 text-white">
                      <p className="display text-[18px] font-semibold leading-snug">
                        Founding families shape what Kusin cooks next.
                      </p>
                      <p className="mt-1.5 text-[13px] text-white/75">
                        Free during the beta · iPhone and Android
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={close}
                  aria-label="Close"
                  className="glass absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white md:border-line md:bg-surface md:text-ink md:backdrop-blur-none"
                >
                  <Icon name="x" size={18} />
                </button>

                <div className="overflow-y-auto px-6 pb-8 pt-6 md:flex-1 md:px-10 md:py-10">
                  <BetaSignup onComplete={close} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
