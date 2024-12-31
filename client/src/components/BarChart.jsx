
// import React, { useEffect, useState } from "react";
// import { Bar} from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = ({ currMonth }) => {
//   const [labelsData, setLabelsData] = useState([]);
//   const months = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December",
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/transactionBarChart/${currMonth}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         setLabelsData(result); // Update state with the result
//       } catch (error) {
//         console.error("Error fetching data: ", error); // Log any error for better debugging
//       }
//     };

//     fetchData();
//   }, [currMonth]); // Fetch new data when the month changes

//   const data = {
//     labels: [
//       "0-100", "101-200", "201-300", "301-400", "401-500", "501-600", 
//       "601-700", "701-800", "801-900", "901-above",
//     ],
//     datasets: [
//       {
//         label: `Stats for ${months[currMonth - 1]}`,
//         data: labelsData, // Use the fetched data
//         backgroundColor: "#4BC0C0", // Customize bar color
//         borderWidth: 1,
//         borderRadius: 5,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // Hides the legend
//       },
//       title: {
//         display: true,
//         text: `Bar Chart Stats - ${months[currMonth - 1]}`,
//         font: {
//           size: 18,
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Price Ranges", // X-axis title text
//           font: {
//             size: 14,
//           },
//         },
//         ticks: {
//           font: {
//             size: 12,
//           },
//         },
//       },
//       y: {
//         title: {
//           display: true, // Enable y-axis title
//           text: "Frequency (Count)", // Y-axis title text
//           font: {
//             size: 14,
//           },
//         },
//         beginAtZero: true,
//         ticks: {
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="" style={{width:"100%"}}> {/* Set chart container to 50% width and height */}
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;


import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ currMonth }) => {
  const [labelsData, setLabelsData] = useState([]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/transactionBarChart/${currMonth}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setLabelsData(result); // Update state with the result
      } catch (error) {
        console.error("Error fetching data: ", error); // Log any error for better debugging
      }
    };

    fetchData();
  }, [currMonth]); // Fetch new data when the month changes

  const data = {
    labels: [
      "0-100", "101-200", "201-300", "301-400", "401-500", "501-600",
      "601-700", "701-800", "801-900", "901-above",
    ],
    datasets: [
      {
        label: `Stats for ${months[currMonth - 1]}`,
        data: labelsData, // Use the fetched data
        backgroundColor: "#4BC0C0", // Customize bar color
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      title: {
        display: true,
        text: `Bar Chart Stats - ${months[currMonth - 1]}`,
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price Ranges", // X-axis title text
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true, // Enable y-axis title
          text: "Frequency (Count)", // Y-axis title text
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-100 d-flex justify-content-center p-3">
      {/* Set the chart container with responsive Bootstrap classes */}
      <div className="bg-light rounded shadow-sm w-100" style={{ maxWidth: "700px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
