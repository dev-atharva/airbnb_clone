"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const Router = useRouter();
  return (
    <Image
      onClick={() => Router.push("/")}
      src="/images/logo.png"
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
    ></Image>
  );
};

export default Logo;
