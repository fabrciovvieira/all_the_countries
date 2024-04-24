import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Home from './routes/Home.jsx'
import CardCountry from './routes/CardCountry.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/all_the_countries',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/all_the_countries',
        element: <Home />
      },
      {
        path: '/all_the_countries/country/:name',
        element: <CardCountry />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
