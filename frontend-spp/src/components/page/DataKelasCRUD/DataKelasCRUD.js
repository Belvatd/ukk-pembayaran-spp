import React from 'react'
import Navbar from '../../elements/PageBase'
import DataKelasCRUDFragment from '../../fragments/DataKelasCRUDFragment'

export default function DataKelasCRUD() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <DataKelasCRUDFragment />
      </div>
    </div>
  )
}
