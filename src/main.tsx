import { StrictMode } from 'react'
import './index.css'
import { router } from './App.tsx'
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router'


const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
