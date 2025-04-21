import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const reviews = [
    { text: "🐶 Отличный магазин! Купили игрушку для собаки, она в восторге!", author: "Анна, Москва" },
    { text: "🐱 Быстрая доставка, корм свежий, кот доволен. Спасибо!", author: "Игорь, Санкт-Петербург" },
    { text: "🐾 Удобный сайт, большой выбор. Теперь только здесь покупаю!", author: "Елена, Казань" }
  ];

  // Автопрокрутка каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

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

  const nextReview = () => {
    setReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="home-container">
      <h2>Добро пожаловать в 🐾 Pet Store!</h2>
      <p>У нас вы найдете лучшие товары для ваших питомцев: корма, игрушки, аксессуары и многое другое!</p>
      <Link to="/catalog" className="home-btn">Перейти в каталог</Link>
      <div className="banner-container">
        <Link to="/catalog">
          <img src="/pet-banner.jpg" alt="Питомцы" className="home-banner clickable" />
        </Link>
      </div>

      {/* Популярные товары */}
      <section className="popular-products">
        <h3>Популярные товары</h3>
        <div className="product-list">
          <Link to="/catalog" className="product-card">
            <img src="/cat-food.jpg" alt="Корм для кошек" />
            <p>Корм для кошек</p>
            <span>500 ₽</span>
          </Link>
          <Link to="/catalog" className="product-card">
            <img src="/dog-toy.jpg" alt="Игрушка для собак" />
            <p>Игрушка для собак</p>
            <span>300 ₽</span>
          </Link>
          <Link to="/catalog" className="product-card">
            <img src="/bird-cage.jpg" alt="Клетка для птиц" />
            <p>Клетка для птиц</p>
            <span>2500 ₽</span>
          </Link>
        </div>
      </section>

      {/* Улучшенная карусель отзывов */}
      <section className="reviews">
        <h3>Отзывы наших клиентов</h3>
        <div className="review-carousel">
          <div
            className="review-list"
            style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p>{review.text}</p>
                <span>- {review.author}</span>
              </div>
            ))}
          </div>
          <div className="review-controls">
            <button className="review-btn" onClick={prevReview}>⬅</button>
            <button className="review-btn" onClick={nextReview}>➡</button>
          </div>
          <div className="review-dots">
            {reviews.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === reviewIndex ? "active" : ""}`}
                onClick={() => setReviewIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="contacts">
        <h3>Свяжитесь с нами</h3>
        <p>📍 Адрес: ул. Пушкинская, 10, г. Москва</p>
        <p>📞 Телефон: +7 (900) 123-45-67</p>
        <p>📧 Email: support@petstore.com</p>
        <Link to="/contact" className="contact-btn">Перейти на страницу контактов</Link>
      </section>

      {/* Кнопка "Наверх" */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
}

export default Home;
