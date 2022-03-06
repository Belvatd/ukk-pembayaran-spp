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
          <Grid container justify="center" alignItems="center">
            <Typography variant="h4" className={classes.titleModal} >Detail Siswa</Typography>
            <Grid container className={classes.formContainer} justify="center">
              <Grid container lg={3} justify="center" alignItems="center">
                <img className={classes.bodyImgSiswa} src={imageUrl} alt="profilePic" />
              </Grid>
              <Grid container lg={8}>
                {content}
              </Grid>
            </Grid>
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
