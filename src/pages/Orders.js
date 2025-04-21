import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = ({ orders, setOrders }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem("orderRatings");
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

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

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleRatingChange = (orderId, rating) => {
    const updatedRatings = { ...ratings, [orderId]: rating };
    setRatings(updatedRatings);
    localStorage.setItem("orderRatings", JSON.stringify(updatedRatings));
  };

  const getDeliveryStatus = (orderTime) => {
    if (!orderTime) return "Ошибка времени заказа";

    let orderDate = new Date(orderTime);

    if (isNaN(orderDate.getTime())) {
      orderDate = new Date(orderTime.replace(" ", "T"));
    }

    if (isNaN(orderDate.getTime())) return "Ошибка формата даты";

    const now = new Date();
    const deliveryTime = new Date(orderDate);
    deliveryTime.setHours(orderDate.getHours() + Math.floor(Math.random() * 3) + 2);

    return now > deliveryTime ? "Доставлен" : `Ожидаемое время ${deliveryTime.toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    })}`;
  };

  const getPaymentStatus = (paymentMethod) => {
    const normalizedMethod = paymentMethod.toLowerCase();
    return (normalizedMethod === "сбп" || normalizedMethod === "sbp" || normalizedMethod === "банковская карта")
      ? "Оплачено"
      : "Оплата наличными";
  };
  const StarRating = ({ orderId, rating, onRate }) => {
    const [hovered, setHovered] = useState(0);
  
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hovered || rating) ? "filled" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onRate(orderId, star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  

  return (
    <div>
      <h2>📦 Мои заказы</h2>
      {orders.length === 0 ? (
        <p>Нет заказов.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => {
            const deliveryStatus = getDeliveryStatus(order.orderTime);
            const isDelivered = deliveryStatus === "Доставлен";

            return (
              <li key={order.id} className="order-item">
                <h3>Заказ №{order.id}</h3>
                <p><strong>Итого:</strong> {order.total} ₽</p>
                <p><strong>Оплата:</strong> {getPaymentStatus(order.paymentMethod)}</p>
                <p><strong>Доставка:</strong> {deliveryStatus}</p>
                <h4>Состав заказа:</h4>
                <ul className="order-items">
                  {order.items.map((item) => (
                    <li key={item.id} className="order-product">
                      <img src={item.image} alt={item.name} className="order-img" />
                      <div className="order-info">
                        <p><strong>{item.name}</strong></p>
                        <p>Цена: {item.price} ₽</p>
                        <p>Кол-во: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {isDelivered && (
                  <div className="order-rating">
                    {isDelivered && (
                      <div className="order-rating">
                       <label>Оцените заказ: </label>
                        <StarRating
                           orderId={order.id}
                            rating={ratings[order.id] || 0}
                            onRate={handleRatingChange}
                        />
                      
                      </div>
                    )}

                    {ratings[order.id] && <p>Ваша оценка: {ratings[order.id]} ★</p>}
                  </div>
                )}

                <button onClick={() => handleDeleteOrder(order.id)} className="delete-order-btn">
                  ❌ Удалить заказ
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
};

export default Orders;
