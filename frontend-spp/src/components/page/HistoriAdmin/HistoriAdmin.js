import React from 'react'
import Navbar from '../../elements/PageBase'
import HistoriAdminFragment from '../../fragments/HistoriAdminFragment'

export default function HistoriAdmin() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <HistoriAdminFragment />
      </div>
    </div>
  )
}
