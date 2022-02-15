import React from 'react'
import "./App.css";
import {Switch, Route} from 'react-router-dom'
import  Homepage from './pages/homepage/homepage.component.jsx'
function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Homepage}/>
      </Switch>
    </div>
  ) 
}

export default App;
