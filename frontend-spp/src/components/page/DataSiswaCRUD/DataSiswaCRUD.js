import React from 'react'
import Navbar from '../../elements/PageBase'
import DataSiswaCRUDFragment from '../../fragments/DataSiswaCRUDFragment'

export default function DataSiswaCRUD() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <DataSiswaCRUDFragment />
      </div>
    </div>
  )
}
