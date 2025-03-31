import { useEffect, useRef, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeScene from "@components/three-scene";
import { HoverCard } from "@components/card-hover";

gsap.registerPlugin(ScrollTrigger);

export const Home: FC = () => {
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
          end: "bottom+=400 top",
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
    <div ref={containerRef} className="relative w-full h-auto ">
      <div className="relative overflow-hidden">
        <div className="flex h-screen justify-center">
          <div className="test w-full relative">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="text">
                <ThreeScene />
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-screen justify-center">
          <div className="test2 w-full relative">
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

      <div className="w-full px-4 mt-16 max-w-[100rem] mx-auto">
        <div className="text-white">Что мы делаем?</div>
        <div className="grid gap-6 sm:grid-cols-2">
          <HoverCard
            title="UI/UX & Web Design"
            text="Seamless, modern interfaces for websites, apps, and platforms."
          />
          <HoverCard
            title="Clarity"
            text="Users often don't understand the layout of the coworking space, what's included in the price, and the differences between spaces."
          />
          <HoverCard
            title="Crypto & Web3 Projects"
            text="NFT design, metaverse assets, and blockchain-focused visuals."
          />
          <HoverCard
            title="Online Booking"
            text="Users want to have the ability to book online without the need for a mandatory phone call."
          />
        </div>
      </div>
    </div>
  );
};
