import { useEffect } from "react";
import { connect } from "react-redux";
import { flightsFromJSON } from "../Redux/Reducers/appReducer";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Loader from "./Components/Loader/Loader";

import "./App.scss";

const App = (props) => {
  // console.log(props);
  const getFlights = () => props.flightsFromJSON(props.pageSize);
  useEffect(() => getFlights(), []);

  if (!props.isInitialized) return <Loader />;

  return (
    <div className="container">
      <Aside />
      <Main
        flights={props.flights}
        pagesLoaded={props.pagesLoaded}
        addFlights={props.flightsFromJSON}
        pageSize={props.pageSize}
        isLoading={props.isLoading}
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
});

export default connect(mstp, { flightsFromJSON })(App);
