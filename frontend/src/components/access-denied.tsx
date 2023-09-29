import { signIn } from 'next-auth/react'

export default function AccessDenied () {
  return (
    <div className='sm:pt-16 pt-20'>
      <div className="mx-auto max-w-xl py-8 sm:py-4 lg:max-w-4xl">
      <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>
          Please sign in to add products.
        </p>
        <button
           className={'mt-4 rounded-md px-3 py-2 text-sm font-normal text-slate-600 border border-slate-200'}
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}