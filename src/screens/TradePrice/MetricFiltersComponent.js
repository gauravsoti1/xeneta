import { FormControlLabel, Radio } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { AVAILABLE_METRICS } from "./helper";

export default function MetricFiltersComponent({
  selectedMetric,
  onMetricChange,
}) {
  return (
    <MetricsFiltersContainer>
      {Object.values(AVAILABLE_METRICS).map((metric) => {
        return (
          <FormControlLabel
            control={
              <StyledRadio
                checked={selectedMetric === metric.key}
                name={"selectedMetric"}
                value={metric.key}
                onChange={onMetricChange}
                color={metric.color}
              />
            }
            label={metric.display}
          />
        );
      })}
    </MetricsFiltersContainer>
  );
}

const MetricsFiltersContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
`;

const StyledRadio = styled(Radio)`
  &.MuiRadio-root.Mui-checked {
    color: ${(props) => props.color};
  }
`;
