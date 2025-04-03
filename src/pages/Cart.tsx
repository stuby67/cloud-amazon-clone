import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, loading, fetchCart, removeFromCart, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="text-blue-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.product.image_url}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="border rounded p-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-md hover:bg-yellow-500"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}