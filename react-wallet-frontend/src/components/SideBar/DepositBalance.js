import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "@material-ui/core";
import { QueueOutlined as AddIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import CardAction from "./CardAction";
import { sidebarCardStyles } from "../../lib/styles";
import { addCurrency, resetState } from "../../redux/actions";
import useApi, { WALLET_LOAD_ENDPOINT } from "../../services/client.service";
import { Alert } from "../common";

const useStyles = makeStyles({
  card: sidebarCardStyles,
  icon: { marginTop: 10 },
});

const modalProps = {
  title: "Deposit balance",
  description:
    "Add to your total balance by depositing an amount.",
};

function DepositBalance({ activeCurrency, currencies, onDeposit, onReset }) {
  const initialState = { balance: "", currency: activeCurrency };
  const activeCurrencies = useMemo(
    () => currencies.map(({ currency }) => currency),
    [currencies]
  );
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deposit, setDeposit] = useState(initialState);
  const [alertMessage, setAlertMessage] = useState('');
  const { loading, data, error, post, get } = useApi();


  const handleAddBalance = async (parameters) => {
    try {
      await post(WALLET_LOAD_ENDPOINT, parameters)

      if (!!error)
        throw error;

      setTimeout(() => {
        onDeposit(parameters)
      }, 1000)

      setTimeout(() => {
        setAlertMessage('');
        setOpen(false)
      }, 1000)
    } catch (error) {
      setAlertMessage(error.response.data);
    }
  };

  return (
    <Card className={classes.card}>
      <AddIcon className={classes.icon} color="primary" fontSize="large" />
      <CardAction
        open={open}
        setOpen={setOpen}
        state={deposit}
        setState={setDeposit}
        onClick={handleAddBalance}
        currencies={activeCurrencies}
        buttonText="Deposit balance"
        modalProps={modalProps}
      />

      <Alert
        message={alertMessage}
        open={Boolean(alertMessage)}
        setOpen={setAlertMessage}
      />
    </Card>
  );
}

DepositBalance.propTypes = {
  activeCurrency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDeposit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ total, currencies }) => ({
  currencies,
  activeCurrency: total.currency,
});

const mapDispatchToProps = (dispatch) => ({
  onDeposit: (deposit) => dispatch(addCurrency(deposit)),
  onReset: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositBalance);
