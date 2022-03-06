import React from 'react'
import routes from '../../../configs/routes';
import { Nav } from 'react-bootstrap';
import SideBar from '../SideBar';
import { admin_image_url, siswa_image_url } from "../../../configs/config"
import walletIcon from '../../../assets/ic-wallet.svg';
import historiIcon from '../../../assets/ic-time.svg';
import dbIcon from '../../../assets/ic-db.svg';
import dashboardIcon from '../../../assets/ic-dashboard.svg';

export default class PageBase extends React.Component {

  constructor() {
    super()
    let user = JSON.parse(localStorage.getItem("user"))
    this.state = {
      token: "",
      role: "",
      nama_petugas: user.nama_petugas,
      nama_siswa: user.nama
    }

    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
      this.state.role = localStorage.getItem("role")
    } else {
      window.location = "/"
    }
  }

  data_siswa = [
    { routes: (routes.HOME_SISWA), text: 'Home', pic: dashboardIcon },
    { routes: (routes.HISTORI_SISWA), text: 'Histori', pic: historiIcon },
  ]

  siswa = this.data_siswa.map((data, index) => {
    return (
      <div key={index}>
        <Nav.Link className="navLink" href={data.routes}>
          <img src={data.pic} alt="ic" />
          {data.text}
        </Nav.Link>
      </div>);
  });

  data_petugas = [
    { routes: (routes.HOME_PETUGAS), text: 'Home', pic: dashboardIcon },
    { routes: (routes.ENTRI), text: 'Entri', pic: walletIcon },
    { routes: (routes.HISTORI_ADMIN), text: 'Histori', pic: historiIcon },
  ]

  petugas = this.data_petugas.map((data, index) => {
    return (
      <div key={index}>
        <Nav.Link className="navLink" href={data.routes}>
          <img src={data.pic} alt="ic" />
          {data.text}
        </Nav.Link>
      </div>);
  });

  data_admin = [
    { routes: (routes.HOME_ADMIN), text: 'Home', pic: dashboardIcon },
    { routes: (routes.ENTRI), text: 'Entri', pic: walletIcon },
    { routes: (routes.HISTORI_ADMIN), text: 'Histori', pic: historiIcon },
    { routes: (routes.DATA_SISWA), text: 'Data Siswa', pic: dbIcon },
    { routes: (routes.DATA_ADMINPETUGAS), text: 'Data Petugas', pic: dbIcon },
    { routes: (routes.DATA_KELAS), text: 'Data Kelas', pic: dbIcon },
    { routes: (routes.DATA_SPP), text: 'Data SPP', pic: dbIcon },
  ]

  admin = this.data_admin.map((data, index) => {
    return (
      <div key={index}>
        <Nav.Link className="navLink" href={data.routes}>
          <img src={data.pic} alt="ic" />
          {data.text}
        </Nav.Link>
      </div>);
  });

  TabRole = (prop) => {
    let user = JSON.parse(localStorage.getItem("user"))
    let role = prop.toLowerCase()
    if (role === "siswa") {
      return (
        <SideBar
          tabs={this.siswa}
          avatar={siswa_image_url + "/" + user.image}
          username={this.state.nama_siswa}
          role={this.state.role}
        />
      )
    } else if (role === "petugas") {
      return (
        <SideBar
          tabs={this.petugas}
          avatar={admin_image_url + "/" + user.image}
          username={this.state.nama_petugas}
          role={this.state.role}
        />
      )
    } else if (role === "admin") {
      return (
        <SideBar
          tabs={this.admin}
          avatar={admin_image_url + "/" + user.image}
          username={this.state.nama_petugas}
          role={this.state.role}
        />
      )
    } else {
      window.location = "/"
    }
  }

  render() {
    return (
      <>
        {this.TabRole(this.state.role)}
      </>
    )
  }
}