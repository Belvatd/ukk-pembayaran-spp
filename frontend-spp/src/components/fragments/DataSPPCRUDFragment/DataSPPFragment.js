import React, { useEffect, useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import TablePagination from '@mui/material/TablePagination';
import {
  Grid, Paper, Table, TableCell, TableContainer,
  TableHead, TableRow, TableBody, Typography, Button,
  Snackbar, Modal, Backdrop, Fade, TextField, Fab
} from "@material-ui/core"
import { IconButton } from '@mui/material';
import { useStyles } from '../css'

// URL
import { base_url } from "../../../configs/config"
import axios from "axios"

// ICON
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalSPP from '../../elements/ModalSPPKelas';

export default function DataSPPFragment() {

  // data from database
  const [data, setData] = useState([])

  useEffect(() => {
    getSpp()
  }, [])

  const classes = useStyles()
  let user = JSON.parse(localStorage.getItem("user"))

  const [values, setValues] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama_petugas,
    tahun: "",
    nominal: 0,
    id_spp: 0,
    action: ""
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
  const getSpp = () => {
    let url = base_url + "/spp"
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
      tahun: values.tahun,
      nominal: values.nominal,
      id_spp: values.id_spp
    }

    let url = base_url + "/spp"

    if (values.action === "add") {
      axios.post(url, loadData, headerConfig())
        .then(res => {
          setSnackAlert(true)
          getSpp()
          setValues({ ...values, "message": res.data.message })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.put(url, loadData, headerConfig())
        .then(res => {
          setSnackAlert(true)
          getSpp()
          setValues({ ...values, "message": res.data.message })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const deleteData = (selected) => {
    if (window.confirm("Apakah anda yakin akan menghapus data " + selected.id_spp + " ?")) {
      let url = base_url + "/spp/" + selected.id_spp
      axios.delete(url, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getSpp()
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
      "tahun": item.tahun,
      "nominal": item.nominal,
      "id_spp": item.id_spp,
      "action": "edit"
    })
  }

  const addTriger = () => {
    setValues({
      ...values,
      "tahun": "",
      "nominal": "",
      "id_spp": "",
    })
    setModalEdit(true)
    setValues({ ...values, "action": "add" })
  }

  const handleModalClose = () => {
    setModalEdit(false)
    setValues({
      ...values,
      "nama_kelas": "",
      "kompetensi_keahlian": "",
      "id_kelas": "",
      "action": ""
    })
  }

  // array for modal
  const formModal = [
    { label: "Tahun", val: "tahun", theValue: values.tahun },
    { label: "Nominal", val: "nominal", theValue: values.nominal },
  ]

  // snackbarHandling
  const [snackAlert, setSnackAlert] = useState(false)
  const handleSnackClose = () => {
    setSnackAlert(false)
  }

  const columns = [
    { id: 'id', label: 'Id', align: 'center' },
    { id: 'tahun', label: 'Tahun', align: 'center' },
    { id: 'nominal', label: 'Nominal', align: 'center' },
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
                      <TableCell key="id" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.id_spp}
                      </TableCell>
                      <TableCell key="tahun" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.tahun}
                      </TableCell>
                      <TableCell key="nominal" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.nominal}
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
              <AddCircleIcon /> Tambah Data Siswa
            </Fab>
          </Grid>
        </Paper>
        <ModalSPP
          title='Form SPP'
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