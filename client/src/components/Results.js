import React from "react";
import { connect } from "react-redux";
import { Card, Elevation, Button } from "@blueprintjs/core";
import SetlistCard from "./SetlistCard";
import * as actions from "../actions";

class Results extends React.Component {
  //TODO:
  importSet = async () => {
    await this.props.importSetlist({
      setlists: this.props.search.setlists.slice(0, 5),
      artistName: this.props.searchDetails.artist.name,
      artistSpotifyId: this.props.searchDetails.artist.id
    });
  };

  renderImportButton = () => {
    return (
      this.props.auth && (
        <Button onClick={this.importSet} disabled={!this.props.search.setlists}>
          Import Recent Setlists to Spotify
        </Button>
      )
    );
  };

  renderGeneralWarning = message => {
    return <p className='warning'>{message}</p>;
  };

  renderWarning = () => {
    if (this.props.search && this.props.search.numArtists > 1) {
      return "Too many different artists found from search.";
    }
    return null;
  };

  renderSetlists = () => {
    if (!this.props.search) {
      return this.renderGeneralWarning("No search found");
    }

    if (this.props.search.error === 404) {
      return this.renderGeneralWarning("No artist found");
    }

    return this.props.search.setlists.map((setlist, index) => (
      <SetlistCard key={index} setlist={setlist} />
    ));
  };

  renderContent() {
    switch (this.props.search) {
      case false:
        return <p>Search an artist and see the results here!</p>;
      default:
        return [
          <h1 className='header' key='header'>
            Results
          </h1>,
          <div className='header' key='import'>
            {this.renderImportButton()}
          </div>,
          <h4 className='warning' key='alert'>
            {this.renderWarning()}
          </h4>,
          <div key='setlist'>{this.renderSetlists()}</div>
        ];
    }
  }

  render() {
    return (
      <div className='card-container'>
        <Card interactive={false} elevation={Elevation.ONE}>
          {this.renderContent()}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, search, searchDetails }) => {
  return { auth, search, searchDetails };
};

export default connect(mapStateToProps, actions)(Results);
