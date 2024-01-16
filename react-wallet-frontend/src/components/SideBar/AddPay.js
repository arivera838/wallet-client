import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { MonetizationOnOutlined as CurrencyIcon } from "@material-ui/icons";

import CardAction from "./CardAction";
import { getConversionRates } from "../../lib/currency";
import { sidebarCardStyles } from "../../lib/styles";
import { addCurrency, resetState } from "../../redux/actions";
import useApi, { WALLET_PAY_CONFIRM_ENDPOINT, WALLET_PAY_ENDPOINT } from "../../services/client.service";
import { Alert } from "../common";
import getErrorXml from "../../helpers/getErrorXml";

const useStyles = makeStyles({
  card: sidebarCardStyles,
  icon: { marginTop: 10 },
});

const modalProps = {
  title: "Add a pay",
  description:
    "Create a new pay.",
};


function AddPay({ activeCurrencies, onDeposit, onReset }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { loading, data, error, post, get } = useApi();

  const handleAddPay = async (parameters) => { 
    try {
      const response = await post(WALLET_PAY_ENDPOINT, parameters)

      if(!!error) 
        throw error;

      return response
    } catch (error) {
      setAlertMessage(error.response.data);
      throw error;
    } 
  };

  const handleConfirmPay = async (parameters) => { 
    try {
      const response = await post(WALLET_PAY_CONFIRM_ENDPOINT, parameters)

      if(!!error) 
       throw error;

      onReset()
      onDeposit(response);

      setAlertMessage("Payment confirmed, the money has been deducted from your wallet.");
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
      <CurrencyIcon className={classes.icon} color="primary" fontSize="large" />
      <CardAction
        loading={loading}
        open={open}
        setOpen={setOpen}
        onClick={handleAddPay}
        onClickConfirm={handleConfirmPay}
        buttonText="Add pay"
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

AddPay.propTypes = {
  activeCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ currencies }) => ({
  activeCurrencies: currencies.map(({ currency }) => currency),
});

const mapDispatchToProps = (dispatch) => ({
  onDeposit: (deposit) => dispatch(addCurrency(deposit)),
  onReset: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPay);
