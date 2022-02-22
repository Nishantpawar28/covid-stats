import { useState, useEffect } from "react";
import { orderBy } from "lodash";

const SummaryTable = ({
  covidData,
  countriesCheckedForSummaryTable,
  countriesPerPageForSummaryTable,
}) => {
  const [data, setData] = useState(covidData);
  const [sortOrderArr, setSortOrderArr] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const newData = covidData.map((country) => {
      const TotalRecovered =
        country.TotalRecovered === 0
          ? country.TotalConfirmed - country.TotalDeaths
          : country.TotalRecovered;
      const newCountry = { ...country, TotalRecovered };
      return newCountry;
    });

    setData(newData);
  }, [covidData]);

  console.log("Data", data);

  const sortData = (column) => {
    setData(orderBy(data, column, sortOrder));
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Sr. No</th>
          <th onClick={() => sortData("Country")}>Country</th>
          <th onClick={() => sortData("TotalConfirmed")}>Total Confirmed</th>
          <th onClick={() => sortData("TotalDeaths")}>Total Deaths</th>
          <th onClick={() => sortData("TotalRecovered")}>Total Recovered</th>
        </tr>
      </thead>
      <tbody>
        {data
          .slice(
            countriesCheckedForSummaryTable,
            countriesCheckedForSummaryTable + countriesPerPageForSummaryTable
          )
          .map((record, index) => (
            <tr key={record.ID}>
              <td>{index + 1 + countriesCheckedForSummaryTable}</td>
              <td>{record.Country}</td>
              <td>{record.TotalConfirmed}</td>
              <td>{record.TotalDeaths}</td>
              <td>{record.TotalRecovered}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
