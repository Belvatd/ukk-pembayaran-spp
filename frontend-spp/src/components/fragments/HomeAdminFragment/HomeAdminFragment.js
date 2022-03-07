import React from 'react';
import { Card } from 'react-bootstrap';

// URL
import { admin_image_url } from "../../../configs/config"
import { Link } from 'react-router-dom';
import routes from '../../../configs/routes';


export default function HomeAdminFragment() {
  let user = JSON.parse(localStorage.getItem("user"))

  const [values] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    name: user.nama_petugas
  });

  if (values.role === "admin") {
    return (
      <>
        <div className="bgHome" >
          <h1 className="homeTitle">SMK Telkom Malang</h1>
          <p className="homeDesc">Sistem Pembayaran SPP</p>
        </div>
        <div className="container root-adminHome">
          <div className="row">
            <Card className="col-8 cardStyleProfile">
              <Card.Body>
                <div className="row profileCard">
                  <div className="col-3">
                    <img className="profilPicture" alt="profilPicture" src={admin_image_url + "/" + user.image} />
                  </div>
                  <div className="col">
                    <p className="nameProfile">{values.name}</p>
                    <p className="roleProfile">{values.role}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="space"></div>
            <Link className="col-3 cardTransaksi" to={routes.ENTRI}>
                <p className="transaksiNow">Transaksi Sekarang</p>
            </Link>
          </div>
        </div>
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