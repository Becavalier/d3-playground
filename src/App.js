import './App.css'
import { createHashRouter, RouterProvider, Outlet, Link } from "react-router-dom"
import Selection from './screens/selection'
import DataJoin from './screens/data-join'
import Scale from './screens/scale'
import Shapes from './screens/shapes'
import { useMemo } from 'react'

const childMenus = [
  {
    path: "selection",
    element: <Selection />,
  },
  {
    path: "data-join",
    element: <DataJoin />,
  },
  {
    path: "scale",
    element: <Scale />,
  },
  {
    path: "shapes",
    element: <Shapes />,
  },
]
const Root = () => {
  const navigator = useMemo(() => {
    return childMenus.map(i => {
      return (<li key={i.path}><Link to={i.path}>/{i.path}</Link></li>)
    })
  }, [])
  return (<>
    <ul>{navigator}</ul>
    <p>Please select the menu from the left-hand side. <Outlet/></p>
  </>)
  }
const menu = [
  {
    path: '/',
    element: <Root />,
    children: childMenus
  },
]

const router = createHashRouter(menu)

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
