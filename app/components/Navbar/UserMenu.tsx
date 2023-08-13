"use client";
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface Usermenuprops {
  currentuser?: SafeUser | null;
}

const UserMenu: React.FC<Usermenuprops> = ({ currentuser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const rentmodal = useRentModal();
  const loginmodal = useLoginModal();
  const [isopen, setisopen] = useState(false);
  const toggleOpen = useCallback(() => {
    setisopen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
    if (!currentuser) {
      return loginmodal.onOpen();
    }

    rentmodal.onOpen();
  }, [currentuser, loginmodal, rentmodal]);
  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block font-semibold py-3 px-4 
        rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300
         flex flex-row items-center gap-3 rounded-full hover:shadow-md transition   "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentuser?.image} />
          </div>
        </div>
      </div>
      {isopen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {currentuser ? (
                <>
                  <MenuItem
                    onClick={() => router.push("/trips")}
                    label="My trips"
                  />
                  <MenuItem
                    onClick={() => router.push("/favorites")}
                    label="My favorites"
                  />
                  <MenuItem
                    onClick={() => router.push("/reservations")}
                    label="My reservations"
                  />
                  <MenuItem
                    onClick={() => router.push("/properties")}
                    label="My properties"
                  />
                  <MenuItem onClick={rentmodal.onOpen} label="Airbnb my home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginmodal.onOpen} label="Login" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
