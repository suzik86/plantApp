import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../types/product';    

type UseFetchProductsResult = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const useFetchProducts = (): UseFetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://fakestoreapi.com/products');        
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const products: Product[] = await response.json(); 
      setProducts(products);
    } catch (error: unknown) { 
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setError(message);
      console.error('Произошла ошибка при запросе:', message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    refetch();
    
  }, [refetch]);

  return { products, isLoading, error, refetch };
};

export default useFetchProducts;

