'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { 
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  PlusSmallIcon } from '@heroicons/react/24/solid';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className=" border-b border-slate-200 bg-white fixed w-full z-10 sm:h-16 text-slate-700"
    >
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-20 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-baseline justify-center sm:items-stretch sm:justify-between">
                <div className="flex items-center sm:hidden px-2">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="bg-white relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link
                  href="/"
                  className="sm:flex hidden flex-shrink-0 items-center text-green-900 font-bold text-md px-4"
                >
                  Klontongpedia
                </Link>
                <div className={cn("grow sm:max-w-4xl w-20", pathname !== "/" ? "hidden" : "flex")}>
                  <div className="sm:max-w-xl lg:max-w-4xl mx-auto flex w-full gap-2">
                    <div className="relative rounded-md shadow-sm grow sm:w-80">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                      </div>
                     <SearchComponent />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2 w-full items-center">
                    <Link
                      href="/product/add"
                      className="flex gap-1 rounded-md bg-green-700 px-3 py-2 items-center text-sm font-medium text-emerald-50 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      <PlusSmallIcon className="h-5 w-5 text-emerald-50" />
                      Add Product
                    </Link>
                    <button
                      onClick={() => {
                        if (session && session.user) {
                          signOut();
                        } else {
                          signIn();
                        }
                      }}
                      className={cn(
                        'rounded-md px-3 py-2 text-sm font-normal text-slate-600 border border-slate-200',
                      )}
                      // aria-current={item.current ? 'page' : undefined}
                    >
                      {session && session.user ? 'Sign Out' : 'Sign In'}
                    </button>
                    {(!session || !session.user) && (
                      <Link
                        href="/register"
                        className={cn(
                          'rounded-md px-3 py-2 text-sm font-normal text-slate-600 border border-slate-200',
                        )}
                        // aria-current={item.current ? 'page' : undefined}
                      >
                        Register
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href="/"
                className={cn(
                  // item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
                //   aria-current={item.current ? 'page' : undefined}
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/product/add"
                className={cn(
                  // item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
                //   aria-current={item.current ? 'page' : undefined}
              >
                Add Product
              </Disclosure.Button>
              <Disclosure.Button
                as="button"
                onClick={() => {
                  if (session) {
                    signOut();
                  } else {
                    signIn();
                  }
                }}
                className={cn(
                  // item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
                //   aria-current={item.current ? 'page' : undefined}
              >
                {session && session.user ? 'Sign Out' : 'Sign In'}
              </Disclosure.Button>
              {(!session || !session.user) && (
                <Disclosure.Button
                  as="a"
                  href="/register"
                  className={cn(
                    // item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  //   aria-current={item.current ? 'page' : undefined}
                >
                  {session && session.user ? 'Sign Out' : 'Sign In'}
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}


function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);  // 300ms debounce delay
  const router = useRouter();

  useEffect(() => {
    console.log('debouncedSearchQuery', debouncedSearchQuery);
    if (debouncedSearchQuery !== null && router) {
      router.push(`?searchQuery=${debouncedSearchQuery}`);
    }
  }, [debouncedSearchQuery, router]);

  return (
    <input
      type="text"  // Change type to "text" for a search input
      name="search"
      id="search"
      autoComplete="off"
      className="block w-full rounded-md border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
      placeholder="Search Product"
      value={searchQuery || ''}
      onChange={e => setSearchQuery(e.target.value || "")}
    />
  );
}
