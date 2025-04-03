import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to AmazonClone</h1>
            <p className="text-xl mb-8">Discover amazing products at great prices</p>
            <Link
              to="/products"
              className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-500"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard
          title="Electronics"
          image="https://images.unsplash.com/photo-1498049794561-7780e7231661"
        />
        <CategoryCard
          title="Home & Kitchen"
          image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
        />
        <CategoryCard
          title="Fashion"
          image="https://images.unsplash.com/photo-1445205170230-053b83016050"
        />
      </div>
    </div>
  );
}

function CategoryCard({ title, image }: { title: string; image: string }) {
  return (
    <Link to={`/products?category=${title.toLowerCase()}`} className="block">
      <div className="relative h-64 rounded-lg overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
        </div>
      </div>
    </Link>
  );
}