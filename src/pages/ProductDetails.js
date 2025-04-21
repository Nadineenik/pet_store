import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Массив продуктов с описанием и другими данными
const products = [
  { id: 1, name: "Корм для кошек", price: 500, rating: 4.5, category: "Корм", image: "/cat-food.jpg", description: "Высококачественный корм для кошек, богатый витаминами." },
  { id: 2, name: "Игрушка для собак", price: 300, rating: 4.2, category: "Игрушки", image: "/dog-toy.jpg", description: "Прочная игрушка для собак, стимулирующая активность." },
  { id: 3, name: "Клетка для птиц", price: 2500, rating: 4.8, category: "Клетки", image: "/bird-cage.jpg", description: "Просторная клетка для птиц с удобным доступом." },
  { id: 4, name: "Будка для большой собаки", price: 15000, rating: 5.0, category: "Аксессуары", image: "/boodka.jpg", description: "Комфортная будка для больших собак с утеплением." },
  { id: 5, name: "Аквариум для рыбок", price: 3000, rating: 4.7, category: "Аксессуары", image: "/aquarium.jpg", description: "Большой аквариум в виде бокала" },
  { id: 6, name: "Корм для собак", price: 700, rating: 4.3, category: "Корм", animal: "Собаки", image: "/dog-food.jpg", description: "Высококачественный корм для собак, богат витаминами, подходит для маленьких и больших пород" },
  { id: 7, name: "Игрушка для кошек", price: 250, rating: 4.6, category: "Игрушки", animal: "Кошки", image: "/cat-toy.jpg", description: "Игрушка Мышка для Вашей кошки" },
  { id: 8, name: "Лекарство для рыбок", price: 150, rating: 4.1, category: "Лекарства", animal: "Рыбки", image: "/fish-medicine.jpg", description: "Витамины для рыбок" }
];

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="product-details">
      {/* Кнопка возврата */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
      <img src={product.image} alt={product.name} className="product-detail-img" />
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p>Цена: {product.price} ₽</p>
        <p>Рейтинг: ⭐ {product.rating}</p>
        <p>{product.description}</p>
        <p><strong>Категория:</strong> {product.category}</p>
        <button onClick={() => addToCart(product)}>Добавить в корзину</button>
      </div>
    </div>
  );
}

export default ProductDetails;
