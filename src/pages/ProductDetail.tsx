import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  stock: number;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
            
            <button
              onClick={() => addToCart(product.id)}
              disabled={product.stock === 0}
              className="w-full bg-yellow-400 text-black py-3 rounded-md hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}