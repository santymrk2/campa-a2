import { BrowserRouter, Route, Routes } from "react-router-dom"
import RedBull from './pages/RedBull.jsx'
import Page404 from './pages/404.jsx'
//import Ferrari from './pages/Ferrari.jsx'
//import McLaren from './pages/McLaren.jsx'

export const RoutePage = () => {
    return <BrowserRouter>
      <Routes>
        <Route path='/redbull' element={<RedBull />} />
        <Route path='*' element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  }