import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
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
const Root = (props) => {
  return <p>Please select the menu from the left-hand side. <Outlet/></p>
}
const menu = [
  {
    path: '/',
    element: <Root />,
    children: childMenus
  },
]

const router = createBrowserRouter(menu, {
  basename: "/d3-playground",
})

const App = () => {
  const navigator = useMemo(() => {
    return childMenus.map(i => {
      return (<li key={i.path}><a href={i.path}>{i.path}</a></li>)
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
