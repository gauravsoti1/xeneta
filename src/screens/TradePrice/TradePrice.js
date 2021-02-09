import React, { useEffect, useReducer, useState } from "react";
import PortAutocomplete from "components/PortAutocomplete";
import styled from "styled-components";
import {
  reducer,
  initialState,
  updateFromPortAction,
  updateToPortAction,
  updateFromDateAction,
  updateToDateAction,
} from "./reducer";
import TradePriceGraph from "./TradePriceGraph";
import { getPorts } from "api/port";
import DatePickerWrapper from "components/DatePickerWrapper";
import { TextField } from "@material-ui/core";

export default function TradePrice({ ports }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFromDatePickerOpen, setFromDatePicker] = useState(false);
  console.log(
    "🚀 ~ file: TradePrice.js ~ line 20 ~ TradePrice ~ isFromDatePickerOpen",
    isFromDatePickerOpen
  );
  const [isToDatePickerOpen, setToDatePicker] = useState(false);
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
      <TextField
        label="From"
        value={state.fromDate?.toString()}
        onClick={() => setFromDatePicker((state) => !state)}
      />
      <TextField
        label="To"
        value={state.toDate?.toString()}
        onClick={() => setToDatePicker((state) => !state)}
      />

      <DatePickerWrapper
        selectedDate={state.fromDate}
        onChange={(date) => dispatch(updateFromDateAction(date))}
        // onOpen={() => setFromDatePicker(true)}
        onClose={() => setFromDatePicker(false)}
        isOpen={isFromDatePickerOpen}
      />
      <DatePickerWrapper
        selectedDate={state.toDate}
        onChange={(date) => dispatch(updateToDateAction(date))}
        // onOpen={() => setToDatePicker(true)}
        onClose={() => setToDatePicker(false)}
        isOpen={isToDatePickerOpen}
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
