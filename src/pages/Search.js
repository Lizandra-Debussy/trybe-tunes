import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      buttonDisabled: true,

    };
  }

  inputChange = ({ target }) => {
    const { value } = target;
    const characters = 2;
    this.setState({
      artist: value,
      buttonDisabled: value.length < characters,
    });
  }

  render() {
    const { artist, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ artist }
            onChange={ this.inputChange }
            placeholder="Nome do Artista"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
