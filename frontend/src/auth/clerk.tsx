"use client";

import type { ReactNode } from "react";

import { isLikelyValidClerkPublishableKey } from "@/auth/clerkKey";
import { getLocalAuthToken, isLocalAuthMode } from "@/auth/localAuth";

function hasLocalAuthToken(): boolean {
  return Boolean(getLocalAuthToken());
}

export function isClerkEnabled(): boolean {
  if (isLocalAuthMode()) return false;
  return isLikelyValidClerkPublishableKey(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
}

type AuthChildrenProps = {
  children?: ReactNode;
};

export function SignedIn(props: AuthChildrenProps) {
  if (isLocalAuthMode()) {
    return hasLocalAuthToken() ? <>{props.children}</> : null;
  }
  return null;
}

export function SignedOut(props: AuthChildrenProps) {
  if (isLocalAuthMode()) {
    return hasLocalAuthToken() ? null : <>{props.children}</>;
  }
  return <>{props.children}</>;
}

export function SignInButton(props: AuthChildrenProps) {
  if (isLocalAuthMode()) return null;
  return <>{props.children ?? null}</>;
}

export function SignOutButton(props: AuthChildrenProps) {
  if (isLocalAuthMode()) return null;
  return <>{props.children ?? null}</>;
}

export function useUser() {
  if (isLocalAuthMode()) {
    return {
      isLoaded: true,
      isSignedIn: hasLocalAuthToken(),
      user: null,
    } as const;
  }

  return { isLoaded: true, isSignedIn: false, user: null } as const;
}

export function useAuth() {
  if (isLocalAuthMode()) {
    const token = getLocalAuthToken();
    return {
      isLoaded: true,
      isSignedIn: Boolean(token),
      userId: token ? "local-user" : null,
      sessionId: token ? "local-session" : null,
      getToken: async () => token,
    } as const;
  }

  return {
    isLoaded: true,
    isSignedIn: false,
    userId: null,
    sessionId: null,
    getToken: async () => null,
  } as const;
}

type ClerkProviderProps = {
  children: ReactNode;
  publishableKey?: string;
  afterSignOutUrl?: string;
};

export function ClerkProvider({ children }: ClerkProviderProps) {
  return <>{children}</>;
}
