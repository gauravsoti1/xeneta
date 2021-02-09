import { useReducer } from "react";

export default function useReducerWithThunk(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let getState = () => {
    return { ...state };
  };

  let customDispatch = (action) => {
    if (typeof action === "function") {
      return action(customDispatch, getState);
    } else {
      dispatch(action);
    }
  };

  return [state, customDispatch];
}
