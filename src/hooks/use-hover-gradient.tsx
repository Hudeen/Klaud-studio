import { useCallback, useRef, useState } from "react";

interface HoverGradientOptions {
  defaultGradient: string;
  hoverGradient: string;
}

export const useHoverGradient = ({
  defaultGradient,
  hoverGradient,
}: HoverGradientOptions) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x: `${x}%`, y: `${y}%` });
    }
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const gradientStyle = {
    background: isHovered
      ? `linear-gradient(#0A0A0A, #0A0A0A) padding-box, ${hoverGradient} border-box`
      : `linear-gradient(#0A0A0A, #0A0A0A) padding-box, ${defaultGradient} border-box`,
  };

  return {
    cardRef,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    gradientStyle,
    mousePosition,
  };
};
