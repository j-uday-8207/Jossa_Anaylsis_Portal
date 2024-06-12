import React from 'react';
import './App.css';

const cards = [
  {
    title: "Just Want to filter data of your choice ?",
    description: "Customize your data exploration experience! Unleash the power to filter data of your choice, unlocking insights tailored to your specific interests. Dive deep into the details that matter to you and unravel hidden patterns with precision. It’s time to take control and uncover the answers you seek.",
  },
  {
    title: "What is the Popularity Variation between New and Old IITs?",
    description: "Unveil the intriguing popularity variation between the esteemed New and Old IITs. Explore how the preferences of students have shifted over time, offering valuable insights into the reputation and desirability of these premier institutions. Dive into the contrasting dynamics and make informed decisions based on this analysis.",
  },
  {
    title: "Popularity variation among different branches.",
    description: "Uncover the captivating popularity variation among different branches of study. Explore how student preferences have evolved over time, revealing insights into the most sought-after disciplines and their changing demand. Gain a deeper understanding of the trends and make informed decisions about your academic journey based on this analysis.",
  },
  {
    title: "What is the trend in the opening and closing ranks for popular branches?",
    description: "Discover the dynamic trends in opening and closing ranks for popular branches, uncovering the evolving competitiveness and demand for sought-after fields of study. This analysis offers valuable insights for students and educational institutions, guiding informed decisions and highlighting the changing landscape of higher education.",
  },
  {
    title: "How has the preference for specialized branches (such as Aerospace, Biotechnology, Computer Science, etc.) evolved over time?",
    description: "Embark on a journey through time to explore the evolving preference for specialized branches like Aerospace, Biotechnology, Computer Science, and more. Unveil the changing patterns of student choices, gaining valuable insights into the dynamic landscape of specialized fields of study. Witness the rise and fall of preferences and make informed decisions based on this analysis to shape your academic path.",
  },
  {
    title: "How has the trend of students opting for dual degree programs (B.Tech + M.Tech) changed over the years?",
    description: "Delve into the intriguing trend of students opting for dual degree programs (B.Tech + M.Tech) and witness its evolution over the years. Uncover the shifting preferences and choices of students, gaining insights into the growing popularity and advantages of pursuing integrated undergraduate and postgraduate degrees. Analyze the changing landscape and make informed decisions about your academic path based on this dynamic trend analysis.",
  },
  {
    title: "How does the popularity of non-engineering courses (such as B.Arch, B.Sc, etc.) compare to traditional engineering branches?",
    description: "Unveil the fascinating comparison between the popularity of non-engineering courses, including B.Arch, B.Sc, and more, against the backdrop of traditional engineering branches. Explore the shifting preferences of students, uncovering the relative demand for these diverse academic paths. Gain insights into the evolving landscape of higher education and make informed decisions about your own academic journey.",
  },
  {
    title: "What is the average rank difference between opening and closing rank of each branch?",
    description: "Discover the average rank difference between the opening and closing ranks of each branch. Uncover the range of ranks within which students are admitted to different branches, providing insights into the competitiveness and fluctuation of demand for specific fields of study. Gain a deeper understanding of the admission trends and make informed decisions based on this analysis to navigate your academic path.",
  },
  {
    title: "What is the average rank of students admitted to the IITs in different branches?",
    description: "Explore the average rank of students admitted to prestigious IITs across different branches. Gain insights into the academic competitiveness and the benchmark rank required for admission to various fields of study. Discover the patterns and variations in the average ranks across disciplines, assisting you in making informed decisions about your preferred branch of study.",
  },
  {
    title: "How has the cutoff rank for different categories (General, OBC, SC, ST, etc.) evolved over the years?",
    description: "Uncover the fascinating evolution of cutoff ranks for different categories (General, OBC, SC, ST, etc.) over the years. Explore the changing trends in admission criteria, gaining insights into the shifting landscape of inclusivity and representation in higher education. Witness the variations and patterns in cutoff ranks across categories, empowering you to make informed decisions about your academic journey.",
  },
];

const Card = ({ title, description }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    <button>Click to know more →</button>
  </div>
);

const App = () => {
  return (
    <div className="container">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </div>
  );
}

export default App;
