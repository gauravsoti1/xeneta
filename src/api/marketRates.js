import { MARKET_RATES_ENDPOINT } from "endpoints";
import { sendRequest } from "util/sendRequest";

function parseMarketRates(data) {
  return data.map((marketRate) => ({
    mean: marketRate.mean || 0,
    low: marketRate.low || 0,
    high: marketRate.high || 0,
    day: marketRate.day,
    date: new Date(marketRate.day),
  }));
}

export function getMarketRates({ origin, destination }) {
  if (!origin || !destination)
    throw new Error("Please provide origin and destination");
  const url = MARKET_RATES_ENDPOINT;
  const queryParams = { origin, destination };
  return sendRequest({ url, method: "GET", queryParams }).then(
    (marketRatesRes) => parseMarketRates(marketRatesRes)
  );
}
