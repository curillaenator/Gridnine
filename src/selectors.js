import { createSelector } from "reselect";

//primitive store querries
const getFlights = (state) => state.app.data.flights;

//selectors
export const getUnsorted = createSelector(getFlights, (flights) => flights);

export const sortByPriceIncr = createSelector(
  getFlights,
  (flights) =>
    flights &&
    flights
      .map((f) => f)
      .sort(
        (f1, f2) => f1.flight.price.total.amount - f2.flight.price.total.amount
      )
);

export const sortByPriceDecr = createSelector(
  getFlights,
  (flights) =>
    flights &&
    flights
      .map((f) => f)
      .sort(
        (f1, f2) => f2.flight.price.total.amount - f1.flight.price.total.amount
      )
);

export const sortByFlightTime = createSelector(
  getFlights,
  (flights) =>
    flights &&
    flights
      .map((f) => f)
      .sort(
        (f1, f2) =>
          f1.flight.legs.reduce((leg1, leg2) => leg1.duration + leg2.duration) -
          f2.flight.legs.reduce((leg1, leg2) => leg1.duration + leg2.duration)
      )
);
