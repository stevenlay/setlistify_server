import React from "react";
import { connect } from "react-redux";
import { Card, Elevation } from "@blueprintjs/core";

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
            <p>Login to Spotify to see artist details and import setlists!</p>
          </Card>
        </div>
      );
    }

    switch (this.props.searchDetails) {
      case false:
        return (
          <div className='card-container'>
            <Card interactive={false} elevation={Elevation.ONE}>
              <p>Search an artist and see the details of the artist here!</p>
            </Card>
          </div>
        );
      default:
        const artistDetails = this.props.searchDetails.artist;
        return (
          <div className='card-container'>
            <Card interactive={true} elevation={Elevation.TWO}>
              <div key='header-div'>
                <h1 key='header' className='header'>
                  {artistDetails.name}
                </h1>
                <a href={artistDetails.link}>
                  <img
                    key='img'
                    src={artistDetails.image}
                    alt={artistDetails.name}
                  />{" "}
                </a>
              </div>
              <h3 key='followers'>
                Followers on Spotify: {artistDetails.followers}
              </h3>
            </Card>
          </div>
        );
    }
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = ({ auth, searchDetails }) => {
  return { auth, searchDetails };
};

export default connect(mapStateToProps)(ArtistDetails);
