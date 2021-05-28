import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Menu from './components/Menu'
import Registro from './components/Registro';
import Ayuda from './components/Ayuda';
import Perfil from './components/Perfil';
import CargarArchivos from './components/CargarArchivos';
import AdministrarUsuarios from './components/AdministrarUsuarios';
require('dotenv').config()
function App() {
  return (
    <div  >
      <Router>
        <Menu></Menu>
        <Switch>
        <Route exact path='/' component={Inicio} ></Route>
        <Route path='/ayuda' component={Ayuda} ></Route>
        <Route path='/login' component={Login} ></Route>
        <Route path='/registro' component={Registro} ></Route>
        <Route path='/perfil' component={Perfil} ></Route>
        <Route path='/cargarArchivos' component={CargarArchivos} ></Route>
        <Route path='/users' component={AdministrarUsuarios} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
