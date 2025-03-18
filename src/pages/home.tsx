import { type FC } from "react";
import backcells from "@images/svg/backcells.svg?url";

export const Home: FC = () => {
  return (
    <div className="relative w-full h-auto">
      <div
        className="h-screen w-full"
        style={{
          backgroundImage: `url(${backcells})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-white text-4xl">In code we trust</div>
        </div>
        <div
          className="absolute top-0 left-0 right-0 h-screen pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 1) 100%)",
          }}
        ></div>
      </div>

      <div className="w-full h-[50vh] items-stretch grid grid-cols-2 mt-36">
        <div className="h-full border-y border-r border-[#424245]"></div>
        <div className="h-full border-y border-[#424245]"></div>
      </div>
    </div>
  );
};
