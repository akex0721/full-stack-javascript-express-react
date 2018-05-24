import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import { checkLogin } from './services/loginService';

class App extends React.Component {
    constructor(props)
    {
        super();
        this.state = 
        {
            isLoggedIn: false 
        };
        
        checkLogin()
        .then( response => { this.setState({ isLoggedIn: true })})
        .catch( error => { this.setState({ isLoggedIn: false })});
        console.log(this.state.isLoggedIn);
    }
    
    render() {
    return (
        <Router>
            <div>   
                <Route exact path="/login" render={() => (
                  this.state.isLoggedIn ? ( <Redirect to="/profile"/> ) : ( <Login /> )
                )}/>
            
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/profile" component={Profile} />
            </div> 
        </Router>
    );
  }
}
export default App;