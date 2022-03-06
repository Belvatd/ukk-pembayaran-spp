import React from 'react';
import { Grid, Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import { useStyles } from '../css';
import PropTypes from 'prop-types';

export default function ModalInfoPerson({ imageUrl, content, openModal, closeModal }) {
  const classes = useStyles();
  return <div>
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
          {/* body card start */}
          <Grid container justify="center" alignItems="center">
            <Typography variant="h4" className={classes.titleModal} >Detail Petugas</Typography>
            <Grid container justify="center" className={classes.formContainer}>
              <Grid container justify="center" lg={4} xs={12}>
                <img className={classes.bodyImgAdmin} src={imageUrl} alt="profilePic" />
              </Grid>
              <Grid container justify="center" lg={7} xs={12} className={classes.formContainer}>
                <Grid container alignItems="center">
                  {content}
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid container justify="center" lg={4} xs={12}>
              <img className={classes.bodyImgAdmin} src={imageUrl} alt="profilePic" />
            </Grid>
            <Grid container className={classes.formContainer} justify="center">
              <Grid container lg={8}>
                {content}
              </Grid>
            </Grid> */}
          </Grid>
        </div>
      </Fade>
    </Modal>
  </div>;
}

ModalInfoPerson.defaultProps = {
  imageUrl: '',
  content: '',
  openModal: '',
  closeModal: ''
};

ModalInfoPerson.propTypes = {
  imageUrl: PropTypes.string,
  content: PropTypes.string,
  openModal: PropTypes.string,
  closeModal: PropTypes.string
};
