import React from "react";
import { useHoverGradient } from "../hooks/use-hover-gradient";

interface HoverCardProps {
  title: string;
  text: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ title, text }) => {
  const {
    cardRef,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    gradientStyle,
    mousePosition,
  } = useHoverGradient({
    defaultGradient:
      "radial-gradient(#0cc997 0%, #61d180 15%, transparent 30%)",
    hoverGradient: "radial-gradient(#0cc997 0%, #61d180 15%, transparent 30%)",
  });

  return (
    <div className="relative h-full">
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x} ${mousePosition.y}, #0cc997 0%, #61d180 15%, transparent 25%)`,
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={gradientStyle}
        className="relative sm:p-7 md:p-10 lg:pt-[12vw] lg:px-[24px] lg:pb-[24px] h-full cursor-default flex flex-col w-full gap-y-4 rounded-2xl bg-black-100-cart border-2 border-transparent"
      >
        <span className="text-left text-white">{title}</span>
        <span className="h-[1px] w-full bg-darkGray"></span>
        <span className="sm:text-xs text-white md:text-base text-left text-darkTextMuted">
          {text}
        </span>
      </div>
    </div>
  );
};
