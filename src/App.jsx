import Pagination from "./components/Pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./components/BarChart/BarChart";
import LineChart from "./components/LineChart/LineChart";
import PieChart from "./components/PieChart/PieChart"
import SummaryTable from "./components/SummaryData/SummaryTable";
import "bulma/css/bulma.min.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
  const [covidSummaryData, setCovidSummaryData] = useState([]);
  const countriesPerPageForBarChart = 5;
  const [pageNumberForBarChart, setpageNumberForBarChart] = useState(0);

  const [countryCovidData, setCountryCovidData] = useState([]);
  const datesPerPage = 15;
  const [pageNumberForLineChart, setpageNumberForLineChart] = useState(0);

  useEffect(() => {
    async function fetchcovidSummaryData() {
      const response = await axios.get("https://api.covid19api.com/summary");
      const counteriesDataArr = response.data.Countries;
      setCovidSummaryData([...counteriesDataArr]);
    }
    async function fetchCountryCovidData() {
      const { data } = await axios.get(
        "https://api.covid19api.com/country/india"
      );
      setCountryCovidData(data);
    }
    fetchCountryCovidData();
    fetchcovidSummaryData();
  }, []);

  const changePageForBarChart = ({ selected }) => {
    setpageNumberForBarChart(selected);
  };

  const countriesCheckedForBarchart =
    pageNumberForBarChart * countriesPerPageForBarChart;

  const pageCountForBarChart = Math.ceil(
    covidSummaryData.length / countriesPerPageForBarChart
  );

  const changePageForLineChart = ({ selected }) => {
    setpageNumberForLineChart(selected);
  };

  const datesChecked = pageNumberForLineChart * datesPerPage;

  const pageCountForLineChart = Math.ceil(
    countryCovidData.length / datesPerPage
  );

  const countriesPerPageForPieChart = 1;
  const [pageNumberForPieChart, setpageNumberForPieChart] = useState(0);

  const changePageForPieChart = ({ selected }) => {
    setpageNumberForPieChart(selected);
  };

  const countriesCheckedForPieChart =
    pageNumberForPieChart * countriesPerPageForPieChart;

  const pageCountForPieChart = Math.ceil(
    covidSummaryData.length / countriesPerPageForPieChart
  );

  const countriesPerPageForSummaryTable = 20;
  const [pageNumberForSummaryTable, setpageNumberForSummaryTable] = useState(0);

  const changePageForSummaryTable = ({ selected }) => {
    setpageNumberForSummaryTable(selected);
  };

  const countriesCheckedForSummaryTable =
    pageNumberForSummaryTable * countriesPerPageForSummaryTable;

  const pageCountForSummaryTable = Math.ceil(
    covidSummaryData.length / countriesPerPageForSummaryTable
  );

  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <section className="section charts-container">
            <div className="chart bigger">
              <BarChart
                covidDataForBarChart={covidSummaryData}
                countriesCheckedForBarchart={countriesCheckedForBarchart}
                countriesPerPageForBarChart={countriesPerPageForBarChart}
              />
              <Pagination
                pageCount={pageCountForBarChart}
                changePage={changePageForBarChart}
              />
            </div>

            <div className="chart smaller">
              <PieChart
                covidDataForPieChart={covidSummaryData}
                countriesCheckedForPieChart={countriesCheckedForPieChart}
                countriesPerPageForPieChart={countriesPerPageForPieChart}
              />

              <Pagination
                pageCount={pageCountForPieChart}
                changePage={changePageForPieChart}
              />
            </div>
          </section>

          <section className="section charts-container">
            <div className="chart fullwidth">
              <LineChart
                covidDataForLineChart={countryCovidData}
                datesChecked={datesChecked}
                datesPerPage={datesPerPage}
              />
              <Pagination
                pageCount={pageCountForLineChart}
                changePage={changePageForLineChart}
              />
            </div>
          </section>

          <section className="section charts-container">
            <div className="chart">
              <SummaryTable
                covidData={covidSummaryData}
                countriesCheckedForSummaryTable={
                  countriesCheckedForSummaryTable
                }
                countriesPerPageForSummaryTable={
                  countriesPerPageForSummaryTable
                }
              />

              <Pagination
                pageCount={pageCountForSummaryTable}
                changePage={changePageForSummaryTable}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
