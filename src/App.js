import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BasicFilteringGrid } from "./components";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
const App = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:4000/users";
  // const [counter, setCounter] = useState(0);
  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        // handle success
        setData(result.data?.users);
      })
      .catch((e) => console.log("e", e));
    return () => console.log("hay obada");
  }, []);
  // console.log(data);
  return (
    <div className="list">
      <BasicFilteringGrid rows={data} />
      {/* <button onClick={() => setCounter(counter + 1)}>
        Get Request {counter}
      </button> */}
    </div>
  );
};

export default App;
