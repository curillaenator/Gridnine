import { useEffect } from "react";
import { connect } from "react-redux";
import {
  flightsFromJSON,
  showMoreFlights,
  setSort,
  filterBy,
} from "../Redux/Reducers/appReducer";
import {
  sortByPriceIncr,
  sortByPriceDecr,
  getUnsorted,
  sortByFlightTime,
} from "../selectors";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Loader from "./Components/Loader/Loader";

import "./App.scss";

const App = (props) => {
  // console.log(props);
  // debugger;
  const initialize = () => props.flightsFromJSON();
  useEffect(() => initialize(), []);

  const sortedData = () => {
    switch (props.sortOption) {
      case "priceDecrease":
        return props.dataPriceDecr;
      case "flightTime":
        return props.dataFlightTime;
      default:
        return props.dataPriceIncr;
    }
  };

  if (!props.isInitialized) return <Loader />;

  return (
    <div className="container">
      <Aside
        carriers={props.carriers}
        setSort={props.setSort}
        filterBy={props.filterBy}
        sortOption={props.sortOption}
        sortedData={sortedData()}
        // selectData={sortedData}
        filterByCarriers={props.filterByCarriers}
      />
      <Main
        flights={props.flights}
        pagesLoaded={props.pagesLoaded}
        showMoreFlights={props.showMoreFlights}
        pageSize={props.pageSize}
        isLoading={props.isLoading}
        sortedData={sortedData()}
      />
    </div>
  );
};

const mstp = (state) => ({
  flights: state.app.dataToShow,
  isInitialized: state.app.isInitialized,
  pageSize: state.app.pagination.pageSize,
  pagesLoaded: state.app.pagination.pagesLoaded,
  isLoading: state.app.isLoading,
  carriers: state.app.carriers,
  sortOption: state.app.sortOption,
  filterByCarriers: state.app.filterByCarriers,
  data: getUnsorted(state),
  dataPriceIncr: sortByPriceIncr(state),
  dataPriceDecr: sortByPriceDecr(state),
  dataFlightTime: sortByFlightTime(state),
});

export default connect(mstp, {
  flightsFromJSON,
  showMoreFlights,
  setSort,
  filterBy,
})(App);
