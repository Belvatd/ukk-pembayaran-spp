import React, { useEffect, useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import TablePagination from '@mui/material/TablePagination';
import {
  Grid, Paper, Table, TableCell, TableContainer, TableHead,
  TableRow, TableBody, Typography, Button, Snackbar, Modal,
  Backdrop, Fade, TextField, Fab
} from "@material-ui/core";
import { IconButton } from '@mui/material';
import ModalKelas from '../../elements/ModalSPPKelas';
import { useStyles } from '../css'

// URL
import { base_url } from "../../../configs/config"
import axios from "axios"

// ICON
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';




export default function DataKelasFragment() {

  // data from database
  const [data, setData] = useState([])

  useEffect(() => {
    getKelas()
  }, [])

  const classes = useStyles()
  let user = JSON.parse(localStorage.getItem("user"))

  const [values, setValues] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama_petugas,
    nama_kelas: "",
    kompetensi_keahlian: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${values.token}` }
    }
    return header
  }

  // Axios operation
  const getKelas = () => {
    let url = base_url + "/kelas"
    axios.get(url, headerConfig())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const saveData = (event) => {
    handleModalClose()
    event.preventDefault()
    setModalEdit(false)

    let loadData = {
      nama_kelas: values.nama_kelas,
      kompetensi_keahlian: values.kompetensi_keahlian,
      id_kelas: values.id_kelas
    }
    let url = base_url + "/kelas"

    if (values.action === "add") {
      axios.post(url, loadData, headerConfig())
        .then(res => {
          setSnackAlert(true)
          getKelas()
          setValues({ ...values, ["message"]: res.data.message })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.put(url, loadData, headerConfig())
        .then(res => {
          setSnackAlert(true)
          getKelas()
          setValues({ ...values, ["message"]: res.data.message })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const deleteData = (selected) => {
    if (window.confirm("Apakah anda yakin akan menghapus data " + selected.nama_kelas + " ?")) {
      let url = base_url + "/kelas/" + selected.id_kelas
      axios.delete(url, headerConfig())
        .then(res => {
          setValues({ ...values, ["message"]: res.data.message })
          setSnackAlert(true)
          getKelas()
        })
        .catch(err => console.log(err))
    }
  }

  // modal handling
  const [modalEdit, setModalEdit] = useState(false)

  const editTriger = (item) => {
    setModalEdit(true)
    setValues({
      ...values,
      ["nama_kelas"]: item.nama_kelas,
      ["kompetensi_keahlian"]: item.kompetensi_keahlian,
      ["id_kelas"]: item.id_kelas,
      ["action"]: "edit"
    })
  }

  const addTriger = () => {
    setValues({
      ...values,
      ["nama_kelas"]: "",
      ["kompetensi_keahlian"]: "",
      ["id_kelas"]: "",
    })
    setModalEdit(true)
    setValues({ ...values, ["action"]: "add" })
  }

  const handleModalClose = () => {
    setModalEdit(false)
    setValues({
      ...values,
      ["nama_kelas"]: "",
      ["kompetensi_keahlian"]: "",
      ["id_kelas"]: "",
      ["action"]: ""
    })
  }

  // array for modal
  const formModal = [
    { label: "Kelas", val: "nama_kelas", theValue: values.nama_kelas },
    { label: "Kompetensi Keahlian", val: "kompetensi_keahlian", theValue: values.kompetensi_keahlian },
  ]

  // snackbarHandling
  const [snackAlert, setSnackAlert] = useState(false)
  const handleSnackClose = () => {
    setSnackAlert(false)
  }

  const columns = [
    { id: 'namaKelas', label: 'Nama Kelas', align: 'center' },
    { id: 'kompetensi', label: 'Kompetensi', align: 'center' },
    { id: 'aksi', label: 'Aksi', align: 'center' },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (values.role === "admin") {
    return (
      <>
        <h2 className="titlePage">Data Kelas</h2>
        <Paper sx={{ width: '95%', overflow: 'hidden' }} style={{ marginRight: '2rem', marginLeft: '2rem' }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ fontWeight: '600', fontFamily: 'Poppins', color: '#fff', backgroundColor: '#0275d8', lineHeight: '16px' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <TableRow hover>
                      <TableCell key="namaKelas" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.nama_kelas}
                      </TableCell>
                      <TableCell key="kompetensi" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.kompetensi_keahlian}
                      </TableCell>
                      <TableCell key="aksi" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        <IconButton color="primary" onClick={() => editTriger(item)}>
                          <EditIcon />
                        </IconButton>
                        {/* Button delete */}
                        <IconButton color="error" onClick={() => deleteData(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ alignContent: 'center' }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Grid container justify="flex-end" className={classes.footerContainer}>
            <Fab variant="extended" color="primary" aria-label="add" className={classes.footerButton} onClick={() => addTriger()}>
              <AddCircleIcon /> Tambah Data Kelas
            </Fab>
          </Grid>
        </Paper>
        <ModalKelas
          title='Form Kelas'
          openModal={modalEdit}
          closeModal={handleModalClose}
          generalForm=
          {formModal.map(item => (
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="p" className={classes.labelModal}> {item.label} </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={handleChange(item.val)}
                  value={item.theValue}
                  className={classes.inputField}>
                </TextField>
              </Grid>
            </Grid>
          ))}
          saveData={ev => saveData(ev)}
        />

        <Snackbar
          open={snackAlert}
          autoHideDuration={6000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            {values.message}
          </Alert>
        </Snackbar>
      </>
    )
  } else {
    window.location = "/"
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    window.location = "/"
  }


}