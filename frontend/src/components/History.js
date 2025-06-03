
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import './History.css';

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

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [heartGraphData, setHeartGraphData] = useState({});
//   const [strokeGraphData, setStrokeGraphData] = useState({});

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const storedEmail = localStorage.getItem('email'); // Get the logged-in user's email

//       if (!storedEmail) {
//         setMessage('⚠ No logged-in user found.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch heart predictions
//         const heartResponse = await fetch(`http://localhost:5002/api/history?email=${storedEmail}`);
//         const heartData = heartResponse.ok ? await heartResponse.json() : [];

//         // Fetch stroke predictions
//         const strokeResponse = await fetch(`http://localhost:5002/api/save?email=${storedEmail}`);
//         const strokeData = strokeResponse.ok ? await strokeResponse.json() : [];

//         // Combine and sort by date (descending)
//         const combinedData = [...heartData, ...strokeData].sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );

//         if (combinedData.length === 0) {
//           setMessage('No prediction history found.');
//         }

//         setHistory(combinedData);
//         updateGraphData(combinedData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching history:', err);
//         setMessage('Error fetching history, please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const updateGraphData = (data) => {
//     const heartDates = [];
//     const heartData = [];

//     const strokeDates = [];
//     const strokeData = [];

//     data.forEach(entry => {
//       const formattedDate = new Date(entry.dateTime).toLocaleString();

//       if (entry.predictionType === 'Heart Disease') {
//         heartDates.push(formattedDate);
//         heartData.push(entry.riskPercentage >= 50 ? 1 : 0);
//       }

//       if (entry.predictionType === 'Stroke Prediction' || entry.predictionType === 'Brain Stroke') {
//         strokeDates.push(formattedDate);
//         strokeData.push(entry.result === 'High Stroke Risk' || entry.result === 'Yes' ? 1 : 0);
//       }
//     });

//     setHeartGraphData({
//       labels: heartDates,
//       datasets: [
//         {
//           label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
//           data: heartData,
//           borderColor: 'rgba(255, 0, 0, 1)',
//           backgroundColor: 'rgba(255, 0, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });

//     setStrokeGraphData({
//       labels: strokeDates,
//       datasets: [
//         {
//           label: 'Stroke Prediction (1 = High Risk, 0 = Low Risk)',
//           data: strokeData,
//           borderColor: 'rgba(0, 0, 255, 1)',
//           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });
//   };

//   const downloadJsonReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const reportContent = history.map((entry, index) => ({
//       Record: index + 1,
//       Name: entry.features?.patientName || 'N/A',
//       Email: entry.features?.email || 'N/A',
//       Age: entry.features?.age || 'N/A',
//       ContactNumber: entry.features?.contactNumber || 'N/A',
//       PredictionType: entry.predictionType,
//       DateTime: entry.dateTime,
//       Result: entry.result,
//       InputDetails: entry.features || {},
//     }));

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
//       new Date(entry.dateTime).toLocaleString(),
//       entry.result,
//     ]);

//     autoTable(doc, {
//       startY: 50,
//       head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
//       body: tableData,
//       styles: { fontSize: 10 },
//     });

//     doc.save('prediction_report_history.pdf');
//   };

//   if (loading) {
//     return <p>Loading history...</p>;
//   }

//   if (message) {
//     return <p>{message}</p>;
//   }

//   return (
//     <div className="history-container">
//       <h2>Your Prediction History</h2>

//       <div className="button-group">
//         <button className="download-report-btn" onClick={downloadJsonReport}>Download JSON Report</button>
//         <button className="download-report-btn" onClick={downloadPdfReport}>Download PDF Report</button>
//       </div>

//       {history.length === 0 ? (
//         <p>No prediction history found.</p>
//       ) : (
//         <>
//           <div className="graph-container">
//             <h3>Heart Disease Risk Over Time (0 = Low Risk, 1 = High Risk)</h3>
//             <Line
//               data={heartGraphData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Heart Disease Risk Over Time',
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

//           <div className="graph-container">
//             <h3>Stroke Prediction Risk Over Time (0 = Low Risk, 1 = High Risk)</h3>
//             <Line
//               data={strokeGraphData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Stroke Prediction Risk Over Time',
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
//                 <th>Risk %</th>
//                 <th>Input Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.predictionType}</td>
//                   <td>{new Date(entry.dateTime).toLocaleString()}</td>
//                   <td>{entry.result}</td>
//                   <td>{entry.riskPercentage !== undefined ? `${entry.riskPercentage}%` : 'N/A'}</td>
//                   <td>
//                     <details>
//                       <summary>View Input Details</summary>
//                       <pre>{JSON.stringify(entry.features, null, 2)}</pre>
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
// }

// export default History;










// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import './History.css';

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

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [heartGraphData, setHeartGraphData] = useState({});
//   const [strokeGraphData, setStrokeGraphData] = useState({});
//   const [ecgGraphData, setEcgGraphData] = useState({});

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const storedEmail = localStorage.getItem('email');

//       if (!storedEmail) {
//         setMessage('⚠ No logged-in user found.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Heart history: existing endpoint (assuming query param works)
//         const heartResponse = await fetch(`http://localhost:5002/api/history?email=${storedEmail}`);
//         const heartData = heartResponse.ok ? await heartResponse.json() : [];

//         // Stroke history: existing endpoint (assuming it returns array)
//         const strokeResponse = await fetch(`http://localhost:5002/api/save?email=${storedEmail}`);
//         const strokeData = strokeResponse.ok ? await strokeResponse.json() : [];

//         // ECG history: from ecgRoutes GET /history/:email
//         const ecgResponse = await fetch(`http://localhost:5002/api/history/${storedEmail}`);
//         // Based on your ecgRoutes.js, response shape is { success, history }
//         const ecgDataJson = await ecgResponse.json();
//         const ecgData = ecgResponse.ok && ecgDataJson.success ? ecgDataJson.history : [];

//         // Normalize ECG entries to match combined data format
//         // Assuming ECG data fields: patientName, email, age, contactNumber, prediction_label, confidence, date/time (createdAt)
//         // Add fields predictionType, result, features, dateTime for uniformity
//         const ecgNormalized = ecgData.map((entry) => ({
//           predictionType: 'ECG Prediction',
//           result: `${entry.prediction_label} (Confidence: ${(entry.confidence * 100).toFixed(2)}%)`,
//           features: {
//             patientName: entry.patientName,
//             email: entry.email,
//             age: entry.age,
//             contactNumber: entry.contactNumber,
//           },
//           dateTime: entry.createdAt || entry.dateTime || new Date().toISOString(), // fallback if date missing
//         }));

//         // Combine all histories
//         const combinedData = [...heartData, ...strokeData, ...ecgNormalized].sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );

//         if (combinedData.length === 0) {
//           setMessage('No prediction history found.');
//         }

//         setHistory(combinedData);
//         updateGraphData(combinedData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching history:', err);
//         setMessage('Error fetching history, please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const updateGraphData = (data) => {
//     const heartDates = [];
//     const heartData = [];

//     const strokeDates = [];
//     const strokeData = [];

//     const ecgDates = [];
//     const ecgDataValues = [];

//     data.forEach((entry) => {
//       const formattedDate = new Date(entry.dateTime).toLocaleString();

//       if (entry.predictionType === 'Heart Disease') {
//         heartDates.push(formattedDate);
//         heartData.push(entry.riskPercentage >= 50 ? 1 : 0);
//       }

//       if (entry.predictionType === 'Stroke Prediction' || entry.predictionType === 'Brain Stroke') {
//         strokeDates.push(formattedDate);
//         strokeData.push(entry.result === 'High Stroke Risk' || entry.result === 'Yes' ? 1 : 0);
//       }

//       if (entry.predictionType === 'ECG Prediction') {
//         ecgDates.push(formattedDate);
//         // For ECG, let's assume confidence > 0.7 means high risk (1), else 0
//         const confidenceMatch = entry.result.match(/Confidence: ([\d.]+)%/);
//         const confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) / 100 : 0;
//         ecgDataValues.push(confidence >= 0.7 ? 1 : 0);
//       }
//     });

//     setHeartGraphData({
//       labels: heartDates,
//       datasets: [
//         {
//           label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
//           data: heartData,
//           borderColor: 'rgba(255, 0, 0, 1)',
//           backgroundColor: 'rgba(255, 0, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });

//     setStrokeGraphData({
//       labels: strokeDates,
//       datasets: [
//         {
//           label: 'Stroke Prediction (1 = High Risk, 0 = Low Risk)',
//           data: strokeData,
//           borderColor: 'rgba(0, 0, 255, 1)',
//           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });

//     setEcgGraphData({
//       labels: ecgDates,
//       datasets: [
//         {
//           label: 'ECG Prediction Confidence (1 = High Risk, 0 = Low Risk)',
//           data: ecgDataValues,
//           borderColor: 'rgba(0, 128, 0, 1)',
//           backgroundColor: 'rgba(0, 128, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });
//   };

//   const downloadJsonReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const reportContent = history.map((entry, index) => ({
//       Record: index + 1,
//       Name: entry.features?.patientName || 'N/A',
//       Email: entry.features?.email || 'N/A',
//       Age: entry.features?.age || 'N/A',
//       ContactNumber: entry.features?.contactNumber || 'N/A',
//       PredictionType: entry.predictionType,
//       DateTime: entry.dateTime,
//       Result: entry.result,
//       InputDetails: entry.features || {},
//     }));

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

//     const name = localStorage.getItem('name') || 'N/A';
//     const email = localStorage.getItem('email') || 'N/A';

//     const firstEntry = history[0];
//     const age = firstEntry.features?.age || 'N/A';

//     doc.setFontSize(12);
//     doc.text(`Name: ${name}`, 14, 30);
//     doc.text(`Email: ${email}`, 14, 36);
//     doc.text(`Age: ${age}`, 14, 42);

//     const tableData = history.map((entry, index) => [
//       index + 1,
//       entry.predictionType,
//       new Date(entry.dateTime).toLocaleString(),
//       entry.result,
//     ]);

//     autoTable(doc, {
//       startY: 50,
//       head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
//       body: tableData,
//       styles: { fontSize: 10 },
//     });

//     doc.save('prediction_report_history.pdf');
//   };

//   if (loading) {
//     return <p>Loading history...</p>;
//   }

//   if (message) {
//     return <p>{message}</p>;
//   }

//   return (
//     <div className="history-container">
//       <h2>Your Prediction History</h2>

//       <div className="button-group">
//         <button className="download-report-btn" onClick={downloadJsonReport}>
//           Download JSON Report
//         </button>
//         <button className="download-report-btn" onClick={downloadPdfReport}>
//           Download PDF Report
//         </button>
//       </div>

//       {history.length === 0 ? (
//         <p>No prediction history to display.</p>
//       ) : (
//         <>
//           <table className="history-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Prediction Type</th>
//                 <th>Date & Time</th>
//                 <th>Result</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{entry.predictionType}</td>
//                   <td>{new Date(entry.dateTime).toLocaleString()}</td>
//                   <td>{entry.result}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="graph-container">
//             {heartGraphData.labels && heartGraphData.labels.length > 0 && (
//               <>
//                 <h3>Heart Disease Risk History</h3>
//                 <Line
//                   data={heartGraphData}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: 'top' },
//                       title: { display: true, text: 'Heart Disease Risk Over Time' },
//                     },
//                     scales: {
//                       y: { min: 0, max: 1, ticks: { stepSize: 1 } },
//                     },
//                   }}
//                 />
//               </>
//             )}

//             {strokeGraphData.labels && strokeGraphData.labels.length > 0 && (
//               <>
//                 <h3>Stroke Prediction History</h3>
//                 <Line
//                   data={strokeGraphData}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: 'top' },
//                       title: { display: true, text: 'Stroke Prediction Over Time' },
//                     },
//                     scales: {
//                       y: { min: 0, max: 1, ticks: { stepSize: 1 } },
//                     },
//                   }}
//                 />
//               </>
//             )}

//             {ecgGraphData.labels && ecgGraphData.labels.length > 0 && (
//               <>
//                 <h3>ECG Prediction History</h3>
//                 <Line
//                   data={ecgGraphData}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: 'top' },
//                       title: { display: true, text: 'ECG Prediction Over Time' },
//                     },
//                     scales: {
//                       y: { min: 0, max: 1, ticks: { stepSize: 1 } },
//                     },
//                   }}
//                 />
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default History;








// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import './History.css';

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

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [heartGraphData, setHeartGraphData] = useState({});
//   const [strokeGraphData, setStrokeGraphData] = useState({});

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const storedEmail = localStorage.getItem('email');

//       if (!storedEmail) {
//         setMessage('⚠ No logged-in user found.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const heartResponse = await fetch(`http://localhost:5002/api/history?email=${storedEmail}`);
//         const heartData = heartResponse.ok ? await heartResponse.json() : [];

//         const strokeResponse = await fetch(`http://localhost:5002/api/save?email=${storedEmail}`);
//         const strokeData = strokeResponse.ok ? await strokeResponse.json() : [];

//         const combinedData = [...heartData, ...strokeData].sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );

//         if (combinedData.length === 0) {
//           setMessage('No prediction history found.');
//         }

//         setHistory(combinedData);
//         updateGraphData(combinedData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching history:', err);
//         setMessage('Error fetching history, please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const updateGraphData = (data) => {
//     const heartDates = [];
//     const heartData = [];

//     const strokeDates = [];
//     const strokeData = [];

//     data.forEach(entry => {
//       const formattedDate = new Date(entry.dateTime).toLocaleString();

//       if (entry.predictionType === 'Heart Disease') {
//         heartDates.push(formattedDate);
//         heartData.push(entry.riskPercentage >= 50 ? 1 : 0);
//       }

//       if (entry.predictionType === 'Stroke Prediction' || entry.predictionType === 'Brain Stroke') {
//         strokeDates.push(formattedDate);
//         strokeData.push(entry.result === 'High Stroke Risk' || entry.result === 'Yes' ? 1 : 0);
//       }
//     });

//     setHeartGraphData({
//       labels: heartDates,
//       datasets: [
//         {
//           label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
//           data: heartData,
//           borderColor: 'rgba(255, 0, 0, 1)',
//           backgroundColor: 'rgba(255, 0, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });

//     setStrokeGraphData({
//       labels: strokeDates,
//       datasets: [
//         {
//           label: 'Stroke Prediction (1 = High Risk, 0 = Low Risk)',
//           data: strokeData,
//           borderColor: 'rgba(0, 0, 255, 1)',
//           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });
//   };

//   const downloadJsonReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const reportContent = history.map((entry, index) => ({
//       Record: index + 1,
//       Name: entry.features?.patientName || 'N/A',
//       Email: entry.features?.email || 'N/A',
//       Age: entry.features?.age || 'N/A',
//       ContactNumber: entry.features?.contactNumber || 'N/A',
//       PredictionType: entry.predictionType,
//       DateTime: entry.dateTime,
//       Result: entry.result,
//       InputDetails: entry.features || {},
//     }));

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

//     const firstEntry = history[0];
//     // const name = firstEntry.features?.patientName || 'N/A';
//     // const email = firstEntry.features?.email || 'N/A';
//     const name = localStorage.getItem('name') || 'N/A';
// const email = localStorage.getItem('email') || 'N/A';

//     const age = firstEntry.features?.age || 'N/A';

//     doc.setFontSize(12);
//     doc.text(`Name: ${name}`, 14, 30);
//     doc.text(`Email: ${email}`, 14, 36);
//     doc.text(`Age: ${age}`, 14, 42);

//     const tableData = history.map((entry, index) => [
//       index + 1,
//       entry.predictionType,
//       new Date(entry.dateTime).toLocaleString(),
//       entry.result,
//     ]);

//     autoTable(doc, {
//       startY: 50,
//       head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
//       body: tableData,
//       styles: { fontSize: 10 },
//     });

//     doc.save('prediction_report_history.pdf');
//   };

//   if (loading) {
//     return <p>Loading history...</p>;
//   }

//   if (message) {
//     return <p>{message}</p>;
//   }

//   return (
//     <div className="history-container">
//       <h2>Your Prediction History</h2>

//       <div className="button-group">
//         <button className="download-report-btn" onClick={downloadJsonReport}>Download JSON Report</button>
//         <button className="download-report-btn" onClick={downloadPdfReport}>Download PDF Report</button>
//       </div>

//       {history.length === 0 ? (
//         <p>No prediction history found.</p>
//       ) : (
//         <div className="content-layout">
//           <div className="table-section">
//             <table className="history-table">
//               <thead>
//                 <tr>
//                   <th>Prediction Type</th>
//                   <th>Date & Time</th>
//                   <th>Result</th>
//                   <th>Input Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, index) => (
//                   <tr key={index}>
//                     <td>{entry.predictionType}</td>
//                     <td>{new Date(entry.dateTime).toLocaleString()}</td>
//                     <td>{entry.result}</td>
//                     <td>
//                       <details>
//                         <summary>View Input Details</summary>
//                         <pre>{JSON.stringify(entry.features, null, 2)}</pre>
//                       </details>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="graphs-section">
//             <div className="graph-container">
//               <h3>Heart Disease Risk Over Time</h3>
//               <Line data={heartGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </div>

//             <div className="graph-container">
//               <h3>Stroke Prediction Risk Over Time</h3>
//               <Line data={strokeGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default History;






// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import './History.css';

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

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [heartGraphData, setHeartGraphData] = useState({});
//   const [strokeGraphData, setStrokeGraphData] = useState({});
//   const [userInfo, setUserInfo] = useState({});  // <-- New state for user info

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const storedEmail = localStorage.getItem('email');

//       if (!storedEmail) {
//         setMessage('⚠ No logged-in user found.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch user info
//         const userInfoResponse = await fetch(`http://localhost:5002/api/get-user-info?email=${storedEmail}`);
//         if (userInfoResponse.ok) {
//           const userInfoData = await userInfoResponse.json();
//           setUserInfo(userInfoData);
//         }

//         // Fetch history data for heart disease and stroke prediction
//         const heartResponse = await fetch(`http://localhost:5002/api/history?email=${storedEmail}`);
//         const heartData = heartResponse.ok ? await heartResponse.json() : [];

//         const strokeResponse = await fetch(`http://localhost:5002/api/save?email=${storedEmail}`);
//         const strokeData = strokeResponse.ok ? await strokeResponse.json() : [];

//         // Combine and sort by date descending
//         const combinedData = [...heartData, ...strokeData].sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );

//         if (combinedData.length === 0) {
//           setMessage('No prediction history found.');
//         }

//         setHistory(combinedData);
//         updateGraphData(combinedData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching history:', err);
//         setMessage('Error fetching history, please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const updateGraphData = (data) => {
//     const heartDates = [];
//     const heartData = [];

//     const strokeDates = [];
//     const strokeData = [];

//     data.forEach(entry => {
//       const formattedDate = new Date(entry.dateTime).toLocaleString();

//       if (entry.predictionType === 'Heart Disease') {
//         heartDates.push(formattedDate);
//         heartData.push(entry.riskPercentage >= 50 ? 1 : 0);
//       }

//       if (entry.predictionType === 'Stroke Prediction' || entry.predictionType === 'Brain Stroke') {
//         strokeDates.push(formattedDate);
//         strokeData.push(entry.result === 'High Stroke Risk' || entry.result === 'Yes' ? 1 : 0);
//       }
//     });

//     setHeartGraphData({
//       labels: heartDates,
//       datasets: [
//         {
//           label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
//           data: heartData,
//           borderColor: 'rgba(255, 0, 0, 1)',
//           backgroundColor: 'rgba(255, 0, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });

//     setStrokeGraphData({
//       labels: strokeDates,
//       datasets: [
//         {
//           label: 'Stroke Prediction (1 = High Risk, 0 = Low Risk)',
//           data: strokeData,
//           borderColor: 'rgba(0, 0, 255, 1)',
//           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });
//   };

//   const downloadJsonReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const report = {
//       userInfo,
//       reportData: history.map((entry, index) => ({
//         Record: index + 1,
//         PredictionType: entry.predictionType,
//         DateTime: entry.dateTime,
//         Result: entry.result,
//         InputDetails: entry.features || {},
//       })),
//     };

//     const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
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

//     const name = userInfo.name || 'N/A';
//     const email = userInfo.email || 'N/A';
//     const age = userInfo.age || 'N/A';
//     const contactNumber = userInfo.contactNumber || 'N/A';
//     const gender = userInfo.gender || 'N/A';

//     doc.setFontSize(12);
//     doc.text(`Name: ${name}`, 14, 30);
//     doc.text(`Email: ${email}`, 14, 36);
//     doc.text(`Age: ${age}`, 14, 42);
//     doc.text(`Contact: ${contactNumber}`, 14, 48);
//     doc.text(`Gender: ${gender}`, 14, 54);

//     const tableData = history.map((entry, index) => [
//       index + 1,
//       entry.predictionType,
//       new Date(entry.dateTime).toLocaleString(),
//       entry.result,
//     ]);

//     autoTable(doc, {
//       startY: 60,
//       head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
//       body: tableData,
//       styles: { fontSize: 10 },
//     });

//     doc.save('prediction_report_history.pdf');
//   };

//   if (loading) {
//     return <p>Loading history...</p>;
//   }

//   if (message) {
//     return <p>{message}</p>;
//   }

//   return (
//     <div className="history-container">
//       <h2>Your Prediction History</h2>

//       <div className="button-group">
//         <button className="download-report-btn" onClick={downloadJsonReport}>Download JSON Report</button>
//         <button className="download-report-btn" onClick={downloadPdfReport}>Download PDF Report</button>
//       </div>

//       {history.length === 0 ? (
//         <p>No prediction history found.</p>
//       ) : (
//         <div className="content-layout">
//           <div className="table-section">
//             <table className="history-table">
//               <thead>
//                 <tr>
//                   <th>Prediction Type</th>
//                   <th>Date & Time</th>
//                   <th>Result</th>
//                   <th>Input Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, index) => (
//                   <tr key={index}>
//                     <td>{entry.predictionType}</td>
//                     <td>{new Date(entry.dateTime).toLocaleString()}</td>
//                     <td>{entry.result}</td>
//                     <td>
//                       <details>
//                         <summary>View Input Details</summary>
//                         <pre>{JSON.stringify(entry.features, null, 2)}</pre>
//                       </details>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="graphs-section">
//             <div className="graph-container">
//               <h3>Heart Disease Risk Over Time</h3>
//               <Line data={heartGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </div>

//             <div className="graph-container">
//               <h3>Stroke Prediction Risk Over Time</h3>
//               <Line data={strokeGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default History;





// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import './History.css';

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

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [heartGraphData, setHeartGraphData] = useState({});
//   const [strokeGraphData, setStrokeGraphData] = useState({});
//   const [userInfo, setUserInfo] = useState({});

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const storedEmail = localStorage.getItem('email');

//       if (!storedEmail) {
//         setMessage('⚠ No logged-in user found.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch user info
//        const userInfoResponse = await fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`);

//         if (userInfoResponse.ok) {
//           const userInfoData = await userInfoResponse.json();
//           setUserInfo(userInfoData);
//         }

//         // Fetch history
//         const heartResponse = await fetch(`http://localhost:5002/api/history?email=${storedEmail}`);
//         const heartData = heartResponse.ok ? await heartResponse.json() : [];

//         const strokeResponse = await fetch(`http://localhost:5002/api/save?email=${storedEmail}`);
//         const strokeData = strokeResponse.ok ? await strokeResponse.json() : [];

//         const combinedData = [...heartData, ...strokeData].sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );

//         if (combinedData.length === 0) {
//           setMessage('No prediction history found.');
//         }

//         setHistory(combinedData);
//         updateGraphData(combinedData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching history:', err);
//         setMessage('Error fetching history, please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const updateGraphData = (data) => {
//     const heartDates = [];
//     const heartData = [];
//     const strokeDates = [];
//     const strokeData = [];

//     data.forEach(entry => {
//       const formattedDate = new Date(entry.dateTime).toLocaleString();

//       if (entry.predictionType === 'Heart Disease') {
//         heartDates.push(formattedDate);
//         heartData.push(entry.riskPercentage >= 50 ? 1 : 0);
//       }

//       if (entry.predictionType === 'Stroke Prediction' || entry.predictionType === 'Brain Stroke') {
//         strokeDates.push(formattedDate);
//         strokeData.push(entry.result === 'High Stroke Risk' || entry.result === 'Yes' ? 1 : 0);
//       }
//     });

//     setHeartGraphData({
//       labels: heartDates,
//       datasets: [
//         {
//           label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
//           data: heartData,
//           borderColor: 'rgba(255, 0, 0, 1)',
//           backgroundColor: 'rgba(255, 0, 0, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });

//     setStrokeGraphData({
//       labels: strokeDates,
//       datasets: [
//         {
//           label: 'Stroke Prediction (1 = High Risk, 0 = Low Risk)',
//           data: strokeData,
//           borderColor: 'rgba(0, 0, 255, 1)',
//           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//           fill: false,
//           tension: 0.4,
//           spanGaps: true,
//         },
//       ],
//     });
//   };

//   const downloadJsonReport = () => {
//     if (history.length === 0) {
//       alert('No history to download.');
//       return;
//     }

//     const report = {
//       userInfo,
//       reportData: history.map((entry, index) => ({
//         Record: index + 1,
//         PredictionType: entry.predictionType,
//         DateTime: entry.dateTime,
//         Result: entry.result,
//         InputDetails: entry.features || {},
//       })),
//     };

//     const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
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

//     const { name = 'N/A', email = 'N/A', age = 'N/A', contactNumber = 'N/A', gender = 'N/A' } = userInfo;

//     doc.setFontSize(12);
//     doc.text(`Name: ${name}`, 14, 30);
//     doc.text(`Email: ${email}`, 14, 36);
//     doc.text(`Age: ${age}`, 14, 42);
//     doc.text(`Contact: ${contactNumber}`, 14, 48);
//     doc.text(`Gender: ${gender}`, 14, 54);

//     const tableData = history.map((entry, index) => [
//       index + 1,
//       entry.predictionType,
//       new Date(entry.dateTime).toLocaleString(),
//       entry.result,
//     ]);

//     autoTable(doc, {
//       startY: 60,
//       head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
//       body: tableData,
//       styles: { fontSize: 10 },
//     });

//     doc.save('prediction_report_history.pdf');
//   };

//   if (loading) return <p>Loading history...</p>;
//   if (message) return <p>{message}</p>;

//   return (
//     <div className="history-container">
//       <h2>Your Prediction History</h2>

//       <div className="button-group">
//         <button className="download-report-btn" onClick={downloadJsonReport}>Download JSON Report</button>
//         <button className="download-report-btn" onClick={downloadPdfReport}>Download PDF Report</button>
//       </div>

//       {history.length === 0 ? (
//         <p>No prediction history found.</p>
//       ) : (
//         <div className="content-layout">
//           <div className="table-section">
//             <table className="history-table">
//               <thead>
//                 <tr>
//                   <th>Prediction Type</th>
//                   <th>Date & Time</th>
//                   <th>Result</th>
//                   <th>Input Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((entry, index) => (
//                   <tr key={index}>
//                     <td>{entry.predictionType}</td>
//                     <td>{new Date(entry.dateTime).toLocaleString()}</td>
//                     <td>{entry.result}</td>
//                     <td>
//                       <details>
//                         <summary>View Input Details</summary>
//                         <pre>{JSON.stringify(entry.features, null, 2)}</pre>
//                       </details>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="graphs-section">
//             <div className="graph-container">
//               <h3>Heart Disease Risk Over Time</h3>
//               <Line data={heartGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </div>

//             <div className="graph-container">
//               <h3>Stroke Prediction Risk Over Time</h3>
//               <Line data={strokeGraphData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default History;






import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './History.css';

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [heartGraphData, setHeartGraphData] = useState({});
  const [strokeGraphData, setStrokeGraphData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      const storedEmail = localStorage.getItem('email');

      if (!storedEmail) {
        setMessage('⚠ No logged-in user found.');
        setLoading(false);
        return;
      }

      try {
        // Fetch user info
        const userInfoResponse = await fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`);
        if (userInfoResponse.ok) {
          const userInfoData = await userInfoResponse.json();
         setUserInfo(userInfoData.user); 
        }

        // Fetch prediction histories
        const heartResponse = await fetch(`http://localhost:5002/api/history?email=${storedEmail}`);
        const heartData = heartResponse.ok ? await heartResponse.json() : [];

        const strokeResponse = await fetch(`http://localhost:5002/api/save?email=${storedEmail}`);
        const strokeData = strokeResponse.ok ? await strokeResponse.json() : [];

        // Combine and sort descending by dateTime
        const combinedData = [...heartData, ...strokeData].sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );

        if (combinedData.length === 0) {
          setMessage('No prediction history found.');
        } else {
          setMessage('');
        }

        setHistory(combinedData);
        updateGraphData(combinedData);
      } catch (err) {
        console.error('Error fetching history:', err);
        setMessage('Error fetching history, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Update chart data for heart and stroke predictions
  const updateGraphData = (data) => {
    const heartDates = [];
    const heartData = [];
    const strokeDates = [];
    const strokeData = [];

    data.forEach((entry) => {
      // Use short date format for chart labels to prevent overlap
      const dateObj = new Date(entry.dateTime);
      const formattedDate = dateObj.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      if (entry.predictionType === 'Heart Disease') {
        heartDates.push(formattedDate);
        heartData.push(entry.riskPercentage >= 50 ? 1 : 0);
      }

      if (entry.predictionType === 'Stroke Prediction' || entry.predictionType === 'Brain Stroke') {
        strokeDates.push(formattedDate);
        strokeData.push(entry.result === 'High Stroke Risk' || entry.result === 'Yes' ? 1 : 0);
      }
    });

    setHeartGraphData({
      labels: heartDates,
      datasets: [
        {
          label: 'Heart Disease (1 = High Risk, 0 = Low Risk)',
          data: heartData,
          borderColor: 'rgba(255, 0, 0, 1)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: false,
          tension: 0.4,
          spanGaps: true,
        },
      ],
    });

    setStrokeGraphData({
      labels: strokeDates,
      datasets: [
        {
          label: 'Stroke Prediction (1 = High Risk, 0 = Low Risk)',
          data: strokeData,
          borderColor: 'rgba(0, 0, 255, 1)',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: false,
          tension: 0.4,
          spanGaps: true,
        },
      ],
    });
  };

  // Download JSON report with user info and history
  const downloadJsonReport = useCallback(() => {
    if (history.length === 0) {
      alert('No history to download.');
      return;
    }

    const report = {
      userInfo,
      reportData: history.map((entry, index) => ({
        Record: index + 1,
        PredictionType: entry.predictionType,
        DateTime: entry.dateTime,
        Result: entry.result,
        InputDetails: entry.features || {},
      })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prediction_report_history.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [history, userInfo]);

  // Download PDF report with user info and history table
  const downloadPdfReport = useCallback(() => {
    if (history.length === 0) {
      alert('No history to download.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Prediction Report History', 14, 20);

    const {
      name = 'N/A',
      email = 'N/A',
      age = 'N/A',
      phoneNumber = 'N/A',
      address ='N/A',
    } = userInfo;

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 14, 30);
    doc.text(`Email: ${email}`, 14, 36);
    doc.text(`Age: ${age}`, 14, 42);
    doc.text(`Contact Number: ${phoneNumber}`, 14, 48);
    doc.text(`Address: ${address}`, 14, 54);

    const tableData = history.map((entry, index) => [
      index + 1,
      entry.predictionType,
      new Date(entry.dateTime).toLocaleString(),
      entry.result,
    ]);

    autoTable(doc, {
      startY: 60,
      head: [['#', 'Prediction Type', 'Date & Time', 'Result']],
      body: tableData,
      styles: { fontSize: 10 },
    });

    doc.save('prediction_report_history.pdf');
  }, [history, userInfo]);

  if (loading) return <p>Loading history...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div className="history-container">
      <h2>Your Prediction History</h2>

      <div className="button-group">
        {/* <button className="download-report-btn" onClick={downloadJsonReport}>
          Download JSON Report
        </button> */}
        <button className="download-report-btn" onClick={downloadPdfReport}>
          Download PDF Report
        </button>
      </div>

      {history.length === 0 ? (
        <p>No prediction history found.</p>
      ) : (
        <div className="content-layout">
          <div className="table-section">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Prediction Type</th>
                  <th>Date & Time</th>
                  <th>Result</th>
                  <th>Input Details</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.predictionType}</td>
                    <td>{new Date(entry.dateTime).toLocaleString()}</td>
                    <td>{entry.result}</td>
                    <td>
                      <details>
                        <summary>View Input Details</summary>
                        <ul style={{ paddingLeft: '20px' }}>
                          {entry.features &&
                            Object.entries(entry.features).map(([key, value], i) => (
                              <li key={i}>
                                <strong>{key.replaceAll('_', ' ')}:</strong> {value === 1 ? 'Yes' : value === 0 ? 'No' : value}
                              </li>
                            ))}
                        </ul>

                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="graphs-section">
            <div className="graph-container">
              <h3>Heart Disease Risk Over Time</h3>
              <Line
                data={heartGraphData}
                options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
              />
            </div>

            <div className="graph-container">
              <h3>Stroke Prediction Risk Over Time</h3>
              <Line
                data={strokeGraphData}
                options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
