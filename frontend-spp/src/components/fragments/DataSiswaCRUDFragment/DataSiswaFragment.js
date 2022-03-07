import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Alert from '@material-ui/lab/Alert';
import { Grid, Typography, Fab, Snackbar, TextField, MenuItem } from "@material-ui/core"
import { useStyles } from '../css'
import { IconButton } from '@mui/material';
import ModalInfoPerson from './InfoSiswaModal';
import EditSiswaModal from './EditSiswaModal';
import AddSiswaModal from './AddSiswaModal';

// URL
import { base_url, siswa_image_url } from "../../../configs/config"
import axios from "axios"

// // ICON
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';

const columns = [
  { id: 'nisn', label: 'NISN', align: 'center' },
  { id: 'nis', label: 'NIS', align: 'center' },
  { id: 'kelas', label: 'Kelas', align: 'center' },
  { id: 'nama', label: 'Nama', align: 'center' },
  { id: 'tunggakan', label: 'Tunggakan', align: 'center' },
  { id: 'aksi', label: 'Aksi', align: 'center' }
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Data from database
  const [data, setData] = React.useState([]) //data siswa
  const [dataKelas, setDataKelas] = React.useState([]) //data kelas
  const [dataSpp, setDataSpp] = React.useState([]) //data spp
  const [dataTunggakan, setDataTunggakan]=React.useState([]) //data tunggakan


  // axios function
  React.useEffect(() => {
    getSiswa();
    getSPP();
    getKelas();
    getTunggakan();
  }, [])

  // Axios operation
  const getSiswa = () => {
    let url = base_url + "/siswa/for-" + values.role
    axios.get(url, headerConfig())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getSPP = () => {
    let url = base_url + "/spp"
    axios.get(url, headerConfig())
      .then(res => {
        setDataSpp(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getKelas = () => {
    let url = base_url + "/kelas"
    axios.get(url, headerConfig())
      .then(res => {
        setDataKelas(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  let loadData = {
    nisn: data.nisn,
    tahun_dibayar: [2021,2022],
  }
  const getTunggakan = () => {
    let url = base_url + "/transaksi/for-siswa/getTunggakan"
    axios.post(url, loadData ,headerConfig())
      .then(res => {
        setDataTunggakan(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const saveData = (event) => {
    event.preventDefault()
    handleModalClose()
    let form = new FormData()
    form.append("nisn", values.nisn)
    form.append("nis", values.nis)
    form.append("nama", values.nama_siswa)
    form.append("id_kelas", values.id_kelas)
    form.append("alamat", values.alamat)
    form.append("no_telp", values.no_telp)
    form.append("id_spp", values.id_spp)
    form.append("username", values.username)
    form.append("password", values.password)

    if (values.image) {
      form.append("image", values.image)
    }

    let urlSave = base_url + "/siswa"
    if (values.action === "add") {
      axios.post(urlSave, form, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getSiswa()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.put(urlSave, form, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getSiswa()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const deleteData = (selected) => {
    if (window.confirm("Apakah anda yakin akan menghapus data " + selected.nama + " ?")) {
      let url = base_url + "/siswa/" + selected.nisn
      axios.delete(url, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getSiswa()
        })
        .catch(err => console.log(err))
    }
  }

  // style
  const classes = useStyles()

  // data from local storage
  let user = JSON.parse(localStorage.getItem("user"))
  const [values, setValues] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama_petugas,
    nisn: "",
    nis: "",
    nama_siswa: "",
    id_kelas: 0,
    kelas: {},
    alamat: "",
    no_telp: "",
    id_spp: 0,
    spp: {},
    username: "",
    password: "",
    image: "",
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

  // modal handling
  const [modalEdit, setModalEdit] = React.useState(false)
  const [modalAdd, setModalAdd] = React.useState(false)
  const [modalInfo, setModalInfo] = React.useState(false)

  const editTriger = (item) => {
    setModalEdit(true)
    setValues({
      ...values,
      "nisn": item.nisn,
      "nis": item.nis,
      "nama_siswa": item.nama,
      "id_kelas": item.id_kelas,
      "alamat": item.alamat,
      "no_telp": item.no_telp,
      "id_spp": item.id_spp,
      "username": item.username,
      "image": item.image,
    })
  }

  const addTriger = () => {
    setModalAdd(true)
    setValues({ ...values, "action": "add" })
  }

  const infoTriger = (item) => {
    setModalInfo(true)
    setValues({
      ...values,
      "nisn": item.nisn,
      "nis": item.nis,
      "nama_siswa": item.nama,
      "kelas": item.kelas,
      "alamat": item.alamat,
      "no_telp": item.no_telp,
      "spp": item.spp,
      "username": item.username,
      "image": item.image,
      "action": "edit"
    })
  }

  const handleModalClose = () => {
    setModalEdit(false)
    setModalAdd(false)
    setModalInfo(false)
    setValues({
      ...values,
      "nisn": "",
      "nis": "",
      "nama_siswa": "",
      "id_kelas": "",
      "alamat": "",
      "no_telp": "",
      "id_spp": "",
      "username": "",
      "image": "",
      "action": ""
    })
  }

  // array for modal
  const formModal = [
    { label: "NISN", val: "nisn", theValue: values.nisn },
    { label: "NIS", val: "nis", theValue: values.nis },
    { label: "Nama", val: "nama_siswa", theValue: values.nama_siswa },
    { label: "Alamat", val: "alamat", theValue: values.alamat },
    { label: "No Telp", val: "no_telp", theValue: values.no_telp },
    { label: "Username", val: "username", theValue: values.username },
    { label: "Password", val: "password", theValue: values.password },
  ]

  const formModalInfo = [
    { label: "NISN", theValue: values.nisn },
    { label: "NIS", theValue: values.nis },
    { label: "Nama", theValue: values.nama_siswa },
    { label: "Kelas", theValue: values.kelas.nama_kelas },
    { label: "Alamat", theValue: values.alamat },
    { label: "No Telp", theValue: values.no_telp },
    { label: "SPP", theValue: values.spp.nominal },
    { label: "Username", theValue: values.username },
  ]

  // snackbarHandling
  const [snackAlert, setSnackAlert] = React.useState(false)
  const handleSnackClose = () => {
    setSnackAlert(false)
  }

  if (values.role === "admin" || values.role === "petugas") {
    return (
      <>
        <h2 className="titlePage">Data Siswa</h2>
        <Paper sx={{ width: '95%', overflow: 'hidden' }} style={{ marginLeft: '2rem' }}>
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
                        {item.nisn}
                      </TableCell>
                      <TableCell key="nama_siswa" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.nis}
                      </TableCell>
                      <TableCell key="nama_petugas" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.kelas.nama_kelas}
                      </TableCell>
                      <TableCell key="nama" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.nama}
                      </TableCell>
                      <TableCell key="telp" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        Rp{dataTunggakan.data || '0'}
                      </TableCell>
                      <TableCell key="aksi" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        <IconButton color="info" onClick={() => infoTriger(item)}>
                          <InfoIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => editTriger(item)}>
                          <EditIcon />
                        </IconButton>
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

        <ModalInfoPerson
          openModal={modalInfo}
          closeModal={handleModalClose}
          imageUrl={siswa_image_url + "/" + values.image}
          content={
            formModalInfo.map(item => (
              <Grid container justify="flex-end">
                <Grid item lg={2}>
                  <Typography variant="p" className={classes.labelModal} >{item.label} </Typography>
                </Grid>
                <Grid container justify="center" lg={3}>:</Grid>
                <Grid item lg={6}>
                  <Typography variant="p" className={classes.valueModal}>{item.theValue}</Typography>
                </Grid>
              </Grid>
            ))
          }
        />
        <EditSiswaModal
          openModal={modalEdit}
          closeModal={handleModalClose}
          saveData={ev => saveData(ev)}
          urlImage={siswa_image_url + "/" + values.image}
          generalForm={
            formModal.map(item => (
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
            ))
          }
          handleChangeKelas={handleChange("id_kelas")}
          valueKelas={values.id_kelas}
          contentKelas={
            dataKelas.map(itemMenu => (
              <MenuItem key={itemMenu.id_kelas} value={itemMenu.id_kelas}>
                {itemMenu.nama_kelas}
              </MenuItem>
            ))}
          handleChangeSpp={handleChange("id_spp")}
          valueSpp={values.id_spp}
          contentSpp={
            dataSpp.map(itemMenu => (
              <MenuItem key={itemMenu.id_spp} value={itemMenu.id_spp}>
                {"Rp" + itemMenu.nominal}
              </MenuItem>
            ))}
          imageOnChange={event => setValues({ ...values, "image": event.target.files[0] })}
        />
        <AddSiswaModal
          openModal={modalAdd}
          closeModal={handleModalClose}
          generalInput=
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
          handleChangeKelas={handleChange("id_kelas")}
          valueKelas={values.id_kelas}
          contentKelas=
          {dataKelas.map(itemMenu => (
            <MenuItem key={itemMenu.id_kelas} value={itemMenu.id_kelas}>
              {itemMenu.nama_kelas}
            </MenuItem>
          ))}
          handleChangeSPP={handleChange("id_spp")}
          valueSPP={values.id_spp}
          contentSPP=
          {dataSpp.map(itemMenu => (
            <MenuItem key={itemMenu.id_spp} value={itemMenu.id_spp}>
              {"Rp" + itemMenu.nominal}
            </MenuItem>
          ))}
          setImage={event => setValues({ ...values, "image": event.target.files[0] })}
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
    );
  }
}
