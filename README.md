# 🎓 JOSAA Analysis Portal

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)](https://nodejs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-orange.svg)](https://www.chartjs.org/)
[![Plotly](https://img.shields.io/badge/Plotly.js-Advanced%20Charts-purple.svg)](https://plotly.com/javascript/)

## 🚀 Project Overview

A comprehensive data visualization portal for Joint Seat Allocation Authority (JOSAA) data, featuring advanced interactive charts, sophisticated analytics, and intelligent filtering capabilities. This portal transforms complex admission data into intuitive visual insights, empowering students, counselors, and researchers to make informed decisions about engineering education pathways.

### ✨ Key Features

- 🎯 **Interactive Data Exploration** - Dynamic filtering and real-time chart updates
- 📊 **Advanced Visualizations** - Heat maps, Sankey diagrams, geographic patterns, bubble charts, and time-series animations
- 🔍 **Smart Analytics** - Rank prediction, trend analysis, and comparative studies
- 🎨 **Modern Dark UI** - Professional interface with glassmorphism effects
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **High Performance** - Efficient data processing and smooth interactions
- 🔧 **Cross-Browser Compatible** - Works seamlessly across all modern browsers

## 🛠️ Technologies Used

### Frontend Stack
- **React 18.3.1** - Modern UI framework with hooks and context
- **React Router** - Client-side routing and navigation
- **Chart.js & React-Chart.js-2** - Traditional chart visualizations
- **Plotly.js & React-Plotly.js** - Advanced interactive visualizations
- **Recharts** - Responsive chart components
- **D3.js** - Data-driven document manipulation
- **Papa Parse** - Powerful CSV parsing and processing

### Backend & Data
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **Python & Selenium** - Data scraping and automation
- **CSV Processing** - Efficient data handling and transformation

### Visualization Libraries
- **Chart.js** - Bar charts, line graphs, and basic visualizations
- **Plotly.js** - Heat maps, Sankey diagrams, 3D plots
- **Recharts** - Responsive and composable charts
- **D3.js** - Custom data visualizations and animations

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

### Step-by-Step Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/j-uday-8207/Jossa_Anaylsis_Portal.git
cd Jossa_Anaylsis_Portal

# Step 2: Install dependencies
npm install

# Step 3: Start the backend server
node server.js

# Step 4: Start the React application (in a new terminal)
npm start
```

### 🌐 Access the Application
- **Local Development**: http://localhost:3000
- **Server**: http://localhost:3001 (if configured)

## 🎨 Feature Showcase

### 🏠 Homepage Dashboard
![Homepage](./public/Snapshots/Homepage.png)
*Interactive dashboard with intuitive navigation cards*

### 🎯 Personalized Data Analysis
![Tailor_Page](./public/Snapshots/Tailor_Need.png)
*Customizable filtering based on college, seat type, year, and gender*

### 🔮 Rank-Based Predictions
![Rank_Predictor](./public/Snapshots/Rank_Predct.png)
*Intelligent rank prediction system for admission guidance*

### 📈 Advanced Visualizations
**New Feature**: Comprehensive visualization suite including:
- **Heat Maps** - Institute vs Branch popularity matrix
- **Sankey Diagrams** - Student flow patterns and transitions
- **Geographic Maps** - State-wise admission distribution
- **Bubble Charts** - Multi-dimensional rank analysis
- **Time-Series Animations** - Trend evolution over years

### 🎓 Dual Degree Program Analysis
![Dual_Degree](./public/Snapshots/Dual_Degree.png)
*Comprehensive trends analysis for dual degree programs*

### 📊 Branch-Wise Performance Metrics
![Average_Rank](./public/Snapshots/Average_Rank.png)
*Interactive analysis of average ranks across engineering branches*

### 🏷️ Category-Based Cutoff Analysis
![Cutoff](./public/Snapshots/Cutoff_Category.png)
*Detailed cutoff trends for various reserved categories*

### 🆚 Institution Comparison
![Old vs New](./public/Snapshots/Old_vs_New.png)
*Comprehensive comparison between established and newer IITs*

### 🌟 Popular Branch Trends
![Popular Branches](./public/Snapshots/Popular_Branch.png)
*Interactive trends analysis for popular engineering branches*

## 🎯 Recent Enhancements (v2.0)

### ✅ Advanced Visualization Suite
- Implemented **5 new chart types** with Plotly.js integration
- Added **interactive heat maps** for institute-branch analysis
- Created **Sankey diagrams** for student flow visualization
- Integrated **geographic mapping** for regional insights
- Developed **bubble charts** for multi-dimensional analysis
- Built **time-series animations** for trend evolution

### ✅ UI/UX Improvements
- **Fixed text visibility issues** across all charts
- **Enhanced dark theme** with better contrast ratios
- **Improved chart containers** with glassmorphism effects
- **Better responsive design** for mobile devices
- **Cross-browser compatibility** fixes (Edge, Safari, Chrome)

### ✅ Performance Optimizations
- **Efficient data processing** algorithms
- **Lazy loading** for large datasets
- **Memory optimization** for chart rendering
- **Faster CSV parsing** with Papa Parse integration

## 📁 Project Structure

```
Jossa_Anaylsis_Portal/
├── public/
│   ├── final.csv                 # Main dataset
│   ├── Snapshots/               # Application screenshots
│   └── assets/                  # Static assets
├── src/
│   ├── components/
│   │   ├── AdvancedVisualizations.js  # New advanced charts
│   │   ├── DetailPage*.js            # Analysis pages
│   │   ├── Sidebar*.js              # Filter components
│   │   └── Header.js               # Navigation header
│   ├── styles/
│   │   ├── *.css                   # Component styles
│   │   └── AdvancedVisualizations.css # Advanced chart styles
│   ├── utils/
│   │   ├── csv_util.js            # Data processing utilities
│   │   └── convert.js             # Data transformation
│   └── App.js                     # Main application component
├── scraper/                       # Data scraping tools
├── build/                         # Production build
├── server.js                      # Backend server
└── package.json                   # Dependencies
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📊 Data Sources

- **JOSAA Official Data** - Joint Seat Allocation Authority
- **Real-time Scraping** - Automated data collection via Selenium
- **Historical Trends** - Multi-year admission data analysis
- **Comprehensive Coverage** - All IITs, NITs, and participating institutions

## 🐛 Issue Reporting

Found a bug or have a suggestion? Please [open an issue](https://github.com/j-uday-8207/Jossa_Anaylsis_Portal/issues) with:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Uday** - Lead Developer & Data Analyst
- **Shrutee** - UI/UX Designer
- **Saumya** - Data Scientist

## 🌟 Acknowledgments

- JOSAA for providing comprehensive admission data
- Chart.js and Plotly.js communities for excellent visualization libraries
- React team for the robust framework
- All beta testers and contributors

---

<div align="center">

**⭐ Star this repository if you find it helpful! ⭐**

[🔗 Live Demo](http://localhost:3000) | [📖 Documentation](./docs) | [🚀 Features](./FEATURES.md)

</div>
