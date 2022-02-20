import React from 'react'
import "./App.css";
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import  Homepage from './pages/homepage/homepage.component.jsx'
import  shopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'
class App extends React.Component {

 
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
         setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          })     
        }
    
     else {
      setCurrentUser(userAuth)
     }

    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/shop' component={shopPage}/>
          <Route exact path='/signin' 
                 render={() => 
                         this.props.currentUser ? (
                         <Redirect to='/' />) : <SignInAndSignUpPage/>}   />
        </Switch>
      </div>
    ) 
  }
  
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
     setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
                mapStateToProps, 
                mapDispatchToProps)
                (App);
