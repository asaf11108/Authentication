import React, { Component } from 'react';
import './LoginPage.css';
import LoginForm from "./LoginForm";
import { withRouter } from 'react-router-dom';
import Acount from '../../services/AcountService';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)

    this.state = {
      fields: {}
    };

  }
  onSubmit = fields => {
    var newHandler = this.handler;
    this.setState({ fields });
    Acount.login(fields)
      .then(function (response) {
        return response.json();
      })
      .then(function (token) {
        if (token != null) {
          localStorage.setItem("ACCESS_TOKEN", token.token);
          newHandler().history.push('/main');
        }
      });
  }
  handler() {
    return this.props;
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={fields => this.onSubmit(fields)} />
      </div>
    );
  }
}

export default withRouter(LoginPage);
