"use client";

import { useSearchParams } from "next/navigation";

import { isLocalAuthMode } from "@/auth/localAuth";
import { resolveSignInRedirectUrl } from "@/auth/redirects";
import { LocalAuthLogin } from "@/components/organisms/LocalAuthLogin";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const forceRedirectUrl = resolveSignInRedirectUrl(
    searchParams.get("redirect_url"),
  );

  if (isLocalAuthMode()) {
    return (
      <LocalAuthLogin
        onAuthenticated={() => {
          window.location.assign(forceRedirectUrl);
        }}
      />
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
        External sign-in is disabled in this local-auth deployment. Set
        NEXT_PUBLIC_AUTH_MODE=local to continue.
      </div>
    </main>
  );
}
