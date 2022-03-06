import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/fastPay-logo.svg';
import iconLogout from '../../../assets/ic-logout.svg';
import { Badge, Nav } from 'react-bootstrap';

export default function SideBar({ tabs, avatar, username, role, logout }) {
  const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    window.location = "/"
  }

  return (
    <div className="wrap">
      <aside className="aside">
        <section className="navContainer">
          <img src={logo} alt="logo" />
          <nav className="nav">
            {tabs}
          </nav>
        </section>
      </aside>
      <main className="main">
        <div className="navContent">
          <img className="profile" alt="profile" src={avatar} />
          <p>{username}</p>
          <Badge className="badgeRole" >{role}</Badge>
          <div className="logout">
            <Nav.Link onClick={() => Logout()}>
              <img src={iconLogout} alt="logout" />
            </Nav.Link>
          </div>
        </div>
      </main>
    </div>
  )
}

SideBar.defaultProps = {
  tabs: '',
  logo: '',
  username: '',
  role: '',
};

SideBar.propTypes = {
  tabs: PropTypes.string,
  logo: PropTypes.string,
  username: PropTypes.string,
  role: PropTypes.string,
};