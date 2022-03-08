import { Paper } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../css'

export default function HomeSiswaFragment() {
  const classes = useStyles()

  let user = JSON.parse(localStorage.getItem("user"))

  const [values] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama,
    tunggakan:user.tunggakan
  });

  if (values.role === "siswa") {
    return (
      <>
        <br />
        <Paper className={classes.cardTunggakan} sx={{ width: '95%', overflow: 'hidden' }} style={{ marginLeft: '2rem', marginRight: '2rem' }}>
          <p className={classes.titleTunggakan}>Total tunggakan tahun 2021/2022</p>
          <p className={classes.nominalTunggakan}>Rp{values.tunggakan}</p>
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