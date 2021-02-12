import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  flightsFromJSON,
  showMoreFlights,
  setSort,
  setPriceFilterData,
  setfilterData,
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
  const initialize = () => props.flightsFromJSON();
  useEffect(() => initialize(), []);

  const dataSorted = {
    priceIncrease: props.dataPriceIncr,
    priceDecrease: props.dataPriceDecr,
    flightTime: props.dataFlightTime,
  };

  const data = {
    data: dataSorted[props.sortOption],
    filterByCarriers: props.filter.byCarriers,
    filterByPrice: props.filter.byPrice,
    filterByTransfer: props.filter.byTransfer,
  };
  // console.log(filterData);

  if (!props.isInitialized) return <Loader />;

  return (
    <div className="container">
      <Aside
        carriers={props.carriers}
        setSort={props.setSort}
        setfilterData={props.setfilterData}
        setPriceFilterData={props.setPriceFilterData}
        sortOption={props.sortOption}
        filter={props.filter}
      />
      <Main
        dataToShow={props.dataToShow}
        pagesLoaded={props.pagesLoaded}
        showMoreFlights={props.showMoreFlights}
        pageSize={props.pageSize}
        isLoading={props.isLoading}
        sortedData={props.data} //
        data={data}
      />
    </div>
  );
};

const mstp = (state) => ({
  dataToShow: state.app.dataToShow,
  isInitialized: state.app.isInitialized,
  pageSize: state.app.pagination.pageSize,
  pagesLoaded: state.app.pagination.pagesLoaded,
  isLoading: state.app.isLoading,
  carriers: state.app.carriers,
  sortOption: state.app.sortOption,
  filter: state.app.filter,

  data: getUnsorted(state), //
  dataPriceIncr: sortByPriceIncr(state),
  dataPriceDecr: sortByPriceDecr(state),
  dataFlightTime: sortByFlightTime(state),
});

export default connect(mstp, {
  flightsFromJSON,
  showMoreFlights,
  setSort,
  filterBy,
  setfilterData,
  setPriceFilterData,
})(App);
