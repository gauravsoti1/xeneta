const portReducerInitialState = {};

export const PORT_UPDATE = "LOCATION_UPDATE";

export const locationReducer = (state = portReducerInitialState, action) => {
  switch (action.type) {
    case PORT_UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
