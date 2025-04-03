/*
  # Initial Schema Setup for Amazon Clone

  1. New Tables
    - users (handled by neon Auth)
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (numeric)
      - category (text)
      - image_url (text)
      - stock (integer)
      - created_at (timestamp)
    - cart_items
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - product_id (uuid, references products)
      - quantity (integer)
      - created_at (timestamp)
    - orders
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - status (text)
      - total (numeric)
      - created_at (timestamp)
    - order_items
      - id (uuid, primary key)
      - order_id (uuid, references orders)
      - product_id (uuid, references products)
      - quantity (integer)
      - price (numeric)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL,
  image_url text,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Cart items table
CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  total numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  quantity integer NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own cart"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Wireless Earbuds', 'High-quality wireless earbuds with noise cancellation', 99.99, 'Electronics', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46', 100),
('Smart Watch', 'Fitness tracking smartwatch with heart rate monitor', 199.99, 'Electronics', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a', 50),
('Laptop Backpack', 'Water-resistant laptop backpack with USB charging port', 49.99, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 200),
('Coffee Maker', 'Programmable coffee maker with thermal carafe', 79.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1517914309068-900c5bca33b6', 75),
('Yoga Mat', 'Non-slip yoga mat with carrying strap', 29.99, 'Sports', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f', 150);