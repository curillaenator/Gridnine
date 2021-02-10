const initialState = {
  flights: null,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case "value":
      return;

    default:
      return state;
  }
};
