import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import UpdateIcon from "@mui/icons-material/Update";
import Typography from "@mui/material/Typography";

const Input = styled(MuiInput)`
  width: 42px;
`;

const maxExplainTime: number = parseInt(
  process.env.NEXT_PUBLIC_MAX_EXPLAIN_TIME as string
);

export default function InputSlider() {
  const [value, setValue] = React.useState(10);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > maxExplainTime) {
      setValue(maxExplainTime);
    }
  };

  return (
    <Box sx={{ width: 306 }}>
      <Grid container spacing={4}>
        <Grid item>
          <UpdateIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={1}
            max={maxExplainTime}
          />
        </Grid>
        <Grid item style={{ display: "inline-flex" }}>
          <Input
            value={value}
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
            <span style={value === 1 ? { color: "white" } : {}}>s</span>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
