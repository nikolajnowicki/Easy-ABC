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
      <div className="absolute inset-0 flex justify-center items-center pb-32 pr-12 ">
        <div>
          <p
            className="text-slate-800 text-5xl font-bold pr-10 pb-6"
            style={{ fontFamily: "'Agent-Red'", WebkitTextStroke: "0px" }}
          >
            EASY
          </p>

          <p
            className="text-slate-800 text-5xl font-bold pl-24"
            style={{ fontFamily: "'Agent-Red'" }}
          >
            ABC
          </p>
        </div>
      </div>
    </div>
  );
};
