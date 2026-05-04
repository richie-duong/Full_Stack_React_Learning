import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import ArticlePage from './pages/ArticlePage'
import Layout from './Layout'
import ArticlesListPage from './pages/ArticlesListPage'
import NotFoundPage from './pages/NotFoundPage'

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <Home />
  }, {
    path: '/about',
    element: <About />
  }, {
    path: '/articles',
    element: <ArticlesListPage />
  }, {
    path: '/articles/:name',
    element: <ArticlePage />
  }]
}]

const router = createBrowserRouter(routes);

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
