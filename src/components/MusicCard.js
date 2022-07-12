import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album, saveSongOnStorage, favoriteSongs } = this.props;
    return (
      <section>
        {album.slice(1).map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              <input
                id={ trackId }
                name={ trackId }
                type="checkbox"
                checked={ favoriteSongs.some(
                  (musica) => Number(musica.trackId) === trackId,
                ) }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ saveSongOnStorage }
              />
              Favorita
            </label>
          </div>
        ))}
      </section>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveSongOnStorage: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
