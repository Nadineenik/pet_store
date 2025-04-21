import React from "react";

function Contact() {
  return (
    <div className="contact-container">
      <h2>Свяжитесь с нами</h2>
      <p>📍 Адрес: г. Москва, ул. Пушкинская, д. 10</p>
      <p>📞 Телефон: +7 (999) 123-45-67</p>
      <p>📧 Email: info@petstore.ru</p>
      <iframe
        title="Карта"
        src="https://maps.google.com/maps?q=Москва, Пушкинская 10&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="contact-map"
      ></iframe>
    </div>
  );
}

export default Contact;
