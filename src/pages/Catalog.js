import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Корм для кошек", price: 8000, rating: 4.5, category: "Корм", animal: "Кошки", image: "/cat-food.jpg" },
  { id: 2, name: "Игрушка для собак", price: 300, rating: 4.2, category: "Игрушки", animal: "Собаки", image: "/dog-toy.jpg" },
  { id: 3, name: "Клетка для птиц", price: 2500, rating: 4.8, category: "Клетки", animal: "Птицы", image: "/bird-cage.jpg" },
  { id: 4, name: "Будка для большой собаки", price: 15000, rating: 5.0, category: "Аксессуары", animal: "Собаки", image: "/boodka.jpg" },
  { id: 5, name: "Аквариум для рыбок", price: 3000, rating: 4.7, category: "Аксессуары", animal: "Рыбки", image: "/aquarium.jpg" },
  { id: 6, name: "Корм для собак", price: 700, rating: 4.3, category: "Корм", animal: "Собаки", image: "/dog-food.jpg" },
  { id: 7, name: "Игрушка для кошек", price: 250, rating: 4.6, category: "Игрушки", animal: "Кошки", image: "/cat-toy.jpg" },
  { id: 8, name: "Лекарство для рыбок", price: 150, rating: 4.1, category: "Лекарства", animal: "Рыбки", image: "/fish-medicine.jpg" }
];

const categories = ["Все", "Корм", "Игрушки", "Клетки", "Аксессуары", "Лекарства"];
const animalTypes = ["Все", "Собаки", "Кошки", "Рыбки", "Птицы"];

function Catalog({ addToCart }) {
  const [sort, setSort] = useState("default");
  const [filterCategory, setFilterCategory] = useState("Все");
  const [filterAnimal, setFilterAnimal] = useState("Все");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Фильтрация по категории
  const filteredByCategory = filterCategory === "Все" 
    ? products 
    : products.filter(product => product.category === filterCategory);

  // Фильтрация по виду животного
  const filteredProducts = filterAnimal === "Все"
    ? filteredByCategory
    : filteredByCategory.filter(product => product.animal === filterAnimal);

  // Сортировка
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  // Показ кнопки "Наверх" при скролле
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="catalog-container">
      {/* Кнопка перехода в корзину */}
      <div className="catalog-nav">
        <Link to="/cart" className="go-to-cart-btn">Перейти в корзину</Link>
      </div>

      <div className="catalog-header">
        <h2>Каталог товаров</h2>
        <div className="filter-sort">
          <div className="filter-group">
            <label htmlFor="category-select">Фильтр по категории:</label>
            <select
              id="category-select"
              className="category-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="animal-select">Фильтр по виду животного:</label>
            <select
              id="animal-select"
              className="animal-select"
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
            >
              {animalTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort-select">Сортировка:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Без сортировки</option>
              <option value="price">По цене</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>
      </div>
      <div className="catalog">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

export default Catalog;
