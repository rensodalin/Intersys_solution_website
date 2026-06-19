import { toast } from "sonner";
import { loginSuccess, logoutSuccess } from "@/store/authSlice";
import type { Dispatch } from "@reduxjs/toolkit";
import type { DetailsForm } from "./types";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;

export async function fetchProfile(dispatch: Dispatch) {
  const response = await fetch(`${baseUrl}/auth/user`, { credentials: "include" });
  const data = await response.json();
  if (data.success && data.user) {
    dispatch(loginSuccess(data.user));
    return data.user;
  }
  dispatch(logoutSuccess());
  return null;
}

export async function fetchQuotes() {
  const response = await fetch(`${baseUrl}/api/quotes`, { credentials: "include" });
  const data = await response.json();
  if (data.success) return data.data || [];
  return [];
}

export async function logoutUser(dispatch: Dispatch, navigate: (opts: { to: string }) => void) {
  try {
    await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // ignore server errors
  }
  dispatch(logoutSuccess());
  toast.success("Logged out successfully");
  navigate({ to: "/" });
}

export async function downloadFile(url: string, title: string) {
  if (!url || url === "#") {
    toast.error("Document file is currently unavailable for download.");
    return;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch file");
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch {
    console.error("Programmatic download failed, falling back to new tab");
    window.open(url, "_blank");
  }
}

export async function saveProfile(dispatch: Dispatch, form: DetailsForm) {
  if (!form.firstName.trim()) { toast.error("First name is required"); return false; }
  if (!form.lastName.trim()) { toast.error("Last name is required"); return false; }

  if (form.password) {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    const pw = form.password;
    const isStrong = pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw);
    if (!isStrong) {
      toast.error("Password must be at least 8 characters and contain uppercase, lowercase, number, and a special character.");
      return false;
    }
  }

  try {
    const response = await fetch(`${baseUrl}/auth/user/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || undefined,
        country: form.country || undefined,
        role: form.role || undefined,
        newsletter: form.newsletter,
        receiveUpdates: form.receiveUpdates,
        currentPassword: form.password ? form.currentPassword : undefined,
        password: form.password || undefined,
      }),
      credentials: "include",
    });
    const data = await response.json();
    if (data.success && data.user) {
      dispatch(loginSuccess(data.user));
      return true;
    }
    toast.error(data.message || "Failed to update profile");
    return false;
  } catch {
    toast.error("An error occurred. Please try again.");
    return false;
  }
}
