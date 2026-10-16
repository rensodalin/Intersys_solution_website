import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { initializeAuth, finishAuthCheck } from "@/store/authSlice";
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
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const userRef = useRef(currentUser);
  userRef.current = currentUser;

  useEffect(() => {
    // Check if redirected back with auth_data from Google OAuth
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const authDataParam = params.get("auth_data");
        if (authDataParam) {
          const userObj = JSON.parse(decodeURIComponent(authDataParam));
          if (userObj && (userObj.id || userObj._id)) {
            dispatch(initializeAuth(userObj));
            params.delete("auth_data");
            params.delete("auth_success");
            const newSearch = params.toString() ? `?${params.toString()}` : "";
            window.history.replaceState({}, document.title, window.location.pathname + newSearch);
          }
        }
      } catch (e) {
        console.error("Failed to parse auth_data parameter:", e);
      }
    }

    const baseUrl = environment;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch(`${baseUrl}/auth/user`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok && res.status === 401) {
          dispatch(initializeAuth(null));
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.success && data.user) {
          dispatch(initializeAuth(data.user));
        } else if (data.success === false) {
          dispatch(initializeAuth(null));
        } else {
          dispatch(finishAuthCheck());
        }
      })
      .catch((err) => {
        console.warn("Auth session bootstrap warning:", err);
        if (userRef.current) {
          dispatch(finishAuthCheck());
        } else {
          dispatch(initializeAuth(null));
        }
      })
      .finally(() => clearTimeout(timeout));

    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (isAuthChecking) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0A0F1A] flex flex-col items-center justify-center gap-8">
        <img
          src={logo}
          alt="Company logo"
          className="w-40 h-auto"
          style={{
            transformOrigin: "center",
            animation: "logoGrow 0.8s ease-out forwards",
          }}
        />
        <div className="w-48 h-1 bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#C3110C] rounded-full"
            style={{
              animation: "loadingLine 1.2s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes logoGrow {
            from { transform: scale(0.3); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes loadingLine {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
