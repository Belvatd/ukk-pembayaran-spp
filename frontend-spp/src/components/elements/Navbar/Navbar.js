import React from 'react'
import routes from '../../../configs/routes';
import { Navbar, Nav, Container } from 'react-bootstrap'

export default class NavbarElement extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    window.location = "/"
  }

  constructor() {
    super()
    this.state = {
      routes: [
        "/home",
        "/histori",
        "/entri",
        "/crudsiswa",
        "/crudadmin",
        "/crudkelas",
        "/crudspp"
      ],
      token: "",
      role: ""

    }

    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
      this.state.role = localStorage.getItem("role")
    } else {
      window.location = "/"
    }
  }

  TabRole = (prop) => {
    let role = prop.toLowerCase()
    if (role === "siswa") {
      return (
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href={routes.HOME_SISWA}>Siswa Moklet</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <Nav.Link href={routes.HOME_SISWA}>Home</Nav.Link>
                <Nav.Link href={routes.HISTORI_SISWA}>Histori</Nav.Link>
                <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
    } else if (role === "petugas") {
      return (
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href={routes.HOME_PETUGAS}>Petugas Moklet</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <Nav.Link href={routes.HOME_PETUGAS}>Home</Nav.Link>
                <Nav.Link href={routes.ENTRI}>Entri</Nav.Link>
                <Nav.Link href={routes.HISTORI_ADMIN}>Histori</Nav.Link>
                <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
    } else if (role === "admin") {
      return (
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <Navbar.Brand href={routes.HOME_ADMIN}>Admin Moklet</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <Nav.Link href={routes.HOME_ADMIN}>Home</Nav.Link>
                <Nav.Link href={routes.ENTRI}>Entri</Nav.Link>
                <Nav.Link href={routes.HISTORI_ADMIN}>Histori</Nav.Link>
                <Nav.Link href={routes.DATA_SISWA}>Data Siswa</Nav.Link>
                <Nav.Link href={routes.DATA_ADMINPETUGAS}>Data Admin</Nav.Link>
                <Nav.Link href={routes.DATA_KELAS}>Data Kelas</Nav.Link>
                <Nav.Link href={routes.DATA_SPP}>Data SPP</Nav.Link>
                <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar >
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