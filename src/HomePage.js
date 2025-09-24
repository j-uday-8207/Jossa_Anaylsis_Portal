import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Header from './Header';

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
    title: "Advanced Data Visualizations",
    description: "Discover interactive heat maps, Sankey diagrams, geographic patterns, bubble charts, and time-series animations! Explore JOSAA data like never before with cutting-edge visualizations",
    link: "/visualizations"
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
  {
    title: "Old vs New",
    description: "Understand which is better according to your own priorities.Discover trends and stay ahead of the game!",
    link: "/DetailPage2"
  },
  {
    title: "Popularity within the branches",
    description: "Wanna discover how the interests of students in different branches have evolved over the years? Click here and explore away.",
    link: "/BranchesVar"
  },
];

const Card = ({ title, description, link }) => (
  <div className="homepage-card">
    <h3>{title}</h3>
    <p>{description}</p>
    {link ? (
      <Link to={link}>
        <button className="homepage-card-button"><span>Click to know more →</span></button>
      </Link>
    ) : (
      <button className="homepage-card-button"><span>Click to know more →</span></button>
    )}
  </div>
);

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="homepage-container">
        <div className="homepage-card-container">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} link={card.link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;