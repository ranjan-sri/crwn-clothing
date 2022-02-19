import React from 'react'
import "./App.css";
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import  Homepage from './pages/homepage/homepage.component.jsx'
import  shopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'


class App extends React.Component {
  constructor () {
    super()
 
     this.state = {
       currentUser: null
     }
  }
 
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        console.log(userRef)
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () =>{
            console.log(this.state)
          })     
        })
       
        
      
      }
     else {
      this.setState({currentUser: userAuth})
     }
     
      
      
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
