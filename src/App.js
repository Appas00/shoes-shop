// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Footer from './components/Footer';
import AddToCart from './components/AddToCart';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <AddToCart />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;