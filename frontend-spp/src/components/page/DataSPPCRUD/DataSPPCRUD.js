import React from 'react'
import Navbar from '../../elements/PageBase'
import DataSPPCRUDFragment from '../../fragments/DataSPPCRUDFragment'

export default function DataSPPCRUD() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <DataSPPCRUDFragment />
      </div>
    </div>
  )
}
