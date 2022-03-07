import { Paper } from '@material-ui/core';
import React from 'react';
import { base_url } from '../../../configs/config';
import axios from 'axios';
import { useStyles } from '../css'

export default function HomeSiswaFragment() {
  const classes = useStyles()

  let user = JSON.parse(localStorage.getItem("user"))

  const [values] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama
  });

  React.useEffect(() => {
    getTunggakan()
  }, [])

  // data from database
  const [data, setData] = React.useState([]);

  // Axios operation
  const getSiswa = (prop) => (event) => {
    let url = base_url + "/siswa/for-" + values.role + "/" + prop + "/" + event.target.value
    axios.get(url, headerConfig())
  }
  
  const headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${values.token}` }
    }
    return header
  }

  let loadData = {
    nisn: getSiswa("nisn"),
    tahun_dibayar: [2021,2022],
  }
  const getTunggakan = () => {
    let url = base_url + "/transaksi/for-siswa/getTunggakan"
    axios.post(url, loadData ,headerConfig())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (values.role === "siswa") {
    return (
      <>
      <br />
        <Paper className={classes.cardTunggakan} sx={{ width: '95%', overflow: 'hidden' }} style={{ marginLeft: '2rem', marginRight: '2rem' }}>
          <p className={classes.titleTunggakan}>Total tunggakan tahun 2021/2022</p>
          <p className={classes.nominalTunggakan}>Rp{data.data}</p>
        </Paper>
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