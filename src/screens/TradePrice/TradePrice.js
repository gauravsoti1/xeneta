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
import {
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { convertDateToString1 } from "util/date";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";

export default function TradePrice() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ports, setPorts] = useState([]);
  const [isFromDatePickerOpen, setFromDatePicker] = useState(false);
  const [isToDatePickerOpen, setToDatePicker] = useState(false);

  useEffect(() => {
    getPorts()
      .then((ports) => setPorts(ports))
      .catch((err) => console.error("An error occured", err));
  }, []);

  const dateFilterInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <DateRangeOutlinedIcon />
      </InputAdornment>
    ),
    readOnly: true,
  };
  return (
    <Container>
      <Heading align="center" variant="h6" color="primary">
        Trade Prices
      </Heading>
      <OriginDestinationFilters>
        <PortAutocomplete
          label="Origin"
          selectedPort={state.fromPort}
          onChange={(e, port) => dispatch(updateFromPortAction(port))}
          options={ports.filter((port) => port.code !== state.toPort?.code)}
        />
        <PortAutocomplete
          label="Destination"
          selectedPort={state.toPort}
          onChange={(e, port) => dispatch(updateToPortAction(port))}
          options={ports.filter((port) => port.code !== state.fromPort?.code)}
        />
        <TextField
          type="text"
          variant="outlined"
          label="From"
          value={state.fromDate ? convertDateToString1(state.fromDate) : ""}
          onClick={() => setFromDatePicker((state) => !state)}
          InputProps={dateFilterInputProps}
        />
        <TextField
          type="text"
          variant="outlined"
          label="To"
          value={state.toDate ? convertDateToString1(state.toDate) : ""}
          onClick={() => setToDatePicker((state) => !state)}
          InputProps={dateFilterInputProps}
        />
      </OriginDestinationFilters>

      <DatePickerWrapper
        selectedDate={state.fromDate}
        onChange={(date) => dispatch(updateFromDateAction(date))}
        onClose={() => setFromDatePicker(false)}
        isOpen={isFromDatePickerOpen}
      />
      <DatePickerWrapper
        selectedDate={state.toDate}
        onChange={(date) => dispatch(updateToDateAction(date))}
        onClose={() => setToDatePicker(false)}
        isOpen={isToDatePickerOpen}
      />

      <TradePriceGraph
        fromDate={state.fromDate}
        toDate={state.toDate}
        origin={state.fromPort}
        destination={state.toPort}
      />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: calc(100% - 4rem);
  padding: 1rem;
  padding: 16px;
  margin: 0 auto;
  margin-left: 2rem;
`;

const OriginDestinationFilters = styled(Paper)`
  display: flex;
  justify-content: space-evenly;
`;

const Heading = styled(Typography)`
  margin-bottom: 2rem;
  margin-top: 1rem;
`;
