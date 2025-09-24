import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, Cell } from 'recharts';
import Papa from 'papaparse';
import './AdvancedVisualizations.css';

const AdvancedVisualizations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('heatmap');
  const [processedData, setProcessedData] = useState({
    heatmapData: [],
    sankeyData: null,
    geoData: [],
    bubbleData: [],
    timeSeriesData: []
  });

  useEffect(() => {
    loadAndProcessData();
  }, []);

  const loadAndProcessData = async () => {
    try {
      const response = await fetch('/final.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const csvData = results.data.filter(row => row.Institute && row['Academic Program Name']);
          setData(csvData);
          processDataForVisualizations(csvData);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error loading CSV data:', error);
      setLoading(false);
    }
  };

  const processDataForVisualizations = (csvData) => {
    // Process data for different visualization types
    const heatmapData = processHeatmapData(csvData);
    const sankeyData = processSankeyData(csvData);
    const geoData = processGeoData(csvData);
    const bubbleData = processBubbleData(csvData);
    const timeSeriesData = processTimeSeriesData(csvData);

    setProcessedData({
      heatmapData,
      sankeyData,
      geoData,
      bubbleData,
      timeSeriesData
    });
  };

  const processHeatmapData = (data) => {
    // Create Institute vs Branch popularity matrix
    const instituteSet = new Set();
    const branchSet = new Set();
    const matrix = {};

    data.forEach(row => {
      const institute = row.Institute?.split(' ')[0] || 'Unknown'; // Get short name
      const branch = row['Academic Program Name']?.split(' ')[0] || 'Unknown';
      
      instituteSet.add(institute);
      branchSet.add(branch);
      
      const key = `${institute}-${branch}`;
      if (!matrix[key]) {
        matrix[key] = { institute, branch, count: 0, avgClosingRank: 0 };
      }
      matrix[key].count += 1;
      matrix[key].avgClosingRank += parseInt(row['Closing Rank']) || 0;
    });

    // Calculate average closing ranks
    Object.values(matrix).forEach(item => {
      item.avgClosingRank = item.count > 0 ? Math.round(item.avgClosingRank / item.count) : 0;
    });

    return {
      institutes: Array.from(instituteSet).slice(0, 15), // Limit for readability
      branches: Array.from(branchSet).slice(0, 10),
      matrix: Object.values(matrix)
    };
  };

  const processSankeyData = (data) => {
    // Create flow from Institute Type -> Institute -> Branch
    const flows = {};
    const nodes = new Set();
    
    data.forEach(row => {
      const instituteType = row.Institute?.includes('IIT') ? 'IIT' : 
                           row.Institute?.includes('NIT') ? 'NIT' : 
                           row.Institute?.includes('IIIT') ? 'IIIT' : 'Other';
      const institute = row.Institute?.split(' ')[0] || 'Unknown';
      const branch = row['Academic Program Name']?.split(' ')[0] || 'Unknown';
      
      nodes.add(instituteType);
      nodes.add(institute);
      nodes.add(branch);
      
      const flow1Key = `${instituteType}-${institute}`;
      const flow2Key = `${institute}-${branch}`;
      
      flows[flow1Key] = (flows[flow1Key] || 0) + 1;
      flows[flow2Key] = (flows[flow2Key] || 0) + 1;
    });

    const nodeArray = Array.from(nodes);
    const links = Object.entries(flows).map(([key, value]) => {
      const [source, target] = key.split('-');
      return {
        source: nodeArray.indexOf(source),
        target: nodeArray.indexOf(target),
        value: value
      };
    });

    return {
      nodes: nodeArray.map(node => ({ name: node })),
      links: links.slice(0, 50) // Limit for performance
    };
  };

  const processGeoData = (data) => {
    // Simulate state-wise data (you'd need actual geographic data)
    const stateData = {};
    
    data.forEach(row => {
      // Extract state from institute name (simplified)
      let state = 'Unknown';
      if (row.Institute?.includes('Delhi')) state = 'Delhi';
      else if (row.Institute?.includes('Mumbai') || row.Institute?.includes('Bombay')) state = 'Maharashtra';
      else if (row.Institute?.includes('Chennai') || row.Institute?.includes('Madras')) state = 'Tamil Nadu';
      else if (row.Institute?.includes('Kanpur')) state = 'Uttar Pradesh';
      else if (row.Institute?.includes('Kharagpur')) state = 'West Bengal';
      else if (row.Institute?.includes('Roorkee')) state = 'Uttarakhand';
      else if (row.Institute?.includes('Guwahati')) state = 'Assam';
      else if (row.Institute?.includes('Hyderabad')) state = 'Telangana';
      else if (row.Institute?.includes('Bangalore')) state = 'Karnataka';
      
      if (!stateData[state]) {
        stateData[state] = { state, admissions: 0, avgRank: 0 };
      }
      stateData[state].admissions += 1;
      stateData[state].avgRank += parseInt(row['Closing Rank']) || 0;
    });

    // Calculate averages
    Object.values(stateData).forEach(item => {
      item.avgRank = item.admissions > 0 ? Math.round(item.avgRank / item.admissions) : 0;
    });

    return Object.values(stateData);
  };

  const processBubbleData = (data) => {
    // Create bubble chart data: X=Closing Rank, Y=Opening Rank, Size=Seats, Color=Institute Type
    return data.map(row => ({
      x: parseInt(row['Closing Rank']) || 0,
      y: parseInt(row['Opening Rank']) || 0,
      size: Math.random() * 30 + 10, // Simulate seat count
      institute: row.Institute,
      branch: row['Academic Program Name'],
      type: row.Institute?.includes('IIT') ? 'IIT' : 
            row.Institute?.includes('NIT') ? 'NIT' : 
            row.Institute?.includes('IIIT') ? 'IIIT' : 'Other',
      year: row.Year || '2023'
    })).filter(item => item.x > 0 && item.y > 0).slice(0, 500); // Limit for performance
  };

  const processTimeSeriesData = (data) => {
    // Group by year and calculate trends
    const yearData = {};
    
    data.forEach(row => {
      const year = row.Year || '2023';
      if (!yearData[year]) {
        yearData[year] = { 
          year, 
          totalSeats: 0, 
          avgClosingRank: 0, 
          count: 0,
          iitSeats: 0,
          nitSeats: 0
        };
      }
      
      yearData[year].totalSeats += 1;
      yearData[year].avgClosingRank += parseInt(row['Closing Rank']) || 0;
      yearData[year].count += 1;
      
      if (row.Institute?.includes('IIT')) yearData[year].iitSeats += 1;
      if (row.Institute?.includes('NIT')) yearData[year].nitSeats += 1;
    });

    // Calculate averages
    Object.values(yearData).forEach(item => {
      item.avgClosingRank = item.count > 0 ? Math.round(item.avgClosingRank / item.count) : 0;
    });

    return Object.values(yearData).sort((a, b) => a.year.localeCompare(b.year));
  };

  const renderHeatmap = () => {
    if (!processedData.heatmapData.institutes || processedData.heatmapData.institutes.length === 0) {
      return <div className="no-data">No data available for heatmap</div>;
    }

    const { institutes, branches, matrix } = processedData.heatmapData;
    
    // Create heatmap data for Plotly
    const z = institutes.map(institute =>
      branches.map(branch => {
        const item = matrix.find(m => m.institute === institute && m.branch === branch);
        return item ? item.count : 0;
      })
    );

    return (
      <div className="visualization-container">
        <h3>🔥 Institute vs Branch Popularity Heatmap</h3>
        <Plot
          data={[{
            z: z,
            x: branches,
            y: institutes,
            type: 'heatmap',
            colorscale: 'Viridis',
            hoverongaps: false,
            hovertemplate: 'Institute: %{y}<br>Branch: %{x}<br>Students: %{z}<extra></extra>'
          }]}
          layout={{
            title: 'Student Distribution Across Institutes and Branches',
            xaxis: { title: 'Academic Programs' },
            yaxis: { title: 'Institutes' },
            height: 600,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: 'white' }
          }}
          config={{ responsive: true }}
          style={{ width: '100%', height: '600px' }}
        />
      </div>
    );
  };

  const renderSankey = () => {
    if (!processedData.sankeyData || !processedData.sankeyData.nodes) {
      return <div className="no-data">No data available for Sankey diagram</div>;
    }

    const { nodes, links } = processedData.sankeyData;

    return (
      <div className="visualization-container">
        <h3>🌊 Student Flow: Institute Type → Institute → Branch</h3>
        <Plot
          data={[{
            type: 'sankey',
            node: {
              pad: 15,
              thickness: 20,
              line: {
                color: 'black',
                width: 0.5
              },
              label: nodes.map(n => n.name),
              color: 'rgba(255, 87, 34, 0.8)'
            },
            link: {
              source: links.map(l => l.source),
              target: links.map(l => l.target),
              value: links.map(l => l.value),
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }]}
          layout={{
            title: 'Student Admission Flow Pattern',
            font: { size: 12, color: 'white' },
            height: 600,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
          }}
          config={{ responsive: true }}
          style={{ width: '100%', height: '600px' }}
        />
      </div>
    );
  };

  const renderGeoMap = () => {
    return (
      <div className="visualization-container">
        <h3>🗺️ State-wise Admission Patterns</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={processedData.geoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="state" 
              tick={{ fontSize: 12, fill: 'white' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12, fill: 'white' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(40, 44, 52, 0.9)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }} 
            />
            <Legend />
            <Bar dataKey="admissions" fill="#ff5722" name="Total Admissions" />
            <Bar dataKey="avgRank" fill="#ffeb3b" name="Average Rank" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderBubbleChart = () => {
    // Group data by institute type for different colors
    const bubbleDataByType = processedData.bubbleData.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    const colors = {
      'IIT': '#ff5722',
      'NIT': '#4caf50',
      'IIIT': '#2196f3',
      'Other': '#ff9800'
    };

    return (
      <div className="visualization-container">
        <h3>💰 Bubble Chart: Opening vs Closing Ranks</h3>
        <Plot
          data={Object.entries(bubbleDataByType).map(([type, data]) => ({
            x: data.map(d => d.x),
            y: data.map(d => d.y),
            mode: 'markers',
            marker: {
              size: data.map(d => Math.sqrt(d.size)),
              color: colors[type],
              opacity: 0.7,
              sizemode: 'diameter',
              sizeref: 2
            },
            type: 'scatter',
            name: type,
            text: data.map(d => `${d.institute}<br>${d.branch}`),
            hovertemplate: '%{text}<br>Opening: %{y}<br>Closing: %{x}<extra></extra>'
          }))}
          layout={{
            title: 'Institute Comparison: Opening vs Closing Ranks',
            xaxis: { 
              title: 'Closing Rank',
              type: 'log',
              color: 'white'
            },
            yaxis: { 
              title: 'Opening Rank',
              type: 'log',
              color: 'white'
            },
            height: 600,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: 'white' },
            showlegend: true
          }}
          config={{ responsive: true }}
          style={{ width: '100%', height: '600px' }}
        />
      </div>
    );
  };

  const renderTimeSeries = () => {
    return (
      <div className="visualization-container">
        <h3>📈 Time Series: Admission Trends Over Years</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={processedData.timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12, fill: 'white' }}
            />
            <YAxis tick={{ fontSize: 12, fill: 'white' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(40, 44, 52, 0.9)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="totalSeats" 
              stroke="#ff5722" 
              strokeWidth={3}
              dot={{ fill: '#ff5722', strokeWidth: 2, r: 4 }}
              name="Total Seats"
            />
            <Line 
              type="monotone" 
              dataKey="iitSeats" 
              stroke="#4caf50" 
              strokeWidth={3}
              dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
              name="IIT Seats"
            />
            <Line 
              type="monotone" 
              dataKey="nitSeats" 
              stroke="#2196f3" 
              strokeWidth={3}
              dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
              name="NIT Seats"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="advanced-viz-loading">
        <div className="loading-spinner"></div>
        <p>Loading advanced visualizations...</p>
      </div>
    );
  }

  return (
    <div className="advanced-visualizations">
      <div className="viz-header">
        <h2>📊 Advanced Data Visualizations</h2>
        <p>Interactive charts with enhanced insights and beautiful animations</p>
      </div>

      <div className="viz-tabs">
        <button 
          className={`viz-tab ${activeView === 'heatmap' ? 'active' : ''}`}
          onClick={() => setActiveView('heatmap')}
        >
          🔥 Heatmap
        </button>
        <button 
          className={`viz-tab ${activeView === 'sankey' ? 'active' : ''}`}
          onClick={() => setActiveView('sankey')}
        >
          🌊 Flow Diagram
        </button>
        <button 
          className={`viz-tab ${activeView === 'geo' ? 'active' : ''}`}
          onClick={() => setActiveView('geo')}
        >
          🗺️ Geographic
        </button>
        <button 
          className={`viz-tab ${activeView === 'bubble' ? 'active' : ''}`}
          onClick={() => setActiveView('bubble')}
        >
          💰 Bubble Chart
        </button>
        <button 
          className={`viz-tab ${activeView === 'timeseries' ? 'active' : ''}`}
          onClick={() => setActiveView('timeseries')}
        >
          📈 Time Series
        </button>
      </div>

      <div className="viz-content">
        {activeView === 'heatmap' && renderHeatmap()}
        {activeView === 'sankey' && renderSankey()}
        {activeView === 'geo' && renderGeoMap()}
        {activeView === 'bubble' && renderBubbleChart()}
        {activeView === 'timeseries' && renderTimeSeries()}
      </div>
    </div>
  );
};

export default AdvancedVisualizations;