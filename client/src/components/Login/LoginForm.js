import React from "react";
import './LoginPage.css';

export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <form className="login-form mx-auto">
        <fieldset>
          <div className="form-group">
            <label >Username address</label>
            <input className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={e => this.change(e)} autoFocus=""/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
          </div>
          <div className="form-group">
            <label >Password</label>
            <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={e => this.change(e)} />
          </div>
          <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>Submit</button>
        </fieldset>
      </form>

    );
  }
}