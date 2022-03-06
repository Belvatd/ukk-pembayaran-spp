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
import { IconButton, MenuItem } from '@mui/material';
import EditAdminModal from './EditAdminModal';
import { Grid, Typography, Snackbar, Fab } from "@material-ui/core"
import ModalInfoPerson from './InfoPetugasModal';
import { useStyles } from '../css';
import AddAdminModal from './AddAdminModal';

// URL
import { base_url, admin_image_url } from "../../../configs/config"
import axios from "axios"

// // ICON
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const columns = [
  { id: 'id', label: 'Id', align: 'center' },
  { id: 'nama', label: 'Nama', align: 'center' },
  { id: 'username', label: 'Username', align: 'center' },
  { id: 'role', label: 'Role', align: 'center' },
  { id: 'aksi', label: 'Aksi', align: 'center' },
];

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // data from database
  const [data, setData] = React.useState([])

  // use effect
  React.useEffect(() => {
    getAdmin()
  }, [])


  // axios operation
  const getAdmin = () => {
    let url = base_url + "/petugas"
    axios.get(url, headerConfig())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const saveData = (event) => {
    event.preventDefault()
    handleModalClose()
    let form = new FormData()
    form.append("username", values.username)
    form.append("password", values.password)
    form.append("nama_petugas", values.nama_petugas)
    form.append("level", values.level)
    form.append("id_petugas", values.id_petugas)

    if (values.image) {
      form.append("image", values.image)
    }

    let url = base_url + "/petugas"

    if (values.action === "add") {
      axios.post(url, form, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getAdmin()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.put(url, form, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getAdmin()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const deleteData = (selected) => {
    if (window.confirm("Apakah anda yakin akan menghapus data " + selected.level + " " + selected.nama_petugas + " ?")) {
      let url = base_url + "/petugas/" + selected.id_petugas
      axios.delete(url, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getAdmin()
        })
        .catch(err => console.log(err))
    }
  }

  // prepare auth for fetch data
  const headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${values.token}` }
    }
    return header
  }

  // data local storage
  let user = JSON.parse(localStorage.getItem("user"))
  const [values, setValues] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama_petugas,
    username: "",
    password: "",
    nama_petugas: "",
    level: "",
    image: "",
    id_petugas: 0,
    message: "",
    action: ""
  });

  // data handling local storage
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  // modal handling
  const arrayRole = ["admin", "petugas"]
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState(false);

  const infoTriger = (item) => {
    setModalInfo(true)
    setValues({
      ...values,
      ["nisn"]: item.nisn,
      ["nis"]: item.nis,
      ["nama_siswa"]: item.nama,
      ["kelas"]: item.kelas,
      ["alamat"]: item.alamat,
      ["no_telp"]: item.no_telp,
      ["spp"]: item.spp,
      ["username"]: item.username,
      ["image"]: item.image,
      ["action"]: "edit"
    })
  }

  const editTriger = (item) => {
    setModalEdit(true)
    setValues({ ...values, "action": "edit" })
    setValues({
      ...values,
      ["username"]: item.username,
      ["nama_petugas"]: item.nama_petugas,
      ["level"]: item.level,
      ["image"]: item.image,
      ["id_petugas"]: item.id_petugas,
    });
  }

  const addTriger = () => {
    setModalAdd(true)
    setValues({ ...values, "action": "add" })

  }

  const handleModalClose = () => {
    setModalEdit(false);
    setModalAdd(false);
    setModalInfo(false);
    setValues({
      ...values,
      ["username"]: "",
      ["nama_petugas"]: "",
      ["level"]: "",
      ["image"]: "",
      ["id_petugas"]: "",
      ["password"]: ""
    });
  }

  const formModalInfo = [
    { label: "Nama", theValue: user.nama_petugas },
    { label: "Username", theValue: values.username },
    { label: "Role", theValue: values.role }
  ]

  // snackbarHandling
  const [snackAlert, setSnackAlert] = React.useState(false)
  const handleSnackClose = () => {
    setSnackAlert(false)
  }

  if (values.role === "admin" || values.role === "petugas") {
    return (
      <>
        <h2 className="titlePage">Data Petugas</h2>
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
                        {item.id_petugas}
                      </TableCell>
                      <TableCell key="nama" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.nama_petugas}
                      </TableCell>
                      <TableCell key="username" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.username}
                      </TableCell>
                      <TableCell key="role" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.level}
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
              <AddCircleIcon /> Tambah Data Petugas
            </Fab>
          </Grid>
        </Paper>
        <ModalInfoPerson
          openModal={modalInfo}
          closeModal={handleModalClose}
          imageUrl={admin_image_url + "/" + values.image}
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
        <EditAdminModal
          openModal={modalEdit}
          closeModal={handleModalClose}
          saveData={ev => saveData(ev)}
          urlImage={admin_image_url + "/" + values.image}
          handleChangePetugas={handleChange("nama_petugas")}
          valuePetugas={values.nama_petugas}
          handleChangeUsername={handleChange("username")}
          valueUsername={values.username}
          handleChangePassword={handleChange("password")}
          valuePassword={values.password}
          imageOnChange={event => setValues({ ...values, "image": event.target.files[0] })}
          handleChangeLevel={handleChange("level")}
          valueLevel={values.level}
          contentLevel={
            arrayRole.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))
          }
        />
        <AddAdminModal
        openModal={modalAdd}
        closeModal={handleModalClose}
        handleChangeNama={handleChange("nama_petugas")}
        valueNama={values.nama_petugas}
        handleChangeUsername={handleChange("username")}
        valueUsername = {values.username}
        handleChangePassword = {handleChange("password")}
        valuePassword = {values.password}
        handleChangeLevel = {handleChange("level")}
        valueLevel={values.level}
        contentLevel=
        {arrayRole.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
        setImage = {event => setValues({ ...values, "image": event.target.files[0] })}
        saveData = {ev => saveData(ev)}
        />
        {/* snackbar */}
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
