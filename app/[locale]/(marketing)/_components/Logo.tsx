import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.png"
        height={40}
        width={40}
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/logo.png"
        height={40}
        width={40}
        alt="logo"
        className="dark:block hidden"
      />
          <p className={cn("font-semibold", font.className)}>NoteWorth</p>
    </div>
  );
};

export default Logo;
