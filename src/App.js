import React from 'react'
import "./App.css";
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import  Homepage from './pages/homepage/homepage.component.jsx'
import  shopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth} from './firebase/firebase.utils'


class App extends React.Component {
  constructor () {
    super()
 
     this.state = {
       currentUser: null
     }
  }
 
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/shop' component={shopPage}/>
          <Route exact path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    ) 
  }
  
}

export default App;
