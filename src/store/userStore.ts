import { User } from '@/types/auth';
import { create } from 'zustand';

type UserStore = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    email: '',
    name: ''
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {email:'',name:''}}),
}));
