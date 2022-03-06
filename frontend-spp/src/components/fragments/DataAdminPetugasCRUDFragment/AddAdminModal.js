import React from 'react';
import { Grid, Typography, Modal, Backdrop, Fade, TextField, Button } from "@material-ui/core";
import { useStyles } from '../css';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';

export default function AddAdminModal({
  openModal, closeModal, handleChangeNama, valueNama, handleChangeUsername, valueUsername,
  handleChangePassword, valuePassword, handleChangeLevel, valueLevel, contentLevel,
  setImage, saveData
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
              <Typography variant="p" className={classes.titleModal}>Tambah Admin</Typography>
              <Grid container justify="center" className={classes.formContainer}>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>Nama</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={handleChangeNama}
                      value={valueNama}
                      className={classes.inputField}>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>Username</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={handleChangeUsername}
                      value={valueUsername}
                      className={classes.inputField}>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>Password</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={handleChangePassword}
                      value={valuePassword}
                      className={classes.inputField}>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="p" className={classes.labelModal}>Role</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      select
                      variant="outlined"
                      size="small"
                      onChange={handleChangeLevel}
                      value={valueLevel}
                      className={classes.inputField}>
                      {contentLevel}
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

AddAdminModal.defaultProps = {
  openModal: '',
  closeModal: '',
  saveData: () => { },
  handleChangeNama:'', 
  valueNama:'', 
  handleChangeUsername:'', 
  valueUsername:'',
  handleChangePassword:'', 
  valuePassword:'', 
  handleChangeLevel:'', 
  valueLevel:'', 
  contentLevel:'',
  setImage:''
};

AddAdminModal.propTypes = {
  openModal: PropTypes.string,
  closeModal: PropTypes.string,
  saveData: PropTypes.func,
  handleChangeNama:PropTypes.string, 
  valueNama:PropTypes.string, 
  handleChangeUsername:PropTypes.string, 
  valueUsername:PropTypes.string,
  handleChangePassword:PropTypes.string, 
  valuePassword:PropTypes.string, 
  handleChangeLevel:PropTypes.string, 
  valueLevel:PropTypes.string, 
  contentLevel:PropTypes.string,
  setImage:PropTypes.string
};