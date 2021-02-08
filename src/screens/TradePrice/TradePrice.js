import React, { useReducer } from "react";
import PortAutocomplete from "components/PortAutocomplete";
import styled from "styled-components";
import {
  reducer,
  initialState,
  updateFromPortAction,
  updateToPortAction,
} from "./reducer";
import TradePriceGraph from "./TradePriceGraph";

export default function TradePrice() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <PortAutocomplete
        label="From"
        selectedPort={state.fromPort}
        onChange={(e, port) => dispatch(updateFromPortAction(port))}
      />
      <PortAutocomplete
        label="To"
        selectedPort={state.toPort}
        onChange={(e, port) => dispatch(updateToPortAction(port))}
      />
      <TradePriceGraph fromDate={state.fromDate} toDate={state.toDate} />
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.palette.background.default};
`;
