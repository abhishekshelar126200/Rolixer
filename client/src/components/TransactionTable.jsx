

import { useState, useEffect } from "react";

function TransactionTable({ updateMonth }) {
  const [selectedMonth, setMonth] = useState(localStorage.getItem('month') || 3);
  const [query, setQuery] = useState(localStorage.getItem('query') || "");
  const [page, setPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setData([]);
    setCurrPage(1);
  };

  const incrementPage = () => {
    if (currPage >= page) {
      setCurrPage(1);
    } else {
      setCurrPage((prev) => prev + 1);
    }
  };

  const decrementPage = () => {
    if (currPage === 1) {
      setCurrPage(page);
    } else {
      setCurrPage((prev) => prev - 1);
    }
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
    localStorage.setItem('query',event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTable = await fetch(
          `http://localhost:5000/transactionTable/${selectedMonth}?q=${query}`
        );
        if (!responseTable.ok) {
          throw new Error("Network response was not ok");
        }
        const resultTable = await responseTable.json();
        setData(resultTable);
        setPages(resultTable.length);
        updateMonth(selectedMonth);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, query]);

  return (
    <>
      <div className="vh-100 container-fluid p-3">
        <div className="row mb-3">
          {/* Search Input */}
          <div className="col-12 col-md-6 mb-2">
            <input
              className="form-control"
              type="search"
              onChange={handleQuery}
              value={query}
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          {/* Month Selector */}
          <div className="col-12 col-md-6">
            <select
              onChange={handleMonthChange}
              value={selectedMonth}
              className="form-select"
              aria-label="Select Month"
            >
              <option value="" disabled>
                Select Month
              </option>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Carousel for Pagination */}
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            {/* Page Number */}
            <div>
              <span>Page No: </span>
              <span className="border p-2 px-3">{currPage}</span>
              <span className="p-2 px-3">/</span>
              <span className="border p-2 px-3">{page}</span>
            </div>

            {/* Navigation Buttons */}
            <div>
              <button
                onClick={decrementPage}
                className="btn btn-primary m-2"
                type="button"
              >
                Previous
              </button>
              <button
                onClick={incrementPage}
                className="btn btn-primary m-2"
                type="button"
              >
                Next
              </button>
            </div>

            {/* Items Per Page */}
            <div>
              <span>Per Page: </span>
              <span>5</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-12">
            {data && data.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Image</th>
                      <th scope="col">Sold</th>
                      <th scope="col">Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[currPage - 1].map((product) => (
                      <tr key={product.id}>
                        <td className="border">{product.id}</td>
                        <td className="border">{product.title}</td>
                        <td className="border">{product.price}</td>
                        <td
                          className="border text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {product.description}
                        </td>
                        <td className="border">{product.category}</td>
                        <td className="border">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="img-fluid"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td className="border">{product.sold ? "Yes" : "No"}</td>
                        <td className="border">{product.dateOfSale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h2>Record Not Found</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionTable;

