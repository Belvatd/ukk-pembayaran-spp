import React from 'react';
import { Grid, Typography, Modal, Backdrop, Fade, TextField, Button } from "@material-ui/core";
import { useStyles } from '../css';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';

export default function EditSiswaModal({
  openModal, closeModal, saveData, urlImage, generalForm, handleChangeKelas,
  valueKelas, contentKelas, handleChangeSpp, valueSpp, contentSpp, imageOnChange
}) {
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
            <Typography variant="p" className={classes.titleModal}>Edit Data Siswa</Typography>
            <Grid container justify="center" className={classes.formContainer}>
              <Grid container justify="center" lg={4} xs={12}>
                <img className={classes.bodyImgSiswa} src={urlImage} alt="profilePic" />
              </Grid>
              <Grid container justify="center" lg={7} xs={12} className={classes.formContainer}>
                {generalForm}
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>Kelas</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      select
                      variant="outlined"
                      size="small"
                      onChange={handleChangeKelas}
                      value={valueKelas}
                      className={classes.inputField}>
                      {contentKelas}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>SPP</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      select
                      variant="outlined"
                      size="small"
                      onChange={handleChangeSpp}
                      value={valueSpp}
                      className={classes.inputField}>
                      {contentSpp}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>Image</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      required
                      accept="image/*"
                      className={classes.inputField}
                      id="contained-button-file"
                      type="file"
                      onChange={imageOnChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={saveData}
                className={classes.buttonSave}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  </div>;
}

EditSiswaModal.defaultProps = {
  openModal: '',
  closeModal: '',
  saveData: () => { },
  urlImage: '',
  generalForm: '',
  handleChangeKelas: '',
  valueKelas: '',
  contentKelas: '',
  handleChangeSpp: '',
  valueSpp: '',
  contentSpp: '',
  imageOnChange: ''
};

EditSiswaModal.propTypes = {
  openModal: PropTypes.string,
  closeModal: PropTypes.string,
  saveData: PropTypes.func,
  urlImage: PropTypes.string,
  generalForm: PropTypes.string,
  handleChangeKelas: PropTypes.string,
  valueKelas: PropTypes.string,
  contentKelas: PropTypes.string,
  handleChangeSpp: PropTypes.string,
  valueSpp: PropTypes.string,
  contentSpp: PropTypes.string,
  imageOnChange: PropTypes.string
};

