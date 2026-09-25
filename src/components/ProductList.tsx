import useFetchProducts from '../hooks/useFetchProducts';

function ProductList() {
  const { products, isLoading, error, refetch } = useFetchProducts();

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={refetch} disabled={isLoading}>Refresh</button>
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