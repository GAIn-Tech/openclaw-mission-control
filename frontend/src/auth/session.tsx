"use client";

import type { ReactNode } from "react";

type AuthChildrenProps = {
  children?: ReactNode;
  [key: string]: unknown;
};

export function isExternalAuthEnabled(): boolean {
  return false;
}

export function SignedIn(props: AuthChildrenProps) {
  return <>{props.children ?? null}</>;
}

export function SignedOut(props: AuthChildrenProps) {
  return null;
}

export function SignInButton(props: AuthChildrenProps) {
  return <>{props.children ?? null}</>;
}

export function SignOutButton(props: AuthChildrenProps) {
  return <>{props.children ?? null}</>;
}

export function useUser() {
  return { isLoaded: true, user: null } as const;
}

export function useAuth() {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: "local-user",
    sessionId: "local-session",
    getToken: async () => null,
  } as const;
}
