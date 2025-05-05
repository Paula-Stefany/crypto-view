import { createBrowserRouter } from 'react-router'
import { Home } from './pages/home'
import { Details } from './pages/details'
import { Header } from './components/header'


export const router = createBrowserRouter([
 
  {

    Component: Header,
    children: [
      { index: true, Component: Home },
      { path: "details", Component: Details },
    ],
  }
  
])
