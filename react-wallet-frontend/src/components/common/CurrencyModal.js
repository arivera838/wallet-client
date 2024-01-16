import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SelectCurrency from "./SelectCurrency";
import ModalButton from "./ModalButton";
import { blueGray } from "../../lib/colors";
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles({
  form: {
    width: '400px',
    margin: '0 auto 2rem',
    padding: "5px 10px",
  },
  loader: {
    color: `${blueGray}`,
    padding: 10,
    marginTop: 8,
  },
  textField: { marginTop: 0 },
  formButton: { margin: 10 },
});

function CurrencyModal({
  open,
  setOpen,
  onClick,
  modalProps,
  onClickConfirm
}) {
  const classes = useStyles();
  const [fullExchange, setFullExchange] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [viewAlertSuccess, setViewAlertSuccess] = useState(false);
  const { title, description, label } = modalProps;


  const [parameters, setParameters] = useState({
    document: '',
    phoneNumber: '',
    amount: '',
  });

  const handleClose = () => {
    setFullExchange(false);
    setOpen(false);
  };

  const [errorsWallet, setErrorsWallet] = useState({
    document: false,
    phoneNumber: false,
    amount: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setParameters({ ...parameters, [id]: value });
    setErrorsWallet({ ...errorsWallet, [id]: false }); // Clear validation error on input change
  };

  const handleSubmitWallet = async (e) => {
    try {
      e.preventDefault();

      // Validation logic
      const newErrors = {};
      if (!parameters?.document || isNaN(parameters?.document)) {
        newErrors.document = true;
      }
      if (!parameters?.phoneNumber || isNaN(parameters?.phoneNumber)) {
        newErrors.phoneNumber = true;
      }
      if (!parameters?.amount || isNaN(parameters?.amount)) {
        newErrors.amount = true;
      }

      if (Object.keys(newErrors).length === 0) {
        // All fields are valid, proceed with submission
        const response = await onClick(parameters)

        if (title === 'Add a pay') {
          setSessionId(response.sessionId)
          setViewAlertSuccess(true)
        }
      } else {
        // Some fields are invalid, display validation errors
        setErrorsWallet(newErrors);
      }
    } catch (error) {
      if (title === 'Add a pay') {
        setViewAlertSuccess(false)
      }
    }
  };

  const [formData, setFormData] = useState({
    code: '',
  });

  const [errors, setErrors] = useState({
    code: false
  });

  useEffect(() => {
    if(!!open && title === 'Add a pay'){
      setViewAlertSuccess(false)
      setParameters({
        document: '',
        phoneNumber: '',
        amount: '',
      })
      setFormData({
        code: '',
      })
      setSessionId('')
    }
  }, [open])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      code: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      code: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData?.code || isNaN(formData?.code)) {
      newErrors.code = true;
    }
    if (Object.keys(newErrors).length === 0) {
      const request = {
        sessionId,
        code: formData?.code
      }
      const response = await onClickConfirm(request)
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <div className={classes.form}>
            <form onSubmit={handleSubmitWallet}>
              <TextField
                fullWidth
                id="document"
                label="Document"
                type="number"
                value={parameters?.document}
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errorsWallet.document}
                helperText={errorsWallet.document ? 'Document is required and must be a number' : ''}
              />
              <TextField
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                type="number"
                value={parameters?.phoneNumber}
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errorsWallet.phoneNumber}
                helperText={errorsWallet.phoneNumber ? 'Phone Number is required and must be a number' : ''}
              />
              <TextField
                fullWidth
                id="amount"
                label="Amount"
                type="number"
                value={parameters?.amount}
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errorsWallet.amount}
                helperText={errorsWallet.amount ? 'Amount is required and must be a number' : ''}
              />
              <Button style={{ marginTop: '1rem' }} type="submit" variant="contained" color="primary">
                send
              </Button>
            </form>
          </div>

          {
            !!viewAlertSuccess && (
              <>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Confirm the payment, with the code sent to your email address
                </Alert>

                <form onSubmit={handleSubmit}>
                  <Grid style={{ width: "320px", margin: "1rem auto" }} container spacing={2}>

                    <Grid item xs={12} key={'code'}>
                      <TextField
                        fullWidth
                        name='code'
                        label='Code'
                        variant="outlined"
                        type="tel"
                        value={formData.code}
                        onChange={handleChange}
                        error={errors.code}
                        helperText={errors.code ? 'Code Required' : ''}
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" variant="contained" color="primary">
                    Confirm payment
                  </Button>
                </form>
              </>
            )
          }

        </DialogContent>

        <DialogActions>
          {/* <ModalButton
            setFullExchange={setFullExchange}
            onSave={onClick}
            state={state}
            setState={setState}
            exchangeCurrency={exchangeCurrency}
          /> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

CurrencyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  modalProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClickConfirm: PropTypes.func.isRequired,
};

CurrencyModal.defaultProps = {
  loading: false,
};

export default CurrencyModal;
