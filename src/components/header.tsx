import { useState, useEffect, type FC } from "react";
import backGif from "@images/back.gif";
import Klaud from "@images/svg/klaud.svg?react";

export const Header: FC = () => {
  const [showBlocks, setShowBlocks] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBlocks(currentScrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div
        className={`transition-transform duration-300 ${
          showBlocks ? "translate-y-0" : "-translate-y-full"
        } w-full flex justify-center items-center h-14`}
      >
        <div className="relative z-50 h-10 w-40 bg-white/10 rounded-full border border-white/10 overflow-hidden">
          <div className="h-full w-full flex justify-center items-center">
            <Klaud className="w-24" />
          </div>
          <img
            src={backGif}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-[1px] opacity-5"
          />
        </div>
      </div>
      <div
        className={`transition-transform duration-300 ${
          showBlocks ? "translate-y-0" : "-translate-y-full"
        } w-full flex justify-center items-center h-14`}
      >
        <div className="flex justify-center items-center text-white text-lg space-x-2 backdrop-blur-lg h-full px-2 rounded">
          <a
            href="/"
            className="cursor-pointer px-3 py-1 hover:bg-white/10 text-gradient rounded"
          >
            Проекты
          </a>
          <a
            href="/"
            className="cursor-pointer px-3 py-1 hover:bg-white/10 rounded"
          >
            Контакты
          </a>
          <button className="w-36 p-1 bg-custom-gradient rounded flex justify-center items-center space-x-2 hover:cursor-pointer transition-shadow duration-200 hover:shadow-[0_0px_30px_rgba(255,_255,_255,_0.5)]">
            <div className="w-2 h-2 bg-[#0cc997] border border-[#61d180] rounded-full"></div>
            <div className="text-[#000000b3] text-base font-normal">
              Заказать сайт
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
