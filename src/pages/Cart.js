import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, addToCart, removeFromCart, setCartItems, setOrders }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderDetails, setOrderDetails] = useState({ name: "", phone: "", address: "", cardNumber: "" });
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedItems(cartItems.map(item => ({ ...item, selected: true })));
  }, [cartItems]);

  const totalPrice = selectedItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrder = (e) => {
      e.preventDefault();
    
      const orderedItems = selectedItems.filter(item => item.selected);
      if (orderedItems.length === 0) {
        alert("Выберите товары для покупки!");
        return;
      }
    
      // Добавляем заказ с временем оформления
      setOrders(prevOrders => [
        ...prevOrders,
        {
          id: Date.now(),
          items: orderedItems,
          total: totalPrice,
          paymentMethod: paymentMethod,  // Добавляем способ оплаты
          orderTime: new Date().toISOString() // Время оформления заказа
        }
      ]);
    
      // Удаляем купленные товары из корзины
      setCartItems(cartItems.filter(item => !orderedItems.some(ordered => ordered.id === item.id)));
    
      setIsCheckout(false);
      alert(`Заказ оформлен! Сумма: ${totalPrice} ₽`);
      
      navigate("/orders");
    };
    

  return (
    <div className="cart-container">
      <h2>🛒 Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          {!isCheckout ? (
            <>
              <ul className="cart-list">
                {cartItems.map((item, index) => (
                  <li key={item.id} className="cart-item">
                    <input
                      type="checkbox"
                      checked={selectedItems[index]?.selected || false}
                      onChange={() => {
                        const updatedItems = [...selectedItems];
                        updatedItems[index].selected = !updatedItems[index].selected;
                        setSelectedItems(updatedItems);
                      }}
                    />
                    <img src={item.image} alt={item.name} className="cart-img" />
                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>Цена: {item.price} ₽</p>
                      <div className="cart-controls">
                        <button onClick={() => removeFromCart(item)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <h3>Итого: {totalPrice} ₽</h3>
              </div>
              <button className="checkout-btn" onClick={() => setIsCheckout(true)}>Оформить заказ</button>
            </>
          ) : (
            <form className="checkout-form" onSubmit={handleOrder}>
              <h3>Оформление заказа</h3>
              <input type="text" placeholder="Имя" required value={orderDetails.name} onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })} />
              <input type="tel" placeholder="Телефон" required value={orderDetails.phone} onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })} />
              <input type="text" placeholder="Адрес доставки" required value={orderDetails.address} onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} />
              <label>Выберите способ оплаты:</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="card">Банковская карта</option>
                <option value="sbp">СБП</option>
                <option value="cash">Наличные при получении</option>
              </select>
              {paymentMethod === "card" && (
                <input type="text" placeholder="Номер карты" required value={orderDetails.cardNumber} onChange={(e) => setOrderDetails({ ...orderDetails, cardNumber: e.target.value })} />
              )}
              <button type="submit" className="confirm-btn">Подтвердить заказ</button>
              <button type="button" className="cancel-btn" onClick={() => setIsCheckout(false)}>Отмена</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
