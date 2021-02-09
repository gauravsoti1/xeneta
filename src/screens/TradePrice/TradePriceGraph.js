import { Button, Paper, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  apiStatusSetCompletedAction,
  apiStatusSetLoadingAction,
  apiStatusUpdateAction,
  API_STATUSES,
} from "actions/apiStatus";
import { getMarketRates } from "api/marketRates";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import apiStatusReducer, { buildInitialState } from "reducers/apiStatus";
import styled from "styled-components";
import { isBetweenTwoDates } from "util/date";
import { AVAILABLE_METRICS, downloadGraph } from "./helper";
import MetricFiltersComponent from "./MetricFiltersComponent";

export default function TradePriceGraph({
  fromDate,
  toDate,
  origin,
  destination,
}) {
  const [marketRates, setMarketRates] = useState([]);
  const [selectedMetric, setMetric] = useState(AVAILABLE_METRICS.mean.key);
  const [apiStatus, apiStatusDispatch] = useReducer(
    apiStatusReducer,
    buildInitialState(API_STATUSES.complete)
  );
  const originCode = origin?.code;
  const destinationCode = destination?.code;

  useEffect(() => {
    if (!originCode || !destinationCode) return;
    apiStatusDispatch(apiStatusSetLoadingAction());
    getMarketRates({ origin: originCode, destination: destinationCode })
      .then((marketRates) => setMarketRates(marketRates))
      .then(() => apiStatusDispatch(apiStatusSetCompletedAction()))
      .catch((error) => {
        setMarketRates([]);
        apiStatusDispatch(
          apiStatusUpdateAction({
            state: API_STATUSES.error,
            message: !error.status
              ? "Our team is currently working on getting data for this route."
              : error.message,
          })
        );
      });
  }, [originCode, destinationCode]);

  const tradePriceGraphContainer = useRef(null);
  const downloadTradePricesGraph = downloadGraph(tradePriceGraphContainer);

  const filteredData = useMemo(() => {
    if (fromDate && toDate) {
      const isDateBetween = isBetweenTwoDates(fromDate, toDate);
      return marketRates.filter((marketRate) => isDateBetween(marketRate.date));
    } else return marketRates;
  }, [fromDate, toDate, JSON.stringify(marketRates)]);

  function onMetricChange(event) {
    const target = event.target;
    const { value, checked } = target;
    setMetric(value);
  }

  const errorPresent = apiStatus.state === API_STATUSES.error;
  const isLoading = apiStatus.state === API_STATUSES.loading;
  const routePresent = originCode && destinationCode;
  return (
    <>
      <Container ref={tradePriceGraphContainer} id="tradePriceGraphContainer">
        <DownloadGraphContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadTradePricesGraph}
            disabled={!routePresent || !marketRates?.length}
          >
            Download graph
          </Button>
        </DownloadGraphContainer>
        {isLoading ? (
          <LoadingView />
        ) : (
          !errorPresent && (
            <ResponsiveContainer width={"100%"} aspect={4}>
              <LineChart data={filteredData}>
                <XAxis dataKey="day" />
                <YAxis
                  dataKey={selectedMetric}
                  unit="$"
                  name="Average Trade Price"
                  tickCount={20}
                />
                <Tooltip cursor={false} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={AVAILABLE_METRICS[selectedMetric]?.color}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )
        )}
        <div>
          {!errorPresent && (
            <MetricFiltersComponent
              selectedMetric={selectedMetric}
              onMetricChange={onMetricChange}
            />
          )}
        </div>
        <ErrorView>
          <Typography color="error"> {apiStatus?.message} </Typography>
        </ErrorView>
      </Container>
    </>
  );
}

const LoadingView = styled(Skeleton)`
  margin: 0 auto;
  width: 85%;
  height: 50vh;
`;

const ErrorView = styled.div`
  width: 85%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DownloadGraphContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
`;

const Container = styled(Paper)`
  margin: 2rem 0;
  padding: 2rem;
`;
