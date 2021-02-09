import React, { useEffect, useReducer } from "react";
import PortAutocomplete from "components/PortAutocomplete";
import styled from "styled-components";
import {
  reducer,
  initialState,
  updateFromPortAction,
  updateToPortAction,
} from "./reducer";
import TradePriceGraph from "./TradePriceGraph";
import { getPorts } from "api/port";

export default function TradePrice({ ports }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <PortAutocomplete
        label="From"
        selectedPort={state.fromPort}
        onChange={(e, port) => dispatch(updateFromPortAction(port))}
        options={ports}
      />
      <PortAutocomplete
        label="To"
        selectedPort={state.toPort}
        onChange={(e, port) => dispatch(updateToPortAction(port))}
        options={ports}
      />
      <TradePriceGraph
        fromDate={state.fromDate}
        toDate={state.toDate}
        origin={state.fromPort}
        destination={state.toPort}
      />
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.palette.background.default};
`;
