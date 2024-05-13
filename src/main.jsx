import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Providers } from './redux/Providers.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Providers>

  <BrowserRouter>

    <Toaster    
        position="top-center"
        reverseOrder={true}
      />

    <App />
  
  </BrowserRouter>


  </Providers>

)
