"use client";

import { Grid2, TextField } from "@mui/material";
import Image from "next/image";
import InputSlider from "./components/slider";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Update from "@mui/icons-material/Update";
import "./css/general.css";

export default function Home() {
  const [subjectToLearnAbout, setSubjectToLearnAbout] = useState("");
  const [timeToExplain, setTimeToExplain] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsPending(true);
    fetch("http://127.0.0.1:5000/api/explain", {
      method: "POST",
      body: JSON.stringify({
        subjectToLearnAbout: subjectToLearnAbout,
        timeToExplain: timeToExplain,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setResponseText(res.responseText))
      .then(() => {
        setIsPending(false);
      })
      .catch((res) => {
        setResponseText(
          "I cannot provide information about this subject right now."
        );
        setIsPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:center">
          Explain to me about
          <TextField
            name="subjectToLearnAbout"
            label="write some subject"
            value={subjectToLearnAbout}
            onChange={(e) => setSubjectToLearnAbout(e.target.value)}
          />
          <Grid2 style={{ display: "inline-flex" }}>
            <Typography style={{ paddingRight: "29px" }}>in</Typography>{" "}
            <InputSlider
              timeToExplain={timeToExplain}
              setTimeToExplain={setTimeToExplain}
            />
          </Grid2>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <button
              disabled={isPending || subjectToLearnAbout === ""}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              style={
                subjectToLearnAbout === "" || isPending
                  ? { backgroundColor: "#d1d1d1", transition: "0.2s linear" }
                  : { backgroundColor: "#383838", transition: "0.2s linear" }
              }
            >
              <Image
                className="invert"
                src="/party-horn.svg"
                alt="Let's learn"
                width={20}
                height={20}
              />
              Let's go!
            </button>
          </div>
          <div>
            <Grid2
              style={{
                display: "grid",
                justifyItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Update
                className="blink"
                style={isPending === false ? { color: "transparent" } : {}}
              />
            </Grid2>
            <Typography>{responseText}</Typography>
          </div>
        </main>
      </div>
    </form>
  );
}
