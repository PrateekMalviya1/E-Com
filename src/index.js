import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import Cart from './Pages/Cart';
import { MainContext } from './Context/MainContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
let r=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/Detail/:id',
    element:<Detail/>
  },
  {
    path:'/cart',
    element:<Cart/>
  }
])
root.render(
  <React.StrictMode>
    <MainContext>
      <RouterProvider router={r}/>
    </MainContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
