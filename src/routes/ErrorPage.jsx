import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className='error-page'>
        <h1>Ops!</h1>
        <p>Temos um problema</p>
        <p>{error.status} {error.statusText}</p>
        <p>{error.error.message}</p>
    </div>
  )
}

export default ErrorPage