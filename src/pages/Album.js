import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      statusLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.setState({ statusLoading: true });
    this.callingGetFavorites();
    this.callingGetMusics();
    this.setState({ statusLoading: false });
  }

  callingGetFavorites = async () => {
    const favoritas = await getFavoriteSongs();
    this.setState({ favoriteSongs: favoritas });
  }

  callingGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({ album: data });
  }

  saveSongOnStorage = async ({ target }) => {
    const { name } = target;
    const { album } = this.state;
    this.setState({ statusLoading: true });
    const music = album.slice(1).find(({ trackId }) => trackId === Number(name));
    await addSong(music);
    this.setState((prevState) => ({
      favoriteSongs: [...prevState.favoriteSongs, music],
    }));
    this.setState({ statusLoading: false });
  }

  render() {
    const { album, statusLoading } = this.state;
    return (
      <main data-testid="page-album">
        <Header />
        { statusLoading ? (
          <Loading />
        ) : (
          <div>
            { album.length > 0 && (
              <section>
                <p data-testid="album-name">{album[0].collectionName}</p>
                <p data-testid="artist-name">{album[0].artistName}</p>
                <div>
                  <MusicCard
                    { ...this.state }
                    saveSongOnStorage={ this.saveSongOnStorage }
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
