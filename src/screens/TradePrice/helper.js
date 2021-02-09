import { amber } from "@material-ui/core/colors";

export const AVAILABLE_METRICS = {
  low: {
    key: "low",
    display: "Low",
    color: amber[400],
  },
  mean: {
    key: "mean",
    display: "Average",
    color: "green",
  },
  high: {
    key: "high",
    display: "High",
    color: "red",
  },
};

export function downloadGraph(ref) {
  return () => {
    const graph = ref.current;
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
  };
}
