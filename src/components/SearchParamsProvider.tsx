'use client';

import { useSearchParams as useNextSearchParams } from 'next/navigation';
import React, { createContext, useContext, ReactNode } from 'react';

// Create a context to store search params
const SearchParamsContext = createContext<URLSearchParams | null>(null);

// Provider component that will wrap components needing search params
export function SearchParamsProvider({ children }: { children: ReactNode }) {
  const searchParams = useNextSearchParams();
  
  return (
    <SearchParamsContext.Provider value={searchParams as unknown as URLSearchParams}>
      {children}
    </SearchParamsContext.Provider>
  );
}

// Custom hook to safely access search params
export function useSafeSearchParams() {
  const context = useContext(SearchParamsContext);
  
  // Return a safe version that works on both server and client
  return {
    get: (param: string) => {
      if (typeof window !== 'undefined' && context) {
        return context.get(param);
      }
      return null;
    }
  };
}