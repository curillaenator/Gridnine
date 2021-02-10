import { useEffect } from "react";
import { connect } from "react-redux";
import { flightsFromJSON } from "../Redux/Reducers/appReducer";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Loader from "./Components/Loader/Loader";

import "./App.scss";

const App = (props) => {
  // console.log(props);

  const getFlights = () => props.flightsFromJSON();
  useEffect(() => getFlights(), []);

  if (!props.isInitialized) return <Loader />;

  return (
    <div className="container">
      <Aside />
      <Main flights={props.flights} />
    </div>
  );
};

const mstp = (state) => ({
  flights: state.app.data,
  isInitialized: state.app.isInitialized,
});

export default connect(mstp, { flightsFromJSON })(App);
