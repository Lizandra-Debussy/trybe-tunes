import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      buttonDisabled: true,
      loading: false,
      redirectSearch: false,
    };
  }

  inputChange = ({ target }) => {
    const { value } = target;
    const caracter = 3;

    this.setState(({
      userName: value,
      buttonDisabled: value.length < caracter,
    }));
  }

  callingCreatUser = () => {
    const { userName } = this.state;

    const creatWaitAsync = async () => {
      await createUser({ name: userName });
      this.setState({ loading: false, redirectSearch: true });
    };
    creatWaitAsync();
  }

  loginButtonClink = () => {
    this.setState({ loading: true }, this.callingCreatUser);
  }

  render() {
    const { userName, buttonDisabled, loading, redirectSearch } = this.state;
    return (
      <div data-testid="page-login">
        { redirectSearch && <Redirect to="/search" /> }
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="login-name-input">
              <input
                data-testid="login-name-input"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.inputChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ buttonDisabled }
              onClick={ this.loginButtonClink }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
