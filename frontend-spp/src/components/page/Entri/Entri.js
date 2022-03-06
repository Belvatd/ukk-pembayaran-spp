import React from 'react'
import Navbar from '../../elements/PageBase'
import EntriFragment from '../../fragments/EntriFragment'

export default function Entri() {
  return (
    <div>
      <Navbar />
      <div className="rootFragment">
        <EntriFragment />
      </div>
    </div>
  )
}
