"use client";

import AuthSessionProvider from '@/components/auth-session-provider';
import { NavBar } from '@/components/navbar'
import { ShoppingList } from '@/components/shopping-list';
import Image from 'next/image'

export default function Home() {
  return (
    <AuthSessionProvider>
      <main className="">
          <NavBar />
          <ShoppingList />
      </main>
    </AuthSessionProvider>
  )
}
