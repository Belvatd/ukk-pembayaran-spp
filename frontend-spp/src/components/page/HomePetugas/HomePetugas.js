import React from 'react'
import Navbar from '../../elements/PageBase'
import HomePetugasFragment from '../../fragments/HomePetugasFragment'

export default function HomePetugas() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <HomePetugasFragment />
      </div>
    </div>
  )
}
