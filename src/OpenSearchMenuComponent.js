import React from 'react'
import {Link} from 'react-router-dom'

function OpenSearchMenuComponent() {

  return (<div className="open-search">
    <Link to="/search">Add a book</Link>
  </div>)
}

export default OpenSearchMenuComponent
