import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {category ? `${category} Products` : 'All Products'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link to={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              </Link>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product.id)}
                className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}