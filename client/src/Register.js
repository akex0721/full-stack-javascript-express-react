import React  from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class Register extends React.Component {
  
  constructor(props)
  {
    super(props);
  
    this.state = 
    {
      name: '',  
      email: '',
      password: '',
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleClear() 
  {
    this.setState({
      name: '',  
      email: '',
      password: '',
    });
    document.getElementById("user-form").reset();
  }
  
  handleSuccess(){
    this.setState({
      message: 'Registered Successfully!',
    });
  }
  
  handleChange(e)
  {
    this.setState({[e.target.name]:e.target.value});
  }
  
  handleSubmit = event => 
  {
    event.preventDefault();

    var postUserData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };
    
    axios.post('http://express-api-space91.c9users.io:8082/register', postUserData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      this.handleSuccess();
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
    this.handleClear();
  }
  
  render() {
    return (
      <div>
        <div className="login">
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit} id="user-form">
            <input name="name" placeholder="Full Name" type="text" onChange={this.handleChange} />
            <input name="email" placeholder="E-Mail Address" type="text"  onChange={this.handleChange} />
            <input id="pw" name="password" placeholder="Password" type="password" onChange={this.handleChange} />
            <div className="agree">
              <input id="agree" name="agree" type="checkbox" />
              <label htmlFor="agree" />Accept rules and conditions
            </div>
            <input className="animated" type="submit" defaultValue="Register" />
          </form>
          <Link to="/login" className="forgot">Already have an account?</Link>
          <h2 className="success">{ this.state.message }</h2>
        </div>
      </div>
    );
  }
}
export default Register;
