import './App.css'
import { createHashRouter, RouterProvider, Outlet, Link } from "react-router-dom"
import Selection from './screens/selection'
import DataJoin from './screens/data-join'
import Scale from './screens/scale'
import Shapes from './screens/shapes'
import Axes from './screens/axes'
import Hierarchies from './screens/hierarchies'
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
  {
    path: "axes",
    element: <Axes />,
  },
  {
    path: "hierarchies",
    element: <Hierarchies />,
  }
]
const Root = () => {
  const navigator = useMemo(() => {
    return childMenus.map(i => {
      return (<li key={i.path}><Link to={i.path}>/{i.path}</Link></li>)
    })
  }, [])
  return (<>
    <ul>{navigator}</ul>
    <div><h2>Please select an item from the left-hand side menu. </h2><Outlet/></div>
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
