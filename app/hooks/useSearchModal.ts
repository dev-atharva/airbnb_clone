import { create } from "zustand";

interface searchmodalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usesearchModal = create<searchmodalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usesearchModal;
