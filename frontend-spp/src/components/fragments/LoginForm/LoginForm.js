// GENERAL
import React from 'react';

// AXIOS
import axios from "axios"
import routes from '../../../configs/routes';

// URL
import { base_url } from '../../../configs/config';

export default function LoginForm() {

  const [values, setValues] = React.useState({
    username: '',
    password: "",
    message: "",
    role: "admin",
    logged: false
  });

  const login = event => {
    let role = (values.role).toLowerCase()
    let checkData = {
      username: values.username,
      password: values.password
    }

    if (role === "siswa") {
      let url_siswa = base_url + "/siswa/login"
      axios.post(url_siswa, checkData)
        .then(response => {
          setValues({ ...values, "logged": response.data.logged })
          if (values.logged) {
            setValues({ ...values, "role": response.data.role })
            // console.log(values)
            let user = response.data.data
            let token = response.data.token
            let role = response.data.role
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
            window.location = "/siswa/home"
          } else {
            console.log("belum masuk gais")
          }
        })
        .catch(error => console.log(error))
    } else {
      let url_admin_petugas = base_url + "/petugas/login"
      axios.post(url_admin_petugas, checkData)
        .then(response => {
          setValues({ ...values, "logged": response.data.logged })
          if (values.logged) {
            setValues({ ...values, "role": response.data.data.role })
            // console.log(values)
            let user = response.data.data
            let token = response.data.token
            let fixRole = (response.data.data.level).toLowerCase()
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            localStorage.setItem("role", fixRole)

            if (fixRole === "admin") {
              window.location = routes.HOME_ADMIN
            } else {
              window.location = routes.HOME_PETUGAS
            }
          } else {
            console.log("belum masuk gais")
          }
        })
        .catch(error => console.log(error))
      console.log("belum masuk gais")
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  return (
    <div className="row">
      <div className="col bgLogin">halo</div>
      <div className="col">
        <div>
          <label for="email" className="form-label">Username</label>
          <input value={values.username} onChange={handleChange("username")} type="email" className="form-control" id="email" />
        </div>
        <div>
          <label for="inputPassword" className="form-label">Password</label>
          <input value={values.password} onChange={handleChange("password")} type="password" className="form-control" id="inputPassword" />
        </div>

        <div class="custom-control custom-radio custom-control-inline">
          <input value="admin" onClick={handleChange("role")} type="radio" id="customRadioInline1" name="customRadioInline" class="custom-control-input" />
          <label class="custom-control-label" for="customRadioInline1">Admin</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input value="petugas" onClick={handleChange("role")} type="radio" id="customRadioInline2" name="customRadioInline" class="custom-control-input" />
          <label class="custom-control-label" for="customRadioInline2">Petugas</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input value="siswa" onClick={handleChange("role")} type="radio" id="customRadioInline3" name="customRadioInline" class="custom-control-input" />
          <label class="custom-control-label" for="customRadioInline3">Siswa</label>
        </div>

        <button onClick={ev => login(ev)}>Login</button>
      </div >
    </div>
  );
}
