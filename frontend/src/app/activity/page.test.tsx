import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ActivityPage from "./page";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/activity",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("next/link", () => {
  type LinkProps = React.PropsWithChildren<{
    href: string | { pathname?: string };
  }> &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

  return {
    default: ({ href, children, ...props }: LinkProps) => (
      <a href={typeof href === "string" ? href : "#"} {...props}>
        {children}
      </a>
    ),
  };
});

describe("/activity auth boundary", () => {
  it("renders the signed-out state in local auth mode", () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = "local";

    render(
      <AuthProvider>
        <QueryProvider>
          <ActivityPage />
        </QueryProvider>
      </AuthProvider>,
    );

    expect(screen.getByText(/sign in to view the feed/i)).toBeInTheDocument();
  });
});
