import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../GlobalContext";

const SendDataComponent = () => {
  const { responce, setresponce } = useContext(GlobalContext);
  const { data, setdata } = useContext(GlobalContext);
  const { startSim, setStartSim } = useContext(GlobalContext);

  const handleChange = (e) => {
    //localhost:3000/static/media/background.0ced967e8b684bdc94b4.png
    http: setdata(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/data", { data }); // Using relative URL
      console.log(response.data);
    } catch (error) {
      console.error("There was an error sending the data!", error);
    }
  };
  /*
  useEffect(() => {
    console.log("data changed");
    runSimulation(data);
  }, [data]);

  const runSimulation = async (data) => {
    console.log("running simulation");
    try {
      const response = await axios.post("/data", { data }); // Using relative URL
      console.log(response.data);
    } catch (error) {
      console.error("There was an error sending the data!", error);
    }
  };*/

  // Using useEffect for single rendering
  const reload = async (e) => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        console.log(data);
        setresponce({
          name: data.members,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
      })
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>React and flask</h1>
        {/* Calling a data from setdata for showing */}
        <p>{responce.name}</p>
        <p>{responce.age}</p>
        <p>{responce.date}</p>
        <p>{responce.programming}</p>
        <button onClick={reload} />
      </header>

      <form onSubmit={handleSubmit}>
        <input type="text" value={data} onChange={handleChange} />
        <button type="submit">Send Data</button>
      </form>
    </div>
  );
};

export default SendDataComponent;
