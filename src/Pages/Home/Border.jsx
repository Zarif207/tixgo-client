import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Border = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="relative my-20 flex justify-center">
      {/* Glow */}
      <div
        className="
          absolute w-3/4 h-[2px]
          bg-gradient-to-r
          from-primary/0 via-primary to-primary/0
          blur-sm
        "
      />

      
      <div
        ref={lineRef}
        className="
          w-3/4 h-[2px]
          bg-gradient-to-r
          from-transparent
          via-primary
          to-transparent
          origin-left
        "
      />

     
      <div
        className="
          absolute top-1/2 -translate-y-1/2
          w-3 h-3 rounded-full
          bg-primary
          shadow-lg shadow-primary/50
        "
      />
    </div>
  );
};

export default Border;