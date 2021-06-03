import React, { useState, useEffect } from "react";
import CurrencyString from "./components/currencyString/CurrencyString";
import Loader from "./components/loader/Loader";
import "./App.css";

function App() {
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    fetch("https://www.nbrb.by/api/exrates/rates?periodicity=0")
      .then((response) => response.json())
      .then((result) => setCurrencyList(result))
      .catch((e) => console.log(e.message));
  }, []);

  let currencyListView;
  if (currencyList.length > 0) {
    currencyListView = currencyList.map((el) => (
      <CurrencyString rate={el} key={el.Cur_ID} />
    ));
  }

  return (
    <div className="App">
      {currencyListView ? (
        <table border="1" className="main-table">
          <caption className="main-table__caption">Exchange rate</caption>
          <thead>
            <tr>
              <th className="main-table__head">Foreign currency denomination</th>
              <th className="main-table__head">Foreign currency amount, currency letter code</th>
              <th className="main-table__head">Official rate</th>
            </tr>
          </thead>
          <tbody>{currencyListView}</tbody>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
