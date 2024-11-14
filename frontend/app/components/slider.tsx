import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Input = styled(MuiInput)`
  width: 42px;
`;

const maxExplainTime: number = parseInt(
  process.env.NEXT_PUBLIC_MAX_EXPLAIN_TIME as string
);

type SliderData = {
  timeToExplain: number;
  setTimeToExplain: (timeToExplain: number) => void;
};

export default function InputSlider({
  timeToExplain,
  setTimeToExplain,
}: SliderData) {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTimeToExplain(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeToExplain(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (timeToExplain < 1) {
      setTimeToExplain(1);
    } else if (timeToExplain > maxExplainTime) {
      setTimeToExplain(maxExplainTime);
    }
  };

  return (
    <Box sx={{ width: 306 }}>
      <Grid container spacing={4}>
        <Grid item xs>
          <Slider
            value={typeof timeToExplain === "number" ? timeToExplain : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={1}
            max={maxExplainTime}
          />
        </Grid>
        <Grid item style={{ display: "inline-flex" }}>
          <Input
            value={timeToExplain}
            name="timeToExplain"
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: maxExplainTime,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />{" "}
          <Typography>
            minute
            <span style={timeToExplain === 1 ? { color: "white" } : {}}>s</span>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
