import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css';
import { checkCredentials, checkLogin } from './services/loginService';
class Login extends React.Component {

  constructor(props)
  {
    super(props);
    
    this.state = 
    {
        message: '',
        email: '',
        password: '',
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  
  handleClick(event)
  {
    event.preventDefault();
    checkCredentials(this.state.email, this.state.password)
      .then( response => {
          //set token
          console.log(response.data.token);
          console.log(response.data.user);
          localStorage.setItem('token', response.data.token);
          //redirect
          checkLogin()
          .then( response => { this.props.history.push('/profile') })
          .catch( error => { console.log(error) });
      })        
      .catch( error => {
          this.setState({
              message: 'Invalid credentials!'
          });           
      }); 
  }
    
  onChange(e)
  {
      this.setState({[e.target.name]:e.target.value});
  }

  render() {
    return (
      <div>
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={this.handleClick}>
          <input name="email" placeholder="E-Mail" type="text" onChange={this.onChange}/>
          <input id="pw" name="password" placeholder="Password" type="password" onChange={this.onChange}/>
          <div className="agree">
            <input id="agree" name="agree" type="checkbox" />
            <label htmlFor="agree" />Remember me
          </div>
          <input className="animated" type="submit" defaultValue="Login"/>
          </form>
          <Link to="/register" className="forgot">Don't Have an account? Register</Link>
        </div>
      </div>
    );
  }
}

Login = withRouter(Login);

export default Login;