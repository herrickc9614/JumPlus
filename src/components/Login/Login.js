import '../Login/Login.css';
import Create from '../Create/Create.js';
import React from 'react';

class Login extends React.Component {
  userAuthorized = false;
  invalidPassword = false;
  newAccount = false;
  
  constructor(props) {
    super(props);
    this.state = {userName: '', password:''};

    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  changeUserName(event) {
    this.setState({userName: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    this.verifyUser();
    event.preventDefault();
  }

  createAccount(event) {
    this.newAccount = true;
    this.forceUpdate();
    event.preventDefault();
  }

  async verifyUser() {
    fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((data) => {
      data.map((user) => {
        if(this.state.userName !== "" && user.username === this.state.userName)
        {
          if(user.password === this.state.password)
          {
            this.userAuthorized = true;
            this.invalidPassword = false;
            this.forceUpdate();
          }
          else
          {
            this.invalidPassword = true;
            this.forceUpdate();
          }
        }
      })
    })
    .catch((err) => {
       console.log(err.message);
    });
  }

  render() {
    if(this.newAccount)
    {
      return(
        <Create/>
      );   
    }
    else if(!this.userAuthorized)
    {
      return (
        <div className="Login">
          <header>User Login</header>
          <div className = "errorMessage">
            {this.invalidPassword
            ? <p>error</p>
            : <p></p>
            }
          </div>
          <form onSubmit={this.handleSubmit}>
          <label>
            UserName:
          </label>
          <input type="text" value={this.state.userName} onChange={this.changeUserName} />
          <label>
            Password:
          </label>
          <input type="password" value={this.state.password} onChange={this.changePassword} />
          <input className="loginSubmit" type="submit" value="Login" />
        </form>
        <form onSubmit={this.createAccount}>
          <input className="createAccount" type="submit" value="Create Account" />
        </form>
        </div>
      );
    }
    else
    {
      return (
        <div>hello</div>
      );
    }
  }
}
  export default Login;