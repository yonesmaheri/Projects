import './App.css'
import ProductCard from './components/ProductCard'

const products = [
  { id: 0, name: 'Samsung Galaxy S24 Ultra', price: 1000, desc: 'Premium smartphone with AI features' },
  { id: 1, name: 'Apple iPhone 15 Pro Max', price: 1200, desc: 'Flagship smartphone with A17 chip' },
  { id: 2, name: 'Xiaomi Redmi Note 13 Pro', price: 750, desc: 'Mid-range phone with 200MP camera' },
  { id: 3, name: 'Asus ROG Strix G16 Laptop', price: 1600, desc: 'Gaming laptop with RTX graphics' },
  { id: 4, name: 'Apple MacBook Air M3', price: 3000, desc: 'Lightweight laptop with M3 chip' },
  { id: 5, name: 'Lenovo ThinkPad X1 Carbon', price: 899, desc: 'Business ultrabook' },
  { id: 6, name: 'Sony WH-1000XM5 Headphones', price: 100, desc: 'Noise-canceling over-ear' },
  { id: 7, name: 'Apple AirPods Pro 2', price: 200, desc: 'Wireless earbuds with ANC' },
  { id: 8, name: 'JBL Charge 5 Speaker', price: 51, desc: 'Portable Bluetooth speaker' },
  { id: 9, name: 'Samsung 4K Smart TV 55"', price: 5000, desc: 'Crystal UHD with HDR' },
  { id: 10, name: 'LG OLED C3 65"', price: 4000, desc: 'OLED display with deep blacks' },
  { id: 11, name: 'Apple Watch Series 9', price: 400, desc: 'Smartwatch with fitness tracking' },
  { id: 12, name: 'Samsung Galaxy Watch 6', price: 350, desc: 'AMOLED smartwatch' },
  { id: 13, name: 'Samsung 1TB NVMe SSD 980 Pro', price: 100, desc: 'High-speed NVMe storage' },
];


function App() {

  return (
    <div className='bg-slate-100 p-10 grid grid-cols-3 gap-10 min-h-screen  w-full text-white'>
      {products.map((item) => (
        <ProductCard key={item.id} name={item.name} desc={item.desc} price={item.price} />
      ))}
    </div>
  )
}

export default App
