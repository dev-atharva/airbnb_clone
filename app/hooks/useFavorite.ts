import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentuser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentuser }: IUseFavorite) => {
  const router = useRouter();
  const loginmodal = useLoginModal();
  const hasfavorited = useMemo(() => {
    const list = currentuser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentuser, listingId]);

  const togglefavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentuser) {
        return loginmodal.onOpen();
      }
      try {
        let request;
        if (hasfavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentuser, hasfavorited, listingId, loginmodal, router]
  );
  return {
    hasfavorited,
    togglefavorite,
  };
};

export default useFavorite;
