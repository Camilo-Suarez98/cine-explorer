import { signIn, signOut } from "next-auth/react";

export async function login(provider: string) {
  try {
    await signIn(provider);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
