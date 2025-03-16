
import AuthPage1 from "@/assets/AuthPage1.png";
import AuthPage2 from "@/assets/AuthPage2.png";
import AuthPage3 from "@/assets/AuthPage3.png";
import AuthPage4 from "@/assets/AuthPage4.png";

const AuthBackground = () => {
  return (
    <div className="hidden lg:block lg:grow">
      <div className="flex h-full flex-col items-center justify-between p-6">
        <div className="relative size-full w-full overflow-hidden rounded-3xl bg-neutral-100">
          <div className="pointer-events-none absolute inset-0 animate-gradient bg-gradient-to-br from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb] opacity-90 bg-[length:400%_400%]"></div>
          <div className="absolute inset-0 grid grid-cols-2 gap-1 p-6 rotate-[-2deg] grid-template-columns-[1fr,1.2fr] grid-template-rows-[auto,auto] items-center justify-items-center">
            <img
              src={AuthPage1}
              alt="Auth1"
              className="rounded-2xl border-4 border-pink-300 shadow-xl hover:scale-105 transition-transform duration-500 w-[250px] h-[250px] rotate-[-4deg]"
            />
            <img
              src={AuthPage2}
              alt="Auth2"
              className="rounded-2xl border-4 border-orange-300 shadow-xl hover:scale-105 transition-transform duration-500 w-[220px] h-[220px] translate-y-[30px] rotate-[3deg]"
            />
            <img
              src={AuthPage3}
              alt="Auth3"
              className="rounded-2xl border-4 border-yellow-300 shadow-xl hover:scale-105 transition-transform duration-500 w-[180px] h-[180px] -translate-x-[20px] rotate-[-6deg]"
            />
            <img
              src={AuthPage4}
              alt="Auth4"
              className="rounded-2xl border-4 border-red-300 shadow-xl hover:scale-105 transition-transform duration-500 w-[240px] h-[240px] rotate-[5deg]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;