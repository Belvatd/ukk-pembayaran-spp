import React from 'react'
import Navbar from '../../elements/PageBase'
import DataAdminPetugasCRUDFragment from '../../fragments/DataAdminPetugasCRUDFragment'

export default function DataAdminPetugasCRUD() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <DataAdminPetugasCRUDFragment />
      </div>
    </div>
  )
}
