

import { useState, useEffect } from 'react';

function TransactionStatistic({ currMonth }) {
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
    const [statistic, setStatistic] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStatistic = await fetch(`http://localhost:5000/transactionStatistic/${currMonth}`);
                if (!responseStatistic.ok) {
                    throw new Error('Network response was not ok');
                }
                const resultStatistic = await responseStatistic.json();
                setStatistic(resultStatistic);
            } catch (error) {
                console.error("Error fetching transaction statistics:", error);
            }
        };

        fetchData();
    }, [currMonth]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
                <h4 className="text-center mb-4">Transaction Statistics for-{months[currMonth-1]}</h4>
                <div className="row mb-3">
                    <div className="col-6 text-start fw-bold">Total Sale:</div>
                    <div className="col-6 text-end">{statistic.sale ?? 'N/A'}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-6 text-start fw-bold">Total Sold Items:</div>
                    <div className="col-6 text-end">{statistic.sold ?? 'N/A'}</div>
                </div>
                <div className="row">
                    <div className="col-6 text-start fw-bold">Total Not Sold Items:</div>
                    <div className="col-6 text-end">{statistic.notSold ?? 'N/A'}</div>
                </div>
            </div>
        </div>
    );
}

export default TransactionStatistic;
