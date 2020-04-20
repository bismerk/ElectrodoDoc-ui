import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from "../../components";
import loginWelcome from '../../assets/images/loginWelcome.svg';
import logoCol from '../../assets/images/logoCol.svg';
import './style.css';
import { actions } from '../../state-management';

class Login extends React.Component {
  replace = () => {
    this.props.history.replace('/');
  };
  loginRequest = async ({ loginEmail, password, remember }) => {
    await this.props.loginRequest({ name: loginEmail, password });
    this.replace();
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {
    return (
      <div className="login flex-direction-column flex-center">
        <div className="loginBox">
          <div className="loginBlock BGBlue flex-direction-column flex-center">
            <img src={loginWelcome} alt="Welcome"/>
          </div>
          <div className="loginBlock flex-direction-column flex-center">
            <img className="logoUpForm" src={logoCol} alt="Welcome"/>
            <LoginForm onFinish={this.loginRequest}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { loginRequest: actions.loginRequest }
)(Login);
