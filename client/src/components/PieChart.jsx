// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const Chart = ({ currMonth }) => {
//   const [circle, setPieChart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const months = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December",
//   ];
//   // Fetch data from the API
//   const fetchPieChartData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         `http://localhost:5000/transactionPieChart/${currMonth}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       setPieChart(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPieChartData();
//   }, [currMonth]);

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <p>Loading chart data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ textAlign: "center", margin: "20px auto" }}>
//       <h5 style={{ marginBottom: "20px", color: "#333" }}>
//         Item-Category Chart for {months[currMonth-1]}
//       </h5>
//       <PieChart width={400} height={400}>
//         <Pie
//           data={circle}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={150}
//           fill="#8884d8"
//           label
//         >
//           {circle.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default Chart;



// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const Chart = ({ currMonth }) => {
//   const [circle, setPieChart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];

//   // Fetch data from the API
//   const fetchPieChartData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         `http://localhost:5000/transactionPieChart/${currMonth}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       setPieChart(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPieChartData();
//   }, [currMonth]);

//   if (loading) {
//     return (
//       <div className="text-center mt-3">
//         <p>Loading chart data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-danger mt-3">
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container text-center my-4">
//       <h5 className=" text-dark">
//         Item-Category Chart for {months[currMonth - 1]}
//       </h5>
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-8 col-lg-6">
//           <PieChart width={400} height={400}>
//             <Pie
//               data={circle}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius="70%"
//               fill="#8884d8"
//               label
//             >
//               {circle.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chart;


import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Chart = ({ currMonth }) => {
  const [circle, setPieChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Fetch data from the API
  const fetchPieChartData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/transactionPieChart/${currMonth}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPieChart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPieChartData();
  }, [currMonth]);

  if (loading) {
    return (
      <div className="text-center mt-3">
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger mt-3">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container text-center">
      <h5 className="text-dark">
        Item-Category Chart for {months[currMonth - 1]}
      </h5>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={circle}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                fill="#8884d8"
                label
              >
                {circle.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;
