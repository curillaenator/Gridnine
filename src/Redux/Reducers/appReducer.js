import { api } from "../../api";
// import { store } from "../store";

const initialState = {
  isInitialized: false,
  isLoading: false,
  pagination: {
    pageSize: 20,
    pagesLoaded: 1,
  },
  direct: false,
  data: {
    flights: null,
    bestPrices: null,
  },
  dataToShow: [],
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, isInitialized: action.init };
    case "IS-LOADING":
      return { ...state, isLoading: action.load };
    case "SET-FLIGHTS":
      return { ...state, data: { ...action.data } };
    case "DATA-TO-SHOW":
      return { ...state, dataToShow: [...state.dataToShow, ...action.show] };
    case "INCREMENT-PAGESLOADED":
      return {
        ...state,
        pagination: { ...state.pagination, pagesLoaded: action.n },
      };
    default:
      return state;
  }
};

// ACTIONS

const initialize = (init) => ({ type: "INITIALIZE", init });
const isLoading = (load) => ({ type: "IS-LOADING", load });
const storeFlights = (data) => ({ type: "SET-FLIGHTS", data });
const dataToShow = (show) => ({ type: "DATA-TO-SHOW", show });
const incrPagesLoaded = (n) => ({ type: "INCREMENT-PAGESLOADED", n });

// UTILS

const pageFilter = (data, pageSize, pagesLoaded) => {
  const upper = pageSize * pagesLoaded;
  const lower = pageSize * pagesLoaded - pageSize;
  return data.flights.filter((f, i) => i < upper && i >= lower);
};

// THUNKs

export const flightsFromJSON = (pageSize, pagesLoaded = 1) => (dispatch) => {
  dispatch(isLoading(true));
  api.getData().then((r) => {
    dispatch(storeFlights(r));
    dispatch(dataToShow(pageFilter(r, pageSize, pagesLoaded)));
    dispatch(incrPagesLoaded(pagesLoaded));
    dispatch(isLoading(false));
    dispatch(initialize(true));
  });
};
