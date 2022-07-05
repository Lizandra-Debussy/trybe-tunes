import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
