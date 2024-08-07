import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export const runSimulation = async (data, setResponse, setIsSimulating) => {
  console.log("running simulation");
  try {
    const response = await axios.post("/data", { data });
    console.log("POST response:", response.data);

    reload(setResponse, setIsSimulating);
  } catch (error) {
    console.error("There was an error sending the data!", error);
  }
};

export const reload = async (setResponse, setIsSimulating) => {
  fetch("/data").then((res) =>
    res.json().then((data) => {
      console.log(data);
      setResponse(data);
      setIsSimulating(false);
    })
  );
};
