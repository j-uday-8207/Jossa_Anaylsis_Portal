import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: "Tailor according to your need",
    description: "Explore data tailored to your preferences! Understand the changing trends in IITs over the years to give yourself a clear idea of how things are changing",
    link: "/DetailPage"
  },
  {
    title: "Which is the ONE for you?",
    description: "Tell us your rank and preferred academic program and we will let you know where you might end up going college to! Thrilling, right?",
    link: "/DetailPage6"
  },
  {
    title: "How have dual degree programs trends changed over the years?",
    description: "If dual degree sounds interesting to you then this is the place for you! Explore the trends and discover hidden patterns",
    link: "/DetailPage4"
  },
  {
    title: "Rank Analysis for different branches",
    description: "Explore the average rank of students admitted to prestigious IITs across different branches. Gain insights into the academic competitiveness and also the industrial trends",
    link: "/DetailPage5"
  },
  {
    title: "Reserved Categories Analysis",
    description: "Know about specific trends tailored specifically for you. Understand how the reservation system applies for college admission and make informed decisions",
    link: "/DetailPage3"
  },
];

const Card = ({ title, description, link }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    {link ? (
      <Link to={link}>
        <button className="card-button"><span>Click to know more →</span></button>
      </Link>
    ) : (
      <button className="card-button"><span>Click to know more →</span></button>
    )}
  </div>
);

const AboutUsModal = ({ onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h2>About Us</h2>
      <p>This portal is developed by Uday Jain and Shrutee Prakash Dalai</p>
      <p>Contact us at: j.uday@iitg.ac.in / d.shrutee@iitg.ac.in</p>
    </div>
  </div>
);

const HomePage = () => {
  const [showAboutUs, setShowAboutUs] = useState(false);

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
  };

  return (
    <div>
      <header className="header">
        <h1>Josaa Analysis Portal</h1>
        <button className="about-button" onClick={toggleAboutUs}>About Us</button>
      </header>
      <div className="container">
        <div className="card-container">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} link={card.link} />
          ))}
        </div>
      </div>
      {showAboutUs && <AboutUsModal onClose={toggleAboutUs} />}
    </div>
  );
}

export default HomePage;
