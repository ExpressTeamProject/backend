import { create } from "zustand";

interface LoginStore {
  token: string;
  setToken: (token: string) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
}));

export default useLoginStore;
