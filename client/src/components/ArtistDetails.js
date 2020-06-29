import React from 'react';
import { connect } from 'react-redux';
import { Card, Elevation } from '@blueprintjs/core';

class ArtistDetails extends React.Component {
  //   mapGenres = genres => {
  //     return genres.map(genre => {
  //       return;
  //     });
  //   };
  renderContent() {
    if (!this.props.auth) {
      return (
        <div className='card-container'>
          <Card interactive={false} elevation={Elevation.ONE}>
            <p className='alert'>
              Login to Spotify to see artist details and import setlists!
            </p>
          </Card>
        </div>
      );
    }

    switch (this.props.searchDetails) {
      case false:
        return (
          <div className='card-container'>
            <Card interactive={false} elevation={Elevation.ONE}>
              <p className='alert'>
                Search an artist and see the details of the artist here!
              </p>
            </Card>
          </div>
        );
      default:
        const artistDetails = this.props.searchDetails.artist;
        return (
          <div className='card-container'>
            <a href={artistDetails.link}>
              <Card interactive={true} elevation={Elevation.TWO}>
                <div key='header-div'>
                  <h1 key='header' className='header'>
                    {artistDetails.name}
                  </h1>
                  <img
                    key='img'
                    src={artistDetails.image}
                    alt={artistDetails.name}
                  />{' '}
                </div>
                <h3 key='followers' className='artistDetails'>
                  Followers on Spotify: {artistDetails.followers}
                </h3>
              </Card>
            </a>
          </div>
        );
    }
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = ({ auth, searchDetails, expired }) => {
  return { auth, searchDetails, expired };
};

export default connect(mapStateToProps)(ArtistDetails);
