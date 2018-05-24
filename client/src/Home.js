import React from 'react';
import { Link } from 'react-router-dom'


class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>HomePage</h2>
          <Link to="/register" className="forgot">Register</Link>
          <Link to="/login" className="forgot">Login</Link>
        </div>
      </div>
    );
  }
}
export default Home;