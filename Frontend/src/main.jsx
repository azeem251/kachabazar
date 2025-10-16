import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
// import store from './store.js'
import store from './store.js'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Rgiq6P2dzCloiBXo5vFaBNZlUZWMS0SnKLdZvGmC6AlQosL1CPwfSfvx4ai8fFMzJVkq9W6eBlMcJqxV1EMV2na00YRZA8K43');

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
        <RouterProvider router={router} />
      
    </Provider>
       
    
  

)
