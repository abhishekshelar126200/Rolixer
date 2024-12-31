import { useState, useRef } from "react";
import TransactionTable from "./components/TransactionTable.jsx";
import TransactionStatistic from "./components/TransactionStatistic.jsx";
import Chart from "./components/PieChart.jsx";
import BarChart from "./components/BarChart.jsx";
import Navbar from './components/Navbar.jsx';

function App() {
  const [currMonth, setMonth] = useState(3);

  // Create refs for each section
  const tableRef = useRef(null);
  const statisticRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const scrollToSection = (ref) => {
      ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const updateMonth = (month) => {
    setMonth(month);
    localStorage.setItem("month",month);
  };

  // Scroll to the respective section
 

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      {/* Header */}
      <Navbar tableRef={tableRef} statisticRef={statisticRef} barChartRef={barChartRef} pieChartRef={pieChartRef} scrollToSection={scrollToSection}/>

      {/* Main Content */}
      <main
        className="d-flex flex-column flex-grow-1 gap-3 p-3"
        style={{ backgroundColor: "#f4f6f8" }}
      >
        {/* Transaction Table */}
        <div ref={tableRef} className="bg-white rounded shadow-sm p-2">
          <TransactionTable updateMonth={updateMonth} />
        </div>

        {/* Transaction Statistics */}
        <div ref={statisticRef} className="bg-white rounded shadow-sm p-3">
          <TransactionStatistic currMonth={localStorage.getItem('month') || 3} />
        </div>

        {/* Bar Chart Section */}
        <div ref={barChartRef} className="row g-3">
          <div className="col-12">
            <div className="bg-white rounded shadow-sm p-3">
              <h5 className="text-center">Bar Chart</h5>
              <div className="border">
                <BarChart currMonth={localStorage.getItem('month') || 3} />
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div ref={pieChartRef} className="row g-3 mt-3">
          <div className="col-12">
            <div className="bg-white rounded shadow-sm p-3">
              <h5 className="text-center">Pie Chart</h5>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "450px" }}
              >
                <Chart currMonth={localStorage.getItem('month') || 3} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
