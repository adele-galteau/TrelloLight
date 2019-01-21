import React from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends React.Component {
  render() {
    return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-6'>
          <h1 className='text-center'>Oops!</h1>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <h2 className='text-center'>404 Not Found</h2>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <Link to='/boards'>
            <p className='text-center'>Back to Home</p>
          </Link>
        </div>
      </div>
    </div>
    )
  }
}
