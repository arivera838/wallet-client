import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Alert, GetWalletModal, SelectCurrency } from "./common";
import { blueGray } from "../lib/colors";
import { cardStyles } from "../lib/styles";
import { formatBalance, formatDate } from "../lib/utils";
import { addCurrency, resetState, updateTotalBalance } from "../redux/actions";
import AddClientModal from "./common/AddClientModal";
import useApi, { NEW_ClIENT_ENDPOINT, WALLET_GET_ENDPOINT } from "../services/client.service";
import CachedIcon from '@material-ui/icons/Cached';
const useStyles = makeStyles({
  card: cardStyles,
  wrapper: {
    padding: 10,
  },
  headerWrapper: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 16,
    fontWeight: 400,
    marginRight: 15,
    color: `${blueGray}`,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "10px",
  },
  title: {
    fontWeight: 400,
    textAlign: "right",
  },
  balance: {
    fontWeight: "bold",
    marginRight: 5,
    marginLeft: 8,
  },
  formWrapper: {
    display: "flex",
    alignItems: "baseline",
  },

  // responsive styles
  "@media (max-width: 768px)": {
    headerWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    time: { margin: "0 0 15px" },
    title: { fontSize: 18 },
  },
});

function Summary({ total, currencies, onUpdateBalance, onDeposit, onReset }) {
  const { balance, currency } = total;
  const [open, setOpen] = useState(false);
  const [openGet, setOpenGet] = useState(false);
  const classes = useStyles();

  const [alertMessage, setAlertMessage] = useState('');

  const { loading, data, error, post, get } = useApi();
  const [dataClient, setDataClient] = useState()
  const modalProps = {
    title: "Create new client"
  };

  const handleAddClient = async (parameters) => {
    try {
      const response = await post(NEW_ClIENT_ENDPOINT, parameters)

      if(!!error) 
        throw error;

      setDataClient(response)
      setAlertMessage('Success new client created');
      setTimeout(() => {
        setAlertMessage('');
        setOpen(false)
      }, 1000)
    } catch (error) {
      setAlertMessage(error.response.data);
      setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }
  }

  const handleGetWallet = async (parameters) => {
    try {
      const response = await post(WALLET_GET_ENDPOINT, parameters)

      if(!!error) 
        throw error;

      onReset()
      onDeposit(response)
      setDataClient(response)

      setTimeout(() => {
        setOpenGet(false)
      }, 1000)
    } catch (error) {
      console.log("🚀 ~ handleGetWal ~ error:", error)
      setAlertMessage(error.response.data);
      setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }
  }

  return (
    <Card className={classes.card}>
      <div className={classes.wrapper}>
        <div className={classes.headerWrapper}>
          <CardHeader title={`👋 ${!!dataClient?.fullName ? dataClient?.fullName : '' }  Welcome!`} />
          <div className={classes.time}>{formatDate().long}</div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              onReset()
              setDataClient({})
              setOpen(true)
            }}
          >
            New client
          </Button>
          < AddClientModal setOpen={setOpen} handleAddClient={handleAddClient} open={open} modalProps={modalProps} />
        </div>

        <Divider variant="middle" />

        <CardContent className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            Your current account balance is -
            <span className={classes.balance}>{`${formatBalance(
              balance
            )}`}</span>
            <span>{`${currency}`}</span>
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => setOpenGet(true)}
          >
            <CachedIcon/>
          </Button>
          <GetWalletModal setOpen={setOpenGet} onHandleEvent={handleGetWallet} open={openGet} modalProps={modalProps} />
          {/*  <div className={classes.formWrapper}>
            <Typography color="textSecondary">Select currency</Typography>
            <SelectCurrency
              activeCurrency={currency}
              currencies={currencies}
              onSelect={handleSelect}
            />
          </div> */}
        </CardContent>
      </div>


      <Alert
        message={alertMessage}
        open={Boolean(alertMessage)}
        setOpen={setAlertMessage}
      />
    </Card>
  );
}

Summary.propTypes = {
  total: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateBalance: PropTypes.func.isRequired,
};

const mapStateToProps = ({ total, currencies }) => ({
  total,
  currencies: currencies.map(({ currency }) => currency),
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateBalance: ({ balance, currency }) =>
  dispatch(updateTotalBalance({ balance, currency, change: true })),
  onDeposit: (deposit) => dispatch(addCurrency(deposit)),
  onReset: () => dispatch(resetState()),
});

export { Summary as UnconnectedSummary };

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
