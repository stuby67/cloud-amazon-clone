import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const { items } = useCartStore();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    supabase.auth.onAuthStateChange((_, session) => setUser(session?.user));
  }, []);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">AmazonClone</span>
            </Link>
          </div>

          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded text-gray-900"
              />
              <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to={user ? "/account" : "/auth"} className="hover:text-gray-300">
              <User size={24} />
            </Link>
            <Link to="/cart" className="hover:text-gray-300 relative">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}