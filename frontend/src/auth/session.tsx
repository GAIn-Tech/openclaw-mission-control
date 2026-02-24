"use client";

import type { ReactNode } from "react";

type AuthChildrenProps = {
  children?: ReactNode;
  [key: string]: unknown;
};

type SessionUser = {
  id: string;
  fullName?: string | null;
  firstName?: string | null;
  username?: string | null;
  imageUrl?: string | null;
  primaryEmailAddress?: {
    emailAddress?: string | null;
  } | null;
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
  const user: SessionUser = {
    id: "local-user",
    fullName: null,
    firstName: null,
    username: null,
    imageUrl: null,
    primaryEmailAddress: null,
  };

  return { isLoaded: true, user };
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
