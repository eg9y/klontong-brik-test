"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";

export function Pagination({
    handleNext,
    handlePrev,
    productCount,
    handlePage,
    productCountPerPage
  }: {
    handleNext: () => void;
    handlePrev: () => void;
    handlePage: (page: number) => void;
    productCount: number;
    productCountPerPage: number;
  }) {
    const currentPage =
      parseInt(useSearchParams().get('skip') || '0') / productCountPerPage;
  
    return (
      <nav
        className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-slate-700">
            Showing{' '}
            <span className="font-medium">
              {currentPage * productCountPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min((currentPage + 1) * productCountPerPage, productCount)}
            </span>{' '}
            of <span className="font-medium">{productCount}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            className="relative ml-3 inline-flex items-center px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-offset-0 cursor-pointer"
            onClick={() => {
              handlePrev();
            }}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </a>
          {Array.from(
            Array(Math.ceil(productCount / productCountPerPage)).keys(),
          ).map((page) => (
            <a
              key={page}
              onClick={() => {
                handlePage(page);
              }}
              className={`cursor-pointer relative inline-flex items-center bg-white px-4 py-2 text-sm font-normal text-slate-900 hover:bg-slate-50 focus-visible:outline-offset-0 ${
                currentPage === page
                  ? 'text-green-600 border-b border-green-600 font-bold'
                  : ''
              }`}
            >
              {page + 1}
            </a>
          ))}
          <a
            className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-offset-0 cursor-pointer"
            onClick={() => {
              handleNext();
            }}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </a>
        </div>
      </nav>
    );
  }
  