export const UPDATE_SELECTED_FROM_PORT = "UPDATE_SELECTED_FROM_PORT";
export const UPDATE_SELECTED_TO_PORT = "UPDATE_SELECTED_TO_PORT";
export const UPDATE_SELECTED_FROM_DATE = "UPDATE_SELECTED_TO_DATE";
export const UPDATE_SELECTED_TO_DATE = "UPDATE_SELECTED_TO_DATE";

export const initialState = {
  fromPort: null,
  toPort: null,
  fromDate: null,
  // fromDate: new Date("2021-01-02"),
  toDate: null,
  // toDate: new Date("2021-01-03"),
};

export function updateFromPortAction(port) {
  return { type: UPDATE_SELECTED_FROM_PORT, payload: port };
}

export function updateToPortAction(port) {
  return { type: UPDATE_SELECTED_TO_PORT, payload: port };
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_FROM_PORT:
      return { ...state, fromPort: action.payload };
    case UPDATE_SELECTED_TO_PORT:
      return { ...state, toPort: action.payload };
    case UPDATE_SELECTED_FROM_DATE:
      return { ...state, fromDate: action.payload };
    case UPDATE_SELECTED_TO_DATE:
      return { ...state, toDate: action.payload };
    default:
      return state;
  }
};
