import React from 'react';
import { Grid, Typography, Modal, Backdrop, Fade, TextField, Button } from "@material-ui/core";
import { useStyles } from '../css';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';

export default function AddSiswaModal({
  openModal, closeModal, generalInput, handleChangeKelas, valueKelas, contentKelas,
  handleChangeSPP, valueSPP, contentSPP, setImage, saveData
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
              <Typography variant="p" className={classes.titleModal}>Tambah Siswa</Typography>
              <Grid container justify="center" className={classes.formContainer}>
                {generalInput}
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
                      onChange={handleChangeSPP}
                      value={valueSPP}
                      className={classes.inputField}>
                      {contentSPP}
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
                      onChange={setImage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center">
              {/* button save */}
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
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

AddSiswaModal.defaultProps = {
  openModal: '',
  closeModal: '',
  saveData: () => { },
  generalInput: '',
  handleChangeKelas: '',
  valueKelas: '',
  contentKelas: '',
  handleChangeSPP: '',
  valueSPP: '',
  contentSPP: '',
  setImage: ''
};

AddSiswaModal.propTypes = {
  openModal: PropTypes.string,
  closeModal: PropTypes.string,
  saveData: PropTypes.func,
  generalInput: PropTypes.string,
  handleChangeKelas: PropTypes.string,
  valueKelas: PropTypes.string,
  contentKelas: PropTypes.string,
  handleChangeSPP: PropTypes.string,
  valueSPP: PropTypes.string,
  contentSPP: PropTypes.string,
  setImage: PropTypes.string
};