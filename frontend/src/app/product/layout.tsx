"use client";

import AuthSessionProvider from '@/components/auth-session-provider';
import { NavBar } from '@/components/navbar';
import store from '@/lib/store';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'bg-white'}>
        <Provider store={store}>
        <AuthSessionProvider>
          <NavBar />
          {children}
        </AuthSessionProvider>
        </Provider>
      </body>
    </html>
  );
}
