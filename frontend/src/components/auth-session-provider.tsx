"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";

export interface SessionProvider {
  children: React.ReactNode;
}

export default function AuthSessionProvider({ children }: SessionProvider) {
  return <NextSessionProvider
  >{children}</NextSessionProvider>;
}