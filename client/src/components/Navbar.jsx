function Navbar({tableRef,statisticRef,barChartRef,pieChartRef,scrollToSection}){
    
    return (
        <header className="bg-success text-white shadow-sm sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              Transaction Dashboard
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={(e) =>{
                      e.preventDefault();
                      scrollToSection(tableRef);
                    }}
                  >
                    Transaction Table
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(statisticRef);
                    }}
                  >
                    Transaction Statistic
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(barChartRef)
                    }}
                  >
                    Bar Chart
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(pieChartRef)
                    }}
                  >
                    Pie Chart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
}


export default Navbar;
