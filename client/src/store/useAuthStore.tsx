/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/types";
import { login } from "../services/auth.services";
import { toastError, toastSuccess } from "../utils/toast";

interface AuthState {
  currUser: User | null;
  isAuthenticated: boolean;

  login: (
    username: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  isLoggingIn: boolean;

  signup: (
    username: string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => void;
  isSigningUp: boolean;

  logOut: () => void;
  isLoggingOut: boolean;

  isauthLoading: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currUser: null,
      isAuthenticated: false,
      login: async (username: string, password: string, navigate) => {
        if (username === "" || password === "") {
          toastError("Please fill in all fields");
          return;
        }
        set({ isLoggingIn: true });

        try {
          const data = await login(username, password);
          set({ currUser: data.user, isAuthenticated: true });
          toastSuccess(data.message);
          navigate("/");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          toastError(err.response?.data?.message || "Login failed");
          set({ isAuthenticated: false });
          throw err;
        } finally {
          set({ isLoggingIn: false });
        }
      },
      isLoggingIn: false,
      signup: (_username: string, _email: string, _password: string) => {},
      isSigningUp: false,
      logOut: () => {},
      isLoggingOut: false,
      isauthLoading: false,
    }),
    {
      name: "auth-storage",
    }
  )
);
