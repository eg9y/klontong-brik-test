import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePaginatedData } from './use-paginated-data';
import { Pagination } from './pagination';
import Link from 'next/link';

const PRODUCTS_PER_PAGE = 24;

export function ShoppingList() {
  const router = useRouter();
  const { products, handleNext, handlePrev, productCount, handlePage } =
    usePaginatedData(PRODUCTS_PER_PAGE, router);
  const currentPage =
    parseInt(useSearchParams().get('skip') || '0') / PRODUCTS_PER_PAGE;

  return (
    <div className="bg-white sm:pt-16 pt-20">
      <div className="mx-auto max-w-xl py-8 sm:py-4 lg:max-w-4xl">
        <div className="sm:px-0 px-2">
          <p className="text-xs text-slate-700">
            Showing{' '}
            <span className="font-medium">
              {currentPage * PRODUCTS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min((currentPage + 1) * PRODUCTS_PER_PAGE, productCount)}
            </span>{' '}
            of <span className="font-medium">{productCount}</span> results
          </p>
        </div>
        <div className="pt-2 grid pb-10 grid-cols-3 gap-x-2 gap-y-4 lg:grid-cols-6 xl:gap-x-2 sm:px-0 px-2">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group relative border border-slate-200 shadow-sm rounded-md hover:shadow-md"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-slate-200 lg:aspect-none h-32">
                <Image
                  src={product.image}
                  alt={product.description}
                  height={200}
                  width={200}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex flex-col p-4">
                <div>
                  <h3 className="text-sm text-slate-700">
                    <a href={product.description} className="">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Rp.
                    {product.harga
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </p>
                </div>
                <p className="text-xs font-normal text-slate-400">
                  {product.categoryName}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          handlePage={handlePage}
          handleNext={handleNext}
          handlePrev={handlePrev}
          productCount={productCount}
          productCountPerPage={PRODUCTS_PER_PAGE}
        />
      </div>
    </div>
  );
}
