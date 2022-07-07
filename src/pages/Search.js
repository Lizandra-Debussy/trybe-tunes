import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      singers: '',
      buttonDisabled: true,
      results: [],
      loading: false,
      singer: '',
      emptyResult: false,
    };
  }

  inputChange = ({ target }) => {
    const { value } = target;
    const characters = 2;
    this.setState({
      singers: value,
      buttonDisabled: value.length < characters,
    });
  }

  searchButtonClick = (event) => {
    event.preventDefault();
    this.callingSearchALbumsAPI();
    this.setState({ loading: true });
  }

  callingSearchALbumsAPI = () => {
    const { singers } = this.state;
    const search = async () => {
      const searchAlbuns = await searchAlbumsAPI(singers);
      if (searchAlbuns.length === 0) {
        this.setState({ emptyResult: true });
      }
      this.setState({
        singers: '',
        results: searchAlbuns,
        loading: false,
        singer: singers,
      });
    };
    search();
  }

  render() {
    const { singers, buttonDisabled, results, loading, singer, emptyResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        { loading ? <Loading /> : (
          <form htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              type="text"
              value={ singers }
              onChange={ this.inputChange }
              placeholder="Nome do Artista"
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ buttonDisabled }
              onClick={ this.searchButtonClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        <p>
          Resultado de álbuns de:
          {' '}
          { `${singer}` }
        </p>
        { emptyResult ? <p>Nenhum álbum foi encontrado</p> : (
          results.map((result) => (
            <div key={ `${result.collectionId}` }>
              <ul>{`${result.collectionName}`}</ul>
              <Link
                data-testid={ `link-to-album-${result.collectionId}` }
                to={ `/album/${result.collectionId}` }
              >
                Link
              </Link>
            </div>
          )))}
      </div>
    );
  }
}

export default Search;
