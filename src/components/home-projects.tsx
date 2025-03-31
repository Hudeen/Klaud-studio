import { type FC } from "react";

export const HomeProjects: FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-white text-4xl">Последние проекты</div>
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="w-full h-[50vh] bg-red-500 items-stretch grid grid-cols-2 gap-2 mt-14">
          <div className="bg-amber-50 rounded-2xl w-full h-full"></div>
          <div className="bg-amber-50 rounded-2xl w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};
