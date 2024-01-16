import React, { useState } from "react";
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

import { blueGray } from "../../lib/colors";

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

function GetWalletModal({
  open,
  setOpen,
  modalProps,
  onHandleEvent
}) {
  const classes = useStyles();
  const [fullExchange, setFullExchange] = useState(false);
  const { title } = modalProps;

  const [parameters, setParameters] = useState({
    document: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    document: false,
    phoneNumber: false,
  });

  const handleClose = () => {
    setFullExchange(false);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setParameters({ ...parameters, [id]: value });
    setErrors({ ...errors, [id]: false }); // Clear validation error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!parameters.document) {
      newErrors.document = true;
    }
    if (!parameters.phoneNumber) {
      newErrors.phoneNumber = true;
    }

    if (Object.keys(newErrors).length === 0) {
      onHandleEvent(parameters)
    } else {
      setErrors(newErrors);
    }
  };


  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Get balance</DialogTitle>
          <DialogContent>
            <div className={classes.form}>
              <TextField
                fullWidth
                id="document"
                value={parameters.document}
                label="Document"
                type="number"
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errors.document}
                helperText={errors.document ? 'Document is required' : ''}
              />
              <TextField
                fullWidth
                id="phoneNumber"
                value={parameters.phoneNumber}
                label="Phone Number"
                type="number"
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errors.phoneNumber}
                helperText={errors.phoneNumber ? 'Phone Number is required' : ''}
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              className={classes.button}
              color="primary"
              variant="contained"
            >
              get
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

GetWalletModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onHandleEvent : PropTypes.func.isRequired,
  modalProps: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

GetWalletModal.defaultProps = {
  loading: false,
};

export default GetWalletModal;
