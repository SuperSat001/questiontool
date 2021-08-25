import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import "./stylesheets/app.css";
import { makeStyles } from "@material-ui/core/styles";
import { CSVDownload } from "react-csv";

const useStyles = makeStyles((theme) => ({
  submit: {
    width: "97%",
    backgroundColor: "green",
    transition: "0.3s",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#00ff44",
      color: "#000",
    },
  },
}));

const App = () => {
  const n = "assets";
  const q = 20;

  const [qns, setQns] = useState(q);
  const [current, setCurrent] = useState(1);
  const [CSV, setCSV] = useState([["Question number", "Answer"]]);
  const [solset, setSolset] = useState({ 1: "hel" });

  const [download, setDownload] = useState(false);

  useEffect(() => {
    var arr = [["Question number", "Answer"]];
    var loc = JSON.parse(JSON.stringify(solset));

    for (var key in loc) {
      if (loc.hasOwnProperty(key)) {
        arr.push([key, loc[key]]);
      }
    }

    setCSV(arr);
  }, [solset]);

  const handleSubmit = () => {
    var loc = JSON.parse(JSON.stringify(solset));
    loc[current] = document.getElementById("answer").value;
    document.getElementById("answer").value = "";

    console.log(loc);
    setSolset(loc);
    setCurrent(current + 1);
  };

  const classes = useStyles();

  return (
    <Grid style={{ margin: "2em" }} container spacing={1}>
      <Grid item container spacing={1} xs={10}>
        <Grid item xs={12}>
          <div class="problem">
            <img src={`${n}/${current.toString()}.png`} class="img-qn" />
          </div>
        </Grid>
        <Grid item container xs={2}>
          <Grid item xs={12}>
            <textarea
              id="answer"
              placeholder="Submit answer..."
              // defaultValue={}
              name="Text1"
              cols="105"
              rows="5"
            ></textarea>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => handleSubmit()}
              variant="filled"
              className={classes.submit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => setDownload(true)}
              variant="filled"
              style={{ backgroundColor: "red  " }}
            >
              Download
            </Button>
          </Grid>

          {download ? <CSVDownload data={CSV} target="_blank" /> : null}
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <div class="sec">
          {[...Array(qns)].map((elementInArray, index) => (
            <li onClick={() => setCurrent(index + 1)} id="myUL" key={index}>
              Q #{(index + 1).toString()}
            </li>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
