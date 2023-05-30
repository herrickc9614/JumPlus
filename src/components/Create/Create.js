import Login from '../Login/Login.js';
import React from 'react';

class Create extends React.Component {
  previousUser = false;
  validPassword = false;
  
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
    
    event.preventDefault();
  }

  async verifyUser() {
    this.previousUser = false;
    await fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((data) => {
      data.map((user) => {
        if(this.state.userName === "" || user.username === this.state.userName)
        {
          this.previousUser = true;
        }
      })
    })
    .catch((err) => {
       console.log(err.message);
    });

    if(!this.previousUser)
    {
        if(this.state.password && this.state.password !== "")
        {
            this.validPassword = true;
            await this.createUser();         
        }
    }
    this.forceUpdate();   
  }

  async createUser() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(      {
            "username":this.state.userName,
            "password":this.state.password
          })
    };
    fetch('http://localhost:3000/users', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
  }

  createAccount(event) {
    this.validPassword = true;
    this.forceUpdate();
    event.preventDefault();
  }

  render() {
    if(!this.validPassword)
    {
      return (
        <div className="Login">
          <header>Create User</header>
          <div className = "errorMessage">
            {this.previousUser
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
          <input className="loginSubmit" type="submit" value="Create" />
        </form>
        <form onSubmit={this.cancelCreate}>
          <input className="createAccount" type="submit" value="Cancel" />
        </form>
        </div>
      );
    }
    else
    {
      return (
        <Login/>
      );
    }
  }
}
  export default Create;