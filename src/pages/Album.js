import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.callingGetMusics(id);
  }

  callingGetMusics = async (id) => {
    const data = await getMusics(id);
    this.setState({ album: data });
  }

  render() {
    const { album } = this.state;

    return (
      <main data-testid="page-album">
        <Header />
        { album.length > 0 && (
          <section>
            <p data-testid="album-name">{album[0].collectionName}</p>
            <p data-testid="artist-name">{album[0].artistName}</p>
            <div>
              <MusicCard
                { ...this.state }
              />
            </div>
          </section>
        )}
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
