'use client';

import AuthSessionProvider from '@/components/auth-session-provider';
import { NavBar } from '@/components/navbar';
import { ShoppingList } from '@/components/shopping-list';
import store from '@/lib/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <AuthSessionProvider>
        <main className="h-full bg-white">
          <NavBar />
          <ShoppingList />
        </main>
      </AuthSessionProvider>
    </Provider>
  );
}
