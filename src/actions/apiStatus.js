export const API_STATUS_UPDATE = "API_STATUS_UPDATE";

export const API_STATUSES = {
  loading: "LOADING",
  error: "ERROR",
  complete: "COMPLETE",
  loadingMore: "LOADING_MORE",
};

export function apiStatusUpdateAction({ state, message }) {
  return { type: API_STATUS_UPDATE, payload: { state, message } };
}

export function apiStatusUpdateStateAction(state) {
  return { type: API_STATUS_UPDATE, payload: { state } };
}

export function apiStatusSetLoadingAction() {
  return {
    type: API_STATUS_UPDATE,
    payload: { state: API_STATUSES.loading, message: "" },
  };
}

export function apiStatusSetCompletedAction() {
  return {
    type: API_STATUS_UPDATE,
    payload: { state: API_STATUSES.complete, message: "" },
  };
}

export function apiStatusSetLoadingMoreAction() {
  return {
    type: API_STATUS_UPDATE,
    payload: { state: API_STATUSES.loadingMore },
  };
}
