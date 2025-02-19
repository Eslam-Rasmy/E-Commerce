import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../node_modules/flowbite/dist/flowbite.js"
import 'swiper/css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import 'flowbite';

createRoot(document.getElementById('root')).render(
  
    <App />
 
)
