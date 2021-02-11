import { api } from "../../api";

const INITIALIZE = "appReducer/INITIALIZE";
const IS_LOADING = "appReducer/IS_LOADING";
const STORE_FLIGHTS = "appReducer/STORE_FLIGHTS";
// const UPDATE_SORTED_FLIGHTS = "appReducer/UPDATE_FLIGHTS";
const FLIGHTS_TO_SHOW = "appReducer/FLIGHTS_TO_SHOW";
const PAGESLOADED = "appReducer/PAGESLOADED";
const STORE_CARRIERS = "appReducer/STORE_CARRIERS";
const SET_SORT_OPTION = "appReducer/SET_SORT_OPTION";
const CLEAR_FLIGHTS_TO_SHOW = "appReducer/CLEAR_FLIGHTS_TO_SHOW";
const FILTER_BY_CARRIERS = "appReducer/FILTER_BY_CARRIERS";

const initialState = {
  isInitialized: false,
  isLoading: false,
  pagination: {
    pageSize: 10,
    pagesLoaded: 1,
  },
  carriers: [],
  filterByCarriers: [],
  sortOption: "priceIncrease",
  data: {
    flights: null,
    bestPrices: null,
  },
  dataSorted: null,
  dataToShow: [],
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, isInitialized: action.init };
    case IS_LOADING:
      return { ...state, isLoading: action.load };
    case STORE_FLIGHTS:
      return { ...state, data: { ...action.data } };
    // case UPDATE_SORTED_FLIGHTS:
    //   return { ...state, dataSorted: action.data };
    case FLIGHTS_TO_SHOW:
      return { ...state, dataToShow: [...state.dataToShow, ...action.show] };
    case CLEAR_FLIGHTS_TO_SHOW:
      return { ...state, dataToShow: [] };
    case PAGESLOADED:
      return {
        ...state,
        pagination: { ...state.pagination, pagesLoaded: action.n },
      };
    case STORE_CARRIERS:
      return { ...state, carriers: [...state.carriers, ...action.carriers] };
    case SET_SORT_OPTION:
      return { ...state, sortOption: action.option };
    case FILTER_BY_CARRIERS:
      return { ...state, filterByCarriers: action.payload };
    default:
      return state;
  }
};

// ACTIONS

const initialize = (init) => ({ type: INITIALIZE, init });
const isLoading = (load) => ({ type: IS_LOADING, load });
const storeFlights = (data) => ({ type: STORE_FLIGHTS, data });
// const updSortFlights = (data) => ({ type: UPDATE_SORTED_FLIGHTS, data });
const flightsToShow = (show) => ({ type: FLIGHTS_TO_SHOW, show });
const clearflightsToShow = () => ({ type: CLEAR_FLIGHTS_TO_SHOW });
const handlePagesLoaded = (n) => ({ type: PAGESLOADED, n });
const storeCarriers = (carriers) => ({ type: STORE_CARRIERS, carriers });
const sortOption = (option) => ({ type: SET_SORT_OPTION, option });
const filterByCarriers = (payload) => ({ type: FILTER_BY_CARRIERS, payload });

// UTILS

const pageFilter = (data, pageSize, pagesLoaded) => {
  // debugger;
  const upper = pageSize * pagesLoaded;
  const lower = pageSize * pagesLoaded - pageSize;
  return data.filter((f, i) => i < upper && i >= lower);
};

const getCarriers = (data) => {
  return [...new Set(data.flights.map((f) => f.flight.carrier.caption))];
};

// THUNKs

export const flightsFromJSON = () => (dispatch) => {
  api.getData().then((resp) => {
    dispatch(storeFlights(resp));
    dispatch(storeCarriers(getCarriers(resp)));
    dispatch(initialize(true));
  });
};

export const showMoreFlights = (pSize, pLoaded, data) => (dispatch) => {
  // debugger;
  dispatch(isLoading(true));
  dispatch(flightsToShow(pageFilter(data, pSize, pLoaded)));
  dispatch(handlePagesLoaded(pLoaded));
  dispatch(isLoading(false));
};

export const setSort = (option) => (dispatch) => {
  dispatch(clearflightsToShow());
  dispatch(handlePagesLoaded(1));
  dispatch(sortOption(option));
};

export const filterBy = (data) => (dispatch) => {
  console.log(data);
  dispatch(filterByCarriers(data));
};
