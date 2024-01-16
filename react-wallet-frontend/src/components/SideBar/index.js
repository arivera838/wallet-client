import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import DepositBalance from "./DepositBalance";
import AddPay from "./AddPay";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: 300,
  },
  [theme.breakpoints.down("sm")]: {
    container: {
      display: "flex",
      flexDirection: "row",
      height: 150,
    },
    space: {
      marginRight: 30,
    },
  },
}));

function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DepositBalance />
      <div className={classes.space} />
      <AddPay />
    </div>
  );
}

export default Sidebar;
