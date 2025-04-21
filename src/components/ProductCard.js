import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-img" />
        <h3>{product.name}</h3>
      </Link>
      <p>Цена: {product.price} ₽</p>
      <p>Рейтинг: ⭐ {product.rating}</p>
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
    </div>
  );
}

export default ProductCard;
