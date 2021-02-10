import { api } from "../../api";

const initialState = {
  isInitialized: false,
  pagination: {
    flightsPerPage: 10,
    pagesLoaded: 1,
  },
  direct: false,
  data: {
    flights: null,
    bestPrices: null,
  },
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, isInitialized: action.init };
    case "SET-FLIGHTS":
      return { ...state, data: { ...action.flights } };
    default:
      return state;
  }
};

// ACTIONS

const setFlights = (flights) => ({ type: "SET-FLIGHTS", flights });
const initialize = (init) => ({ type: "INITIALIZE", init });

// THUNKs

export const flightsFromJSON = () => (dispatch) => {
  api.getData().then((r) => {
    dispatch(setFlights(r));
    dispatch(initialize(true));
  });
};
