import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio/Inicio'
import Compras from './pages/Compras/Compras'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Perfil from './pages/Perfil/Perfil'
import InfoVersiones from './pages/Version/InfoVersiones'
import EntrarGrupo from './pages/Grupos/EntrarGrupo'
import { AuthProvider } from './context/AuthContex'
import './App.css'

import ProteccionDeRutas from './ProteccionDeRutas'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/info-V1.1' element={<InfoVersiones />} />

            <Route element={<ProteccionDeRutas />}>
              <Route path='/perfil' element={<Perfil />} />
              <Route path='/compras' element={<Compras />} />
              <Route path='/entrar-grupo' element={<EntrarGrupo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
