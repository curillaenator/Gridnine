import { api } from "../../api";

const INITIALIZE = "appReducer/INITIALIZE";
const IS_LOADING = "appReducer/IS_LOADING";
const STORE_FLIGHTS = "appReducer/STORE_FLIGHTS";
// const FILTER_FLIGHTS = "appReducer/UPDATE_FLIGHTS";
const FLIGHTS_TO_SHOW = "appReducer/FLIGHTS_TO_SHOW";
const PAGESLOADED = "appReducer/PAGESLOADED";
const STORE_CARRIERS = "appReducer/STORE_CARRIERS";
const SET_SORT_OPTION = "appReducer/SET_SORT_OPTION";
const CLEAR_FLIGHTS_TO_SHOW = "appReducer/CLEAR_FLIGHTS_TO_SHOW";

const SET_PRICE_FILTER_DATA = "appReducer/SET_PRICE_FILTER_DATA";
const SET_FILTER_DATA = "appReducer/SET_FILTER_DATA";

const initialState = {
  isInitialized: false,
  isLoading: false,
  pagination: {
    pageSize: 10,
    pagesLoaded: 1,
  },
  carriers: [],
  filter: {
    byCarriers: [],
    byTransfer: [],
    byPrice: {
      from: null,
      to: null,
    },
  },
  sortOption: "priceIncrease",
  data: {
    flights: null,
    bestPrices: null,
  },
  // dataFiltered: [],
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
    // case FILTER_FLIGHTS:
    //   return { ...state, dataFiltered: action.data };
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
    case SET_FILTER_DATA:
      return { ...state, filter: action.data };
    case SET_PRICE_FILTER_DATA:
      return { ...state, filter: { ...state.filter, byPrice: action.data } };
    default:
      return state;
  }
};

// ACTIONS

const initialize = (init) => ({ type: INITIALIZE, init });
const isLoading = (load) => ({ type: IS_LOADING, load });
const storeFlights = (data) => ({ type: STORE_FLIGHTS, data });
// const updFilteredFlights = (data) => ({ type: FILTER_FLIGHTS, data });
const flightsToShow = (show) => ({ type: FLIGHTS_TO_SHOW, show });
const clearflightsToShow = () => ({ type: CLEAR_FLIGHTS_TO_SHOW });
const handlePagesLoaded = (n) => ({ type: PAGESLOADED, n });
const storeCarriers = (carriers) => ({ type: STORE_CARRIERS, carriers });
const sortOption = (option) => ({ type: SET_SORT_OPTION, option });

const priceFilterData = (data) => ({ type: SET_PRICE_FILTER_DATA, data });
const filterData = (data) => ({ type: SET_FILTER_DATA, data });

// UTILS

const pageFilter = (data, pageSize, pagesLoaded) => {
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
  dispatch(isLoading(true));
  dispatch(flightsToShow(pageFilter(data, pSize, pLoaded)));
  dispatch(handlePagesLoaded(pLoaded));
  dispatch(isLoading(false));
};

export const setSort = (option) => (dispatch) => {
  dispatch(sortOption(option));
};

const combineFilterData = (filterArr, item, checked) =>
  checked ? [...filterArr, item] : filterArr.filter((c) => c !== item);

export const setfilterData = (key, filter, value, checked) => (dispatch) => {
  const data = filter;
  data[key] = combineFilterData(filter[key], value, checked);
  dispatch(filterData(data));
};

export const setPriceFilterData = (data) => (dispatch) => {
  dispatch(priceFilterData(data))
};

const filter = (data, keysArr) =>
  data.filter((f) => keysArr.some((k) => k === f.flight.carrier.caption));

export const filterBy = () => (dispatch) => {
  dispatch(clearflightsToShow());
  dispatch(handlePagesLoaded(1));
};
