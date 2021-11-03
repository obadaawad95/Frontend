import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
import { columns } from "../../mock/mock";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import { margin } from "@mui/system";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const BasicFilteringGrid = ({ rows }) => {
  let x = rows;
  const [newRows, setNewRows] = React.useState(x);
  const [sum, setSum] = React.useState(0);
  const [title, setTitle] = React.useState("1990");
  React.useEffect(() => {
    if (rows) {
      setNewRows(rows);
    }
  }, [rows]);

  // console.log("eee", newRows, x);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let ss = 0;
  const getAverage = () => {
    const ages = newRows?.map((user, index) => user?.birthdate);

    const yy = ages?.map(
      (age) => new Date().getFullYear() - new Date(age).getFullYear()
    );
    for (let i in yy) {
      ss += yy[i];
    }
    ss = ss / newRows.length;
    setSum(ss);
    setState({ ...state, open: true });
  };
  const GetMale = () => {
    const x = rows?.filter((r) => r?.gender === "M");
    // console.log("x", x);
    setNewRows(x);
  };
  const GetFemale = () => {
    const x = rows?.filter((r) => r?.gender === "F");
    // console.log("x", x);
    setNewRows(x);
  };
  const [yearText, setyearText] = React.useState("");
  const handleChangeText = (event) => {
    setyearText(event.target.value);
  };
  const GetYearUsers = () => {
    const x = rows?.filter(
      (r) => new Date(r?.age).getFullYear().toString() === yearText
    );
    setNewRows(x);
  };
  const [yearText1, setyearText1] = React.useState("");
  const handleChangeText1 = (event) => {
    setyearText1(event.target.value);
  };
  const [yearText2, setyearText2] = React.useState("");
  const handleChangeText2 = (event) => {
    setyearText2(event.target.value);
  };
  const GetYearUsers1 = () => {
    const x = rows?.filter(
      (r) =>
        new Date(r?.age).getFullYear().toString() >= yearText1 &&
        new Date(r?.age).getFullYear().toString() <= yearText2
    );
    setNewRows(x);
  };
  const retOld = () => {
    setNewRows(rows);
  };
  function RatingInputValue(props) {
    return (
      <div>
        <Button onClick={retOld} style={{ fontSize: 20 }}>
          Cancel Filters
        </Button>
        <br></br>
        <Button onClick={getAverage}>Average Age</Button>
        <br></br>
        <Button onClick={GetMale}>Male</Button>
        <br></br>
        <Button onClick={GetFemale}>Female</Button>
        <br></br>
        <Button onClick={GetYearUsers}>Users in this Year</Button>
        <TextField
          key="text1"
          id="outlined-basic"
          label="Insert the year"
          value={yearText}
          onChange={handleChangeText}
          // autoFocus={true}
        />
        <br></br>
        <Button onClick={GetYearUsers1}>Users between these Year</Button>
        <TextField
          key="text2"
          id="outlined-basic"
          label="Insert the first year"
          value={yearText1}
          onChange={handleChangeText1}
          // autoFocus={true}
        />
        <TextField
          key="text3"
          id="outlined-basic"
          label="Insert the second year"
          value={yearText2}
          onChange={handleChangeText2}
          // autoFocus={true}
        />

        {/* <input type="text" value={yearText} onChange={handleChangeText} /> 
          variant="outlined"*/}
      </div>
    );
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={newRows}
        components={{
          Toolbar: GridToolbar,
          FilterPanel: RatingInputValue,
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={sum}
        key={vertical + horizontal}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          The average age of all users is : {sum}
        </Alert>
      </Snackbar>
    </div>
  );
};
