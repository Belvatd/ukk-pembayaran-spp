import React from 'react'
import Navbar from '../../elements/PageBase'
import HomeSiswaFragment from '../../fragments/HomeSiswaFragment'

export default function HomeSiswa() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <HomeSiswaFragment />
      </div>
    </div>
  )
}
