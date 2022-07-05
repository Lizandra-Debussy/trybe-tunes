import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const get = await getUser();
    this.setState({ userName: get.name, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (<p data-testid="header-user-name">{ userName }</p>) }
      </header>
    );
  }
}

export default Header;
