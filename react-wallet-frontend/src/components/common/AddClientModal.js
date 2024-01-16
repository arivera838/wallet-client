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

function AddClientModal({
  open,
  setOpen,
  modalProps,
  handleAddClient
}) {
  const classes = useStyles();
  const [fullExchange, setFullExchange] = useState(false);
  const { title } = modalProps;

  const [parameters, setParameters] = useState({
    document: '',
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    document: false,
    fullName: false,
    phoneNumber: false,
    email: false,
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
    if (!parameters.fullName) {
      newErrors.fullName = true;
    }
    if (!parameters.phoneNumber) {
      newErrors.phoneNumber = true;
    }
    if (!parameters.email) {
      newErrors.email = true;
    }

    if (Object.keys(newErrors).length === 0) {
      handleAddClient(parameters)
    } else {
      setErrors(newErrors);
    }
  };


  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
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
                id="fullName"
                value={parameters.fullName}
                label="Full Name"
                type="text"
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errors.fullName}
                helperText={errors.fullName ? 'Full Name is required' : ''}
              />
              <TextField
                fullWidth
                id="email"
                value={parameters.email}
                label="Email Address"
                type="email"
                onChange={handleInputChange}
                className={classes.textField}
                disabled={fullExchange}
                error={errors.email}
                helperText={errors.email ? 'Email address is required' : ''}
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
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

AddClientModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleAddClient : PropTypes.func.isRequired,
  modalProps: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

AddClientModal.defaultProps = {
  loading: false,
};

export default AddClientModal;
