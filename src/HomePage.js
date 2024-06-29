import React from 'react';
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

const AboutUsModal = ({ onClose }) => (
  <div className="homepage-modal">
    <div className="homepage-modal-content">
      <span className="homepage-close" onClick={onClose}>&times;</span>
      <h2>About Us</h2>
      <div className="homepage-profile">
        <div className="homepage-profile-item">
          <img src="/uday.jpg" alt="Uday Jain" className="homepage-profile-image" />
          <p>Uday Jain</p>
        </div>
        <div className="homepage-profile-item">
          <img src="/shrutee.jpg" alt="Shrutee Prakash Dalai" className="homepage-profile-image" />
          <p>Shrutee Prakash Dalai</p>
        </div>
  <div className="homepage-profile-item">
          <img src="/saumya.jpg" alt="Saumya Tripathi" className="homepage-profile-image" />
          <p>Saumya Tripathi</p>
        </div>
      </div>
      <p>This portal is developed by Uday Jain, Shrutee Prakash Dalai and Saumya Tripathi</p>
      <p>Contact us at: j.uday@iitg.ac.in / d.shrutee@iitg.ac.in / t.saumya@iitg.ac.in</p>
    </div>
  </div>
);

const HomePage = () => {
  const [showAboutUs, setShowAboutUs] = React.useState(false);

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
  };

  return (
    <div>
      <header className="homepage-header">
        <h1>Josaa Analysis Portal</h1>
        <button className="homepage-about-button" onClick={toggleAboutUs}>About Us</button>
      </header>
      <div className="homepage-container">
        <div className="homepage-card-container">
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
