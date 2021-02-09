import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { getMarketRates } from "api/marketRates";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

// const marketRates = [
//   {
//     day: "2021-01-01", // new Date("2021-01-01")
//     mean: 500,
//     low: 100,
//     high: 800,
//   },
//   {
//     day: "2021-01-02",
//     mean: null,
//     low: null,
//     high: null,
//   },
//   {
//     day: "2021-01-03",
//     mean: 600,
//     low: 100,
//     high: 900,
//   },
// ];

// const data = marketRates.map((marketRate) => ({
//   mean: marketRate.mean || 0,
//   low: marketRate.low || 0,
//   high: marketRate.high || 0,
//   day: marketRate.day,
//   date: new Date(marketRate.day),
// }));
// 

const AVAILABLE_METRICS = {
  mean: {
    key: "mean",
    display: "Average",
  },
  low: {
    key: "low",
    display: "Low",
  },
  high: {
    key: "high",
    display: "High",
  },
};

export default function TradePriceGraph({
  fromDate,
  toDate,
  origin,
  destination,
}) {
  const [marketRates, setMarketRates] = useState([]);
  const [selectedMetric, setMetric] = useState(AVAILABLE_METRICS.mean.key);
  const originCode = origin?.code;
  const destinationCode = destination?.code;

  useEffect(() => {
    if (!originCode || !destinationCode) return;
    getMarketRates({ origin: originCode, destination: destinationCode }).then(
      (marketRates) => setMarketRates(marketRates)
    );
  }, [originCode, destinationCode]);

  const tradePriceGraphContainer = useRef(null);
  const filteredData = useMemo(() => {
    if (fromDate && toDate) {
      const fromDateTime = fromDate.getTime(),
        toDateTime = toDate.getTime();
      return marketRates.filter((marketRate) => {
        const currentDateTime = marketRate.date.getTime();
        return currentDateTime >= fromDateTime && currentDateTime <= toDateTime;
      });
    } else return marketRates;
  }, [fromDate, toDate, JSON.stringify(marketRates)]);

  function downloadGraph() {
    const graph = tradePriceGraphContainer.current;
    const svg = graph.getElementsByTagName("svg")[0];
    // svg.style.background = "white";
    var svgData = svg.outerHTML;
    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "tradePriceGraph.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function onMetricChange(event) {
    const target = event.target;
    const { value, checked } = target;
    setMetric(value);
  }

  return (
    <div ref={tradePriceGraphContainer} id="tradePriceGraphContainer">
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
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Bar dataKey="count" maxBarSize={20}>
            {data.map((obj) => (
              <Cell fill={obj.color} />
            ))}
          </Bar> */}
        </LineChart>
      </ResponsiveContainer>
      {Object.values(AVAILABLE_METRICS).map((metric) => {
        console.log(
          "🚀 ~ file: TradePriceGraph.js ~ line 128 ~ {Object.values ~ metric",
          metric
        );
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMetric === metric.key}
                name={"selectedMetric"}
                value={metric.key}
                onChange={onMetricChange}
              />
            }
            label={metric.display}
          />
        );
      })}
      <Button onClick={downloadGraph}>Download graph</Button>
    </div>
  );
}
