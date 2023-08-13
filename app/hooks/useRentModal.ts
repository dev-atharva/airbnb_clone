import { create } from "zustand";

interface RentmodalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<RentmodalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
