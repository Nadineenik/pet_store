import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        if (Array.isArray(parsedOrders)) {
          return parsedOrders;
        } else {
          console.error("Некорректные данные заказов в localStorage");
          return [];
        }
      } catch (error) {
        console.error("Ошибка парсинга данных заказов из localStorage", error);
        return [];
      }
    }
    return [];
  });

  const [notification, setNotification] = useState("");

  // Сохраняем корзину в localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Сохраняем заказы в localStorage
  useEffect(() => {
    if (Array.isArray(orders)) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      return existingItem
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
    setNotification(`${product.name} добавлен в корзину!`);
    setTimeout(() => setNotification(""), 2000);
  };

  const removeFromCart = (product) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <Router>
      <div className={`app ${menuOpen ? "menu-open" : ""}`}>
        <header>
          <Link to="/" className="logo">
            <img src="/my-logo.png" alt="Логотип" className="logo-img" />
          </Link>
          <h1 className="site-title">🐾 Pet Store</h1>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </header>

        <nav className={menuOpen ? "sidebar open" : "sidebar"}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/catalog" onClick={() => setMenuOpen(false)}>
                Каталог
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Корзина ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                Мои заказы
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        {notification && <div className="notification">{notification}</div>}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  setCartItems={setCartItems}
                  setOrders={setOrders} 
                />
              }
            />
            <Route
              path="/orders"
              element={<Orders orders={orders} setOrders={setOrders} />}
            />
            <Route path="/contact" element={<Contact address="Москва, ул. Пушкинская, д. 10" />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          </Routes>
        </main>

        <footer>
          <p>© 2025 Pet Store. Все права защищены.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
