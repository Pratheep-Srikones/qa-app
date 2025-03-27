import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/types";
import { login, logout, signup } from "../services/auth.services";
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

  logOut: (navigate: (path: string) => void) => void;
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
          localStorage.setItem("user_id", data.user.user_id);
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
      signup: async (
        username: string,
        email: string,
        password: string,
        navigate: (path: string) => void
      ) => {
        if (username === "" || email === "" || password === "") {
          toastError("Please fill in all fields");
          return;
        }
        set({ isSigningUp: true });

        try {
          const data = await signup(username, email, password);
          toastSuccess(data.message);
          navigate("/login");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toastError(error.response?.data?.message || "Login failed");
        } finally {
          set({ isSigningUp: false });
        }
      },
      isSigningUp: false,
      logOut: (navigate: (path: string) => void) => {
        set({ isLoggingOut: true });
        logout();
        localStorage.clear();
        set({ currUser: null, isAuthenticated: false });
        navigate("/login");
        set({ isLoggingOut: false });
      },
      isLoggingOut: false,
      isauthLoading: false,
    }),
    {
      name: "auth-storage",
    }
  )
);
