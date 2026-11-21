"use client"

import { ArrowUp } from "lucide-react";

export default function ScrollTop() {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
    
  )
}
