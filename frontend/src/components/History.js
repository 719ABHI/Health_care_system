// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import './History.css';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const [graphData, setGraphData] = useState({});

//   useEffect(() => {
//     // Fetch history from localStorage
//     const storedHistory = JSON.parse(localStorage.getItem('predictionHistory')) || [];
//     setHistory(storedHistory);

//     // Prepare graph data
//     if (storedHistory.length > 0) {
//       const dates = storedHistory.map(entry => entry.dateTime);
//       const risks = storedHistory.map(entry => entry.riskPercentage);

//       setGraphData({
//         labels: dates,
//         datasets: [
//           {
//             label: 'Risk Percentage',
//             data: risks,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       });
//     }
//   }, []);

//   return (
//     <div className="history-container">
//       <h2>Prediction History</h2>

//       {history.length === 0 ? (
//         <p>No prediction history found.</p>
//       ) : (
//         <>
//           {/* Graph Section */}
//           <div className="graph-container">
//             <h3>Risk Percentage Over Time</h3>
//             <Line
//               data={graphData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Risk Percentage Over Time',
//                   },
//                   tooltip: {
//                     mode: 'index',
//                     intersect: false,
//                   },
//                   legend: {
//                     display: false,
//                   },
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: 'Date & Time',
//                     },
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: 'Risk Percentage',
//                     },
//                     min: 0,
//                     max: 100,
//                   },
//                 },
//               }}
//             />
//           </div>

//           {/* Table Section */}
//           <table className="history-table">
//             <thead>
//               <tr>
//                 <th>Prediction Type</th>
//                 <th>Date & Time</th>
//                 <th>Result</th>
//                 <th>Risk %</th>
//                 <th>Input Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.predictionType}</td>
//                   <td>{entry.dateTime}</td>
//                   <td>{entry.result}</td>
//                   <td>{entry.riskPercentage}%</td>
//                   <td>
//                     <details>
//                       <summary>View</summary>
//                       <ul>
//                         {Object.entries(entry.features).map(([featureName, featureValue], idx) => (
//                           <li key={idx}>
//                             <strong>{featureName}:</strong> {featureValue}
//                           </li>
//                         ))}
//                       </ul>
//                     </details>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default History;
























// 











// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';  // Import the autoTable plugin

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import './History.css';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const [graphData, setGraphData] = useState({});

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem('predictionHistory')) || [];
//     const sortedHistory = storedHistory.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
//     setHistory(sortedHistory);
//     updateGraphData(sortedHistory);
//   }, []);

//   const updateGraphData = (data) => {
//     const dates = data.map(entry => entry.dateTime);

//     const heartDiseaseData = data.map(entry => {
//       if (entry.predictionType === 'Heart Disease') {
//         return entry.riskPercentage >= 50 ? 1 : 0;
//       }
//       return null;
//     });

//     const brainStrokeData = data.map(entry => {
//       if (entry.predictionType === 'Brain Stroke') {
//         return entry.result === 'High Stroke Risk' ? 1 : 0;
//       }
//       return null;
//     });

//     setGraphData({
//       labels: dates,
//       datasets: [
//         {
//           label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
//           data: heartDiseaseData,
//           borderColor: 'rgba(255, 0, 0, 1)',
//           backgroundColor: 'rgba(255, 0, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//         {
//           label: 'Brain Stroke (1 = High Risk, 0 = Low Risk)',
//           data: brainStrokeData,
//           borderColor: 'rgba(0, 0, 255, 1)',
//           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });
//   };

//   const clearHistory = () => {
//     localStorage.removeItem('predictionHistory');
//     setHistory([]);
//     setGraphData({});
//   };

//   const deleteRecord = (index) => {
//     const updatedHistory = history.filter((_, i) => i !== index);
//     localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
//     setHistory(updatedHistory);
//     updateGraphData(updatedHistory);
//   };

//   const downloadJsonReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const reportContent = history.map((entry, index) => {
//       return {
//         Record: index + 1,
//         Name: entry.features?.patientName || 'N/A',
//         Email: entry.features?.email || 'N/A',
//         Age: entry.features?.age || 'N/A',
//         ContactNumber: entry.features?.contactNumber || 'N/A',
//         PredictionType: entry.predictionType,
//         DateTime: entry.dateTime,
//         Result: entry.result,
//         InputDetails: entry.features || {},
//       };
//     });

//     const blob = new Blob([JSON.stringify(reportContent, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'prediction_report_history.json';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const downloadPdfReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Prediction Report History', 14, 20);

//     // Assuming all entries have the same patient info, take from first
//     const firstEntry = history[0];
//     const name = firstEntry.features?.patientName || 'N/A';
//     const email = firstEntry.features?.email || 'N/A';
//     const age = firstEntry.features?.age || 'N/A';

//     doc.setFontSize(12);
//     doc.text(`Name: ${name}`, 14, 30);
//     doc.text(`Email: ${email}`, 14, 36);
//     doc.text(`Age: ${age}`, 14, 42);

//     const tableData = history.map((entry, index) => [
//       index + 1,
//       entry.predictionType,
//       entry.dateTime,
//       entry.result,
//     ]);

//     // Fix: Use the autoTable function correctly
//     autoTable(doc, {
//       startY: 50,
//       head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
//       body: tableData,
//       styles: { fontSize: 10 },
//     });

//     doc.save('prediction_report_history.pdf');
//   };

//   return (
//     <div className="history-container">
//       <h2>Prediction History</h2>

//       <div className="button-group">
//         <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
//         <button className="download-report-btn" onClick={downloadJsonReport}>Download JSON Report</button>
//         <button className="download-report-btn" onClick={downloadPdfReport}>Download PDF Report</button>
//       </div>

//       {history.length === 0 ? (
//         <p>No prediction history found.</p>
//       ) : (
//         <>
//           <div className="graph-container">
//             <h3>Risk Status Over Time (0 = Low Risk, 1 = High Risk)</h3>
//             <Line
//               data={graphData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Risk Status Over Time',
//                   },
//                   tooltip: {
//                     mode: 'index',
//                     intersect: false,
//                   },
//                   legend: {
//                     display: true,
//                     position: 'top',
//                   },
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: 'Date & Time',
//                     },
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: 'Risk (0 = Low, 1 = High)',
//                     },
//                     min: 0,
//                     max: 1,
//                     ticks: {
//                       stepSize: 1,
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>

//           <table className="history-table">
//             <thead>
//               <tr>
//                 <th>Prediction Type</th>
//                 <th>Date & Time</th>
//                 <th>Result</th>
//                 <th>Input Details</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td className={`prediction-type ${entry.predictionType.replace(/\s/g, '-')}`}>
//                     {entry.predictionType}
//                   </td>
//                   <td>{entry.dateTime}</td>
//                   <td>{entry.result}</td>
//                   <td>
//                     <details>
//                       <summary>View Input Details</summary>
//                       <pre>{JSON.stringify(entry.features, null, 2)}</pre>
//                     </details>
//                   </td>
//                   <td>
//                     <button className="delete-btn" onClick={() => deleteRecord(index)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default History;





import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  // Import the autoTable plugin
import axios from 'axios';  // Import axios to fetch data from backend

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './History.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const History = () => {
  const [history, setHistory] = useState([]);
  const [graphData, setGraphData] = useState({});

  // Fetch history data from the database
  useEffect(() => {
    // Fetch prediction history from the backend
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/history'); // Endpoint for fetching history from Node.js backend
        const sortedHistory = response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setHistory(sortedHistory);
        updateGraphData(sortedHistory);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  const updateGraphData = (data) => {
    const dates = data.map(entry => entry.dateTime);

    const heartDiseaseData = data.map(entry => {
      if (entry.predictionType === 'Heart Disease') {
        return entry.riskPercentage >= 50 ? 1 : 0;
      }
      return null;
    });

    const brainStrokeData = data.map(entry => {
      if (entry.predictionType === 'Brain Stroke') {
        return entry.result === 'High Stroke Risk' ? 1 : 0;
      }
      return null;
    });

    setGraphData({
      labels: dates,
      datasets: [
        {
          label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
          data: heartDiseaseData,
          borderColor: 'rgba(255, 0, 0, 1)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: false,
          tension: 0.4,
          spanGaps: true,
        },
        {
          label: 'Brain Stroke (1 = High Risk, 0 = Low Risk)',
          data: brainStrokeData,
          borderColor: 'rgba(0, 0, 255, 1)',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: false,
          tension: 0.4,
          spanGaps: true,
        },
      ],
    });
  };

  const clearHistory = () => {
    // Clear history from the backend (optional, could be used for a 'clear all' button)
    axios.delete('http://localhost:5002/api/history')
      .then(() => {
        setHistory([]);
        setGraphData({});
      })
      .catch((err) => {
        console.error('Error clearing history:', err);
      });
  };

  const deleteRecord = (index) => {
    const recordId = history[index]._id; // assuming each record has a unique ID
    axios.delete(`http://localhost:5002/api/history/${recordId}`)
      .then(() => {
        const updatedHistory = history.filter((_, i) => i !== index);
        setHistory(updatedHistory);
        updateGraphData(updatedHistory);
      })
      .catch((err) => {
        console.error('Error deleting record:', err);
      });
  };

  const downloadJsonReport = () => {
    if (history.length === 0) {
      alert('No history to download.');
      return;
    }

    const reportContent = history.map((entry, index) => {
      return {
        Record: index + 1,
        Name: entry.features?.patientName || 'N/A',
        Email: entry.features?.email || 'N/A',
        Age: entry.features?.age || 'N/A',
        ContactNumber: entry.features?.contactNumber || 'N/A',
        PredictionType: entry.predictionType,
        DateTime: entry.dateTime,
        Result: entry.result,
        InputDetails: entry.features || {},
      };
    });

    const blob = new Blob([JSON.stringify(reportContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prediction_report_history.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPdfReport = () => {
    if (history.length === 0) {
      alert('No history to download.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Prediction Report History', 14, 20);

    const firstEntry = history[0];
    const name = firstEntry.features?.patientName || 'N/A';
    const email = firstEntry.features?.email || 'N/A';
    const age = firstEntry.features?.age || 'N/A';

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 14, 30);
    doc.text(`Email: ${email}`, 14, 36);
    doc.text(`Age: ${age}`, 14, 42);

    const tableData = history.map((entry, index) => [
      index + 1,
      entry.predictionType,
      entry.dateTime,
      entry.result,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
      body: tableData,
      styles: { fontSize: 10 },
    });

    doc.save('prediction_report_history.pdf');
  };

  return (
    <div className="history-container">
      <h2>Prediction History</h2>

      <div className="button-group">
        <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
        <button className="download-report-btn" onClick={downloadJsonReport}>Download JSON Report</button>
        <button className="download-report-btn" onClick={downloadPdfReport}>Download PDF Report</button>
      </div>

      {history.length === 0 ? (
        <p>No prediction history found.</p>
      ) : (
        <>
          <div className="graph-container">
            <h3>Risk Status Over Time (0 = Low Risk, 1 = High Risk)</h3>
            <Line
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Risk Status Over Time',
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                  legend: {
                    display: true,
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date & Time',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Risk (0 = Low, 1 = High)',
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>

          <table className="history-table">
            <thead>
              <tr>
                <th>Prediction Type</th>
                <th>Date & Time</th>
                <th>Result</th>
                <th>Input Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className={`prediction-type ${entry.predictionType.replace(/\s/g, '-')}`}>
                    {entry.predictionType}
                  </td>
                  <td>{entry.dateTime}</td>
                  <td>{entry.result}</td>
                  <td>
                    <details>
                      <summary>View Input Details</summary>
                      <pre>{JSON.stringify(entry.features, null, 2)}</pre>
                    </details>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteRecord(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default History;





