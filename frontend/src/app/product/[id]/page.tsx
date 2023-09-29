"use client";

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductType } from '@/lib/types'
import { NavBar } from '@/components/navbar';
import AuthSessionProvider from '@/components/auth-session-provider';

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`http://localhost:3000/shop-item/get-item/${params.id}`);
      const data = await res.json();
      console.log('data', data);
      setProduct(data);
    }

    getProduct();
  }, [params.id]);

  return (
    <AuthSessionProvider>
    <div className="bg-white">
      <NavBar />
      <div className="pb-16 sm:pb-24 sm:pt-16 pt-20">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-medium text-gray-900">{product?.name}</h1>
                  <h2 className="text-sm text-gray-500">{product?.categoryName}</h2>
                </div>
                <p className="text-xl font-medium text-gray-900"> Rp.
                    {product?.harga
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img
                    src={product?.image}
                    alt={product?.description}
                    className={cn(
                      'lg:col-span-2 lg:row-span-2 rounded-md border border-slate-300 drop-shadow-md'
                    )}
                  />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">

              {/* Product details */}
              <div className="pt-2">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                <p className='text-lg text-slate-500'>{product?.description}</p>
              </div>
              <div className="pt-10">
                <h2 className="text-sm font-medium text-gray-900">SKU</h2>

                <p className='text-lg text-slate-500'>{product?.sku}</p>
              </div>

              <div className="pt-10">
                <h2 className="text-sm font-medium text-gray-900">Dimensions</h2>

               <div className="flex gap-6 pt-2">
                <div className="flex flex-col">
                  <p className='text-xs text-slate-500'>Weight</p>
                  <p className='text-lg'>{product?.weight}</p>
                </div>
                <div className="flex flex-col">
                  <p className='text-xs text-slate-500'>Width</p>
                  <p className='text-lg'>{product?.width}</p>
                </div>
                <div className="flex flex-col">
                  <p className='text-xs text-slate-500'>length</p>
                  <p className='text-lg'>{product?.length}</p>
                </div>
                <div className="flex flex-col">
                  <p className='text-xs text-slate-500'>height</p>
                  <p className='text-lg'>{product?.height}</p>
                </div>
               </div>
              </div>



              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthSessionProvider>
  )
}
