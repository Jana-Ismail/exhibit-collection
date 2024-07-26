import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </StrictMode>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
