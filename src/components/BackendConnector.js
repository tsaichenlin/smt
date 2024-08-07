import axios from "axios";

export const runSimulation = async (data, setResponse) => {
  console.log("running simulation");
  try {
    const response = await axios.post("/data", { data });
    console.log("POST response:", response.data);

    reload(setResponse);
  } catch (error) {
    console.error("There was an error sending the data!", error);
  }
};

export const reload = async (setResponse) => {
  fetch("/data").then((res) =>
    res.json().then((data) => {
      console.log(data);
      setResponse(data);
    })
  );
};
