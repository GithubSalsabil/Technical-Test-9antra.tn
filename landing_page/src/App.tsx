import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import backgroundImage from "./assets/Capture .png"
import logoImage from "./assets/logo.png";

interface Item {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    };
    fetchItems();
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo" />
        </div>
        <div className="centered-container">
          <h1 className="title">Improve your skills on your own</h1>
          <h2 className="subtitle">To prepare for a better future</h2>
          <button className="button">Register Now</button>
        </div>
      </header>

      {/* Course list */}
      <section className="courses-section">
        <div className="header">
          <h1>Listed Courses</h1>
          <button className="view-more">View More</button>
        </div>
        <div className="courses-grid">
          {items.map((item) => (
            <div key={item._id} className="course-card">
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
                className="course-image"
              />
              <h3 className="course-title">{item.name}</h3>
              <p className="course-price">{item.price} DT/Month</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="contact-form-container">
        <h2 className="form-title">Contact Us</h2>
        <form className="contact-form">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Jiara Martins"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="hello@reallygreatsite.com"
          />
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            className="form-textarea"
            placeholder="Write your message here"
          ></textarea>
          <button type="submit" className="form-button">
            Send the message
          </button>
        </form>
      </section>
    </>
  );
};

export default App;
