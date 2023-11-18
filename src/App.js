import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Selection from './screens/selection'
import DataJoin from './screens/data-join'
import Scale from './screens/scale'
import Shapes from './screens/shapes'
import { useMemo } from 'react'

const menu = [
  {
    path: '/',
    element: <Navigate to="/selection" replace={true} />
  },
  {
    path: "/selection",
    element: <Selection />,
  },
  {
    path: "/data-join",
    element: <DataJoin />,
  },
  {
    path: "/scale",
    element: <Scale />,
  },
  {
    path: "/shapes",
    element: <Shapes />,
  },
]

const router = createBrowserRouter(menu)

const App = () => {
  const navigator = useMemo(() => {
    return menu.map(i => {
      return (<li key={i.path}><a href={i.path}>{i.path.slice(1)}</a></li>)
    })
  }, [])

  return (
    <div className="App">
      <ul>{navigator}</ul>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
