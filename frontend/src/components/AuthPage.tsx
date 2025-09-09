import Image from "next/image";
import { ReactNode } from "react";

interface AuthPageProps {
  children: ReactNode;
}

export default function AuthPage({ children }: AuthPageProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[40%_60%] my-8">
      <div className="relative hidden lg:block">
        <div className="bg-gradient-to-b from-[#E54C91] via-[#F48B7B] to-[#F7AD50] absolute inset-0 h-full w-full"></div>
        <div className="relative text-white p-4">
          <Image
            src={"/authlineimage.svg"}
            alt="auth-line"
            width={300}
            height={300}
            className="absolute top-20 left-24"
          />
          <Image
            src={"/authimage.svg"}
            alt="auth-man"
            width={1000}
            height={1000}
            className="max-w-none w-[140%] absolute -top-8 left-10 "
          />
        </div>
      </div>
      <div className="flex flex-col gap-4  ">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-end  ">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
