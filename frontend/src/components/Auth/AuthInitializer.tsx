import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { initializeAuth } from "@/store/authSlice";
import environment from "@/enviroment/enviroment";
import logo from "@/assets/logo.avif";

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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    fetch(`${baseUrl}/auth/user`, {
      credentials: "include",
      signal: controller.signal,
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
      })
      .finally(() => clearTimeout(timeout));

    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (isAuthChecking) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0A0F1A] flex items-center justify-center">
        <img
          src={logo}
          alt="Company logo"
          className="w-40 h-auto"
          style={{
            transformOrigin: "center",
            animation: "logoGrow 0.8s ease-out forwards",
          }}
        />
        <style>{`
          @keyframes logoGrow {
            from { transform: scale(0.3); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
