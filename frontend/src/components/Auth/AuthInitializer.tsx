import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { initializeAuth } from "@/store/authSlice";
import environment from "@/enviroment/enviroment";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useDispatch();
  const isAuthChecking = useSelector(
    (state: RootState) => state.auth.isAuthChecking
  );

  useEffect(() => {
    const baseUrl = environment;

    fetch(`${baseUrl}/auth/user`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          dispatch(initializeAuth(data.user));
        } else {
          dispatch(initializeAuth(null));
        }
      })
      .catch((err) => {
        console.error("Auth session bootstrap failed:", err);
        dispatch(initializeAuth(null));
      });
  }, [dispatch]);

  if (isAuthChecking) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0A0F1A] flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border border-red-600/30 animate-ping duration-1000" />
          <div className="w-16 h-16 rounded-full border-2 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin duration-700" />
        </div>
        <p className="text-neutral-300 text-sm ">Loading....</p>
      </div>
    );
  }

  return <>{children}</>;
}
