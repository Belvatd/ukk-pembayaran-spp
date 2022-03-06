import React from 'react'
import Navbar from '../../elements/PageBase'
import HistoriSiswaFragment from '../../fragments/HistoriSiswaFragment'

export default function HistoriSiswa() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <HistoriSiswaFragment />
      </div>
    </div>
  )
}
