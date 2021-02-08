import React, { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  LineChart,
  Line,
} from "recharts";

const marketRates = [
  {
    day: "2021-01-01", // new Date("2021-01-01")
    mean: 500,
    low: 100,
    high: 800,
  },
  {
    day: "2021-01-02",
    mean: null,
    low: null,
    high: null,
  },
  {
    day: "2021-01-03",
    mean: 600,
    low: 100,
    high: 900,
  },
];

const data = marketRates.map((marketRate) => ({
  mean: marketRate.mean || 0,
  low: marketRate.low || 0,
  high: marketRate.high || 0,
  day: marketRate.day,
  date: new Date(marketRate.day),
}));
console.log("🚀 ~ file: TradePriceGraph.js ~ line 46 ~ data ~ data", data);

export default function TradePriceGraph({ fromDate, toDate }) {
  const filteredData = useMemo(() => {
    if (fromDate && toDate) {
      const fromDateTime = fromDate.getTime(),
        toDateTime = toDate.getTime();
      return data.filter((marketRate) => {
        const currentDateTime = marketRate.date.getTime();
        return currentDateTime >= fromDateTime && currentDateTime <= toDateTime;
      });
    } else return data;
  }, [fromDate, toDate]);

  return (
    <div>
      <ResponsiveContainer width={"100%"} aspect={4}>
        <LineChart data={filteredData}>
          <XAxis dataKey="day" />
          <YAxis dataKey="mean" unit="$" name="Average Trade Price" />
          <Tooltip cursor={false} />
          <Line
            type="monotone"
            dataKey="mean"
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
    </div>
  );
}
