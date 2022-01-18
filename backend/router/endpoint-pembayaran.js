const express = require("express")
const models = require("../models/index")
const pembayaran = models.pembayaran
const app = express()

const authAdmin = require("../auth-admin")
const authPetugas = require("../auth-petugas")
const authSiswa = require("../auth-siswa")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// function CRUD
const getData = async (req, res) => {
  // const payload = req.body
  // const exist = await findOnePembayaran({ nisn: payload.nisn, tahun_dibayar: payload.tahun_dibayar, bulan_dibayar: payload.bulan_dibayar })
  // if (exist) {
  //   return res.json({ message: 'already payed' })
  // }

  let result = await pembayaran.findAll({
    include: ["petugas",
      "siswa",
      {
        model: models.siswa,
        as: "siswa",
        include: ["spp", "kelas"]
      }
    ]
  })
  res.json(result)
}

// const postData = async (req, res) => {
//   try {

//     const payload = req.body
//     const exist = await findOnePembayaran({ nisn: payload.nisn, tahun_dibayar: payload.tahun_dibayar, bulan_dibayar: payload.bulan_dibayar })
//     if (exist) {
//       return res.json({ message: 'already payed' })
//     }

//     let data = {
//       id_petugas: req.body.id_petugas,
//       nisn: req.body.nisn,
//       tgl_bayar: new Date().toISOString().split('T')[0],
//       bulan_dibayar: req.body.bulan_dibayar,
//       tahun_dibayar: req.body.tahun_dibayar,
//       id_spp: req.body.id_spp,
//       jumlah_bayar: req.body.jumlah_bayar
//     }

//     let tunggakanAwal = await models.siswa.findOne({ where: { nisn: data.nisn } })
//     if (tunggakanAwal.tunggakan === 0) {
//       res.json({
//         message: "Tidak ada tunggakan",
//         data: result,
//       })
//     }
//     else {
//       const result = pembayaran.create(data)
//         .then(result => {
//           models.siswa.update({ tunggakan: (tunggakanAwal.tunggakan - data.jumlah_bayar) }, { where: { nisn: data.nisn } })
//           res.json({
//             message: "data has been inserted",
//             data: result,
//           })
//         })
//         .catch(error => {
//           res.json({
//             message: error.message
//           })
//         })
//       if (result.err) {
//         return res.json({ message: error.message })
//       }
//     }
    
//     return response(res, result, 'Success insert data pembayaran', 201)
//   } catch (error) {
//     return response(res, error, 'Failed insert data pembayaran', 500)
//   }

// }

const postData = async (req, res) => {
  try {

    const payload = req.body
    const exist = await findOnePembayaran({ nisn: payload.nisn, tahun_dibayar: payload.tahun_dibayar, bulan_dibayar: payload.bulan_dibayar })
    if (exist) {
      return res.json({ message: 'already payed' })
    }

    let data = {
      id_petugas: req.body.id_petugas,
      nisn: req.body.nisn,
      tgl_bayar: new Date().toISOString().split('T')[0],
      bulan_dibayar: req.body.bulan_dibayar,
      tahun_dibayar: req.body.tahun_dibayar,
      id_spp: req.body.id_spp,
      jumlah_bayar: req.body.jumlah_bayar
    }

    let tunggakanAwal = await models.siswa.findOne({ where: { nisn: data.nisn } })
    const result = pembayaran.create(data)
      .then(result => {
        models.siswa.update({ tunggakan: (tunggakanAwal.tunggakan - data.jumlah_bayar) }, { where: { nisn: data.nisn } })
        res.json({
          message: "data has been inserted",
          data: result,
        })
      })
      .catch(error => {
        res.json({
          message: error.message
        })
      })
    if (result.err) {
      return res.json({ message: error.message })
    }

    return response(res, result, 'Success insert data pembayaran', 201)
  } catch (error) {
    return response(res, error, 'Failed insert data pembayaran', 500)
  }

}


const putData = async (req, res) => {
  let param = await { id_pembayaran: req.body.id_pembayaran }
  let data = await {
    id_petugas: req.body.id_petugas,
    nisn: req.body.nisn,
    tgl_bayar: req.body.tgl_bayar,
    bulan_dibayar: req.body.bulan_dibayar,
    tahun_dibayar: req.body.tahun_dibayar,
    id_spp: req.body.id_spp,
    jumlah_bayar: req.body.jumlah_bayar
  }

  pembayaran.update(data, { where: param })
    .then(result => {
      res.json({ message: "data has been updated" })
    })
    .catch(error => {
      res.json({ message: error.message })
    })
}

const deleteData = async (req, res) => {
  let param = { id_pembayaran: req.params.id_pembayaran }
  pembayaran.destroy({ where: param })
    .then(result => {
      res.json({ message: "data has been destroyed" })
    })
    .catch(error => {
      res.json({ message: error.message })
    })
}

// endpoint for petugas
app.get("/for-petugas", authPetugas, async (req, res) => {
  getData(req, res)
})

app.post("/for-petugas", authPetugas, async (req, res) => {
  postData(req, res)
})

app.put("/for-petugas", authPetugas, async (req, res) => {
  putData(req, res)
})

app.delete("/for-petugas/:id_pembayaran", authPetugas, async (req, res) => {
  deleteData(req, res)
})

// endpoint for admin
app.get("/for-admin", authAdmin, async (req, res) => {
  getData(req, res)
})

app.post("/for-admin", authAdmin, async (req, res) => {
  postData(req, res)
})

app.put("/for-admin", authAdmin, async (req, res) => {
  putData(req, res)
})

app.delete("/for-admin/:id_pembayaran", authAdmin, async (req, res) => {
  deleteData(req, res)
})

app.post("/for-admin/getBulan", authAdmin, async (req, res) => {
  getBulan(req, res)
})

app.post("/for-admin/getTunggakan", authAdmin, async (req, res) => {
  getTunggakan(req, res)
})

// endpoint for siswa
app.get("/for-siswa/:nisn", authSiswa, async (req, res) => {
  let param = { nisn: req.params.nisn }
  let result = await pembayaran.findAll({
    where: param,
    include: ["petugas",
      "siswa",
      {
        model: models.siswa,
        as: "siswa",
        include: ["spp", "kelas"]
      }
    ]
  })
  res.json(result)
})

//adjustment pembayaran

const response = (res, result, message, code) => {
  return res.status(code).json({
    data: result,
    message: message,
    code: code
  });
}

const error = (err, description, code = 500) => ({ err, code, data: null, message: description });

//command_pembayaran
//---query---
const findOnePembayaran = async (param) => {
  try {
    return await pembayaran.findOne({
      where: param, include: ['petugas', 'siswa', {
        model: models.siswa,
        as: "siswa",
        include: ["spp"]
      }]
    })
  } catch (err) {
    return error(err, 'findOnePembayaran', 500)
  }
}
const findPembayaranByParam = async (param) => {
  try {
    return await pembayaran.findAll({
      where: param, include: ['petugas', 'siswa', {
        model: models.siswa,
        as: "siswa",
        include: ["spp"]
      }]
    })
  } catch (err) {
    return error(err, 'findPembayaranByParam', 500)
  }
}

//---crud---
const insertOnePembayaran = async (data) => {
  try {
    return await pembayaran.create(data)
  } catch (err) {
    console.log(err)
    return error(err, 'insertOnePembayaran', 500)
  }
}


//modules_pembayaran

const getBulan = async (req, res) => {
  try {
    const param = req.body

    const listBulan = [
      { id: 1, bulan: "Juli", tahun: param.tahun_dibayar[0], paid: false },
      { id: 2, bulan: "Agustus", tahun: param.tahun_dibayar[0], paid: false },
      { id: 3, bulan: "September", tahun: param.tahun_dibayar[0], paid: false },
      { id: 4, bulan: "Oktober", tahun: param.tahun_dibayar[0], paid: false },
      { id: 5, bulan: "November", tahun: param.tahun_dibayar[0], paid: false },
      { id: 6, bulan: "Desember", tahun: param.tahun_dibayar[0], paid: false },
      { id: 7, bulan: "Januari", tahun: param.tahun_dibayar[1], paid: false },
      { id: 8, bulan: "Februari", tahun: param.tahun_dibayar[1], paid: false },
      { id: 9, bulan: "Maret", tahun: param.tahun_dibayar[1], paid: false },
      { id: 10, bulan: "April", tahun: param.tahun_dibayar[1], paid: false },
      { id: 11, bulan: "Mei", tahun: param.tahun_dibayar[1], paid: false },
      { id: 12, bulan: "Juni", tahun: param.tahun_dibayar[1], paid: false },
    ]


    const result = await findPembayaranByParam(param)
    if (result.err) {
      return response(res, null, 'history not found', 404)
    }

    result.map((item, i) => {
      const data = {
        id: item.bulan_dibayar,
        tahun: item.tahun_dibayar
      }

      if (data.id <= 6 && data.tahun == param.tahun_dibayar[1]) {
        listBulan[data.id + 5].paid = true
      }

      if (data.id > 6 && data.tahun == param.tahun_dibayar[0]) {
        listBulan[data.id - 7].paid = true
      }
    })

    listBulan.map((item) => {
      if (item.paid == true) {
        let i = listBulan.map(function (item) { return item; }).indexOf(item)
        listBulan.splice(i, 1);
      }
    })

    return response(res, listBulan, 'Data Found', 200)


  } catch (error) {
    return response(res, error, 'failed find data Pembayaran', 500)
  }
}

const getTunggakan = async (req, res) => {
  try {
    const param = req.body

    const result = await findPembayaranByParam(param)
    if (result.err) {
      return response(res, null, 'history not found', 404)
    }

    const listBulan = unpaidMonth(param, result)

    const nominal = result[0].siswa.spp.nominal

    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let tunggakan = 0
    listBulan.map((item, i) => {
      if (item.id == month && item.tahun == year) {
        listBulan.length = i + 1
        tunggakan = (i + 1) * nominal
      }
    })

    return response(res, tunggakan, 'Data Found', 200)


  } catch (error) {
    return response(res, error, 'failed find data Pembayaran', 500)
  }
}

const unpaidMonth = (param, data) => {
  const listBulan = [
    { id: 7, tahun: param.tahun_dibayar[0], paid: false },
    { id: 8, tahun: param.tahun_dibayar[0], paid: false },
    { id: 9, tahun: param.tahun_dibayar[0], paid: false },
    { id: 10, tahun: param.tahun_dibayar[0], paid: false },
    { id: 11, tahun: param.tahun_dibayar[0], paid: false },
    { id: 12, tahun: param.tahun_dibayar[0], paid: false },
    { id: 1, tahun: param.tahun_dibayar[1], paid: false },
    { id: 2, tahun: param.tahun_dibayar[1], paid: false },
    { id: 3, tahun: param.tahun_dibayar[1], paid: false },
    { id: 4, tahun: param.tahun_dibayar[1], paid: false },
    { id: 5, tahun: param.tahun_dibayar[1], paid: false },
    { id: 6, tahun: param.tahun_dibayar[1], paid: false },
  ]

  data.map((item) => {
    const data = {
      id: item.bulan_dibayar,
      tahun: item.tahun_dibayar
    }

    if (data.id <= 6 && data.tahun == param.tahun_dibayar[1]) {
      listBulan[data.id + 5].paid = true
    }

    if (data.id > 6 && data.tahun == param.tahun_dibayar[0]) {
      listBulan[data.id - 7].paid = true
    }
  })


  listBulan.map((item) => {
    if (item.paid) {
      let i = listBulan.map(function (item) { return item; }).indexOf(item)
      listBulan.splice(i, 1);
    }
  })

  return listBulan
}

module.exports = app
