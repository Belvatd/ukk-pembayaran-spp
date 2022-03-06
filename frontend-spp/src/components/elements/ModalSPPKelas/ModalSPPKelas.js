import React from 'react';
import { Grid, Typography, Modal, Backdrop, Fade, Button } from "@material-ui/core";
import { useStyles } from '../../fragments/css';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';

export default function ModalSPPKelas({
  openModal, closeModal, generalForm, saveData, title
}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={openModal}>
            <div className={classes.paperModal}>
              <Grid container justify="center" alignItems="center">
                <Typography variant="p" className={classes.titleModal}>{title}</Typography>
                <Grid container justify="center" className={classes.formContainer}>
                  {generalForm}
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={ev => saveData(ev)}
                  className={classes.buttonSave}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
    </div>
  )
}

ModalSPPKelas.defaultProps = {
  openModal: '',
  closeModal: '',
  saveData: () => { },
  generalForm:'',
  title:''
};

ModalSPPKelas.propTypes = {
  openModal: PropTypes.string,
  closeModal: PropTypes.string,
  saveData: PropTypes.func,
  generalForm: PropTypes.string,
  title: PropTypes.string
};