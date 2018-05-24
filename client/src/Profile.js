import React from 'react';

class Profile extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event)
  {
    localStorage.clear();
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        <div className="login">
          <h2>Profile Page</h2>
          <input className="animated" type="submit" defaultValue="Logout"  onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default Profile;