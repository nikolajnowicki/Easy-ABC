import Image from "next/image";

export const Header = () => {
  return (
    <div className="relative w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] 2xl:h-[520px]">
      <Image
        src="/easy-abc.png"
        alt="Easy ABC Header Image"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      <div className="absolute inset-0 flex justify-center items-center  pr-4 pl-6  pb-7 sm:pl-16 sm:pb-6 md:pl-12 md:pb-12 lg:pl-14 lg:pb-24 xl:pb-32">
        <div
          className="text-slate-800 font-bold"
          style={{ fontFamily: "'Agent-Red'" }}
        >
          <p
            className=" text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl sm:pb-2  md:pb-2 lg:pt-14 lg:pr-0 lg:pb-4 xl:pr-10 xl:pb-8"
            style={{ WebkitTextStroke: "0px" }}
          >
            EASY
          </p>

          <p className="text-2xl pl-16 sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl sm:pl-20 md:pl-20 lg:pl-24 xl:pl-32">
            ABC
          </p>
        </div>
      </div>
    </div>
  );
};
