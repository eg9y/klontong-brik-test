"use client";

import { ProductType } from "@/lib/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function usePaginatedData(productCountPerPage: number, router: AppRouterInstance) {
    const [products, setData] = useState<ProductType[]>([]);
    const searchParams = useSearchParams();
    const [productCount, setProductCount] = useState(0);
  
    useEffect(() => {
      async function fetchData() {
        const skip = searchParams.get('skip');
        const res = await fetch(
          `http://localhost:3000/shop-item/get-items?skip=${
            skip || 0
          }&take=${productCountPerPage}`,
        );
        const data = await res.json();
        setData(data);
      }
  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);
  
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(`http://localhost:3000/shop-item/get-count`);
        const data = await res.json();
        setProductCount(data);
      }
      fetchData();
    }, []);
  
    const handleNext = () => {
      const skip = searchParams.get('skip');
      const newSkip = Number(skip || 0) + productCountPerPage;
      router.push(`?skip=${newSkip}`);
    };
  
    const handlePrev = () => {
      const skip = searchParams.get('skip');
      const newSkip = skip ? Number(skip) - productCountPerPage : 0;
      if (newSkip >= 0) {
        router.push(`?skip=${newSkip}`);
      }
    };
  
    const handlePage = (page: number) => {
      router.push(`?skip=${page * productCountPerPage}`);
    };
  
    return {
      products,
      handleNext,
      handlePrev,
      handlePage,
      productCount,
    };
  }