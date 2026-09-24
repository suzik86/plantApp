import { useEffect } from 'react';
import { useState } from 'react';
import type { Product } from '../types/product';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

     async function fetchProducts(): Promise<void> {
        try {
            setIsLoading(true);
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
    }

  return (
    <div>
      <h2>Product List</h2>
      {isLoading && !error ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              <img src={product.image} alt={product.title} width="100" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;