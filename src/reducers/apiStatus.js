import { API_STATUSES, API_STATUS_UPDATE } from "actions/apiStatus";
import { initialState } from "screens/TradePrice/reducer";

export const apiStatusInitialState = {
  state: API_STATUSES.loading,
  message: null,
};

export function buildInitialState(state = API_STATUSES.loading, message) {
  return { state, message };
}

const apiStatusReducer = (state = apiStatusInitialState, action) => {
  switch (action.type) {
    case API_STATUS_UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default apiStatusReducer;
