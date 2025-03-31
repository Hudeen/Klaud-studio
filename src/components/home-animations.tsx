import { useEffect, useRef, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeScene from "@components/three-scene";

gsap.registerPlugin(ScrollTrigger);

export const HomeAnimations: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".text",
      { opacity: 1, scale: 0.5 },
      {
        opacity: 0,
        scale: 3.5,
        scrollTrigger: {
          trigger: ".test",
          pin: true,
          scrub: 1,
          start: "top top",
          end: "bottom top",
        },
      }
    );
    const tl = gsap.timeline();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".text2",
      { opacity: 0, scale: 0.2 },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: ".test2",
          pin: true,
          scrub: 1,
          start: "top+=20 top",
          end: "bottom-=200 center",
        },
      }
    );
    const tl = gsap.timeline();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden">
      <div className="relative">
        <div className="test h-screen w-full relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="text">
              <ThreeScene />
            </div>
          </div>
        </div>

        <div className="test2 h-screen w-full bottom-52 absolute">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <h1 className="text2 text-white text-6xl text-center">
              Вау
              <span className="text-[#0cc997]">,</span> <br />
              красивый текст!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
