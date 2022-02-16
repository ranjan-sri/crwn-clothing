import React from 'react'
import "./App.css";
import {Switch, Route} from 'react-router-dom'

import  Homepage from './pages/homepage/homepage.component.jsx'
import  shopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/shop' component={shopPage}/>
      </Switch>
    </div>
  ) 
}

export default App;
