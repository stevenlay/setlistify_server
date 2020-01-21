import React from "react";
import { connect } from "react-redux";
import { Card, Elevation } from "@blueprintjs/core";
import SetlistCard from "./SetlistCard";
import ImportModal from "./ImportModal";

import * as actions from "../actions";

class Results extends React.Component {
  //TODO:

  renderModalContent() {
    return "Are you sure you would like to import the Setlist?";
  }

  renderActions() {
    return (
      <React.Fragment>
        <button onClick={this.importSet} className='ui button primary'>
          Delete
        </button>
      </React.Fragment>
    );
  }

  renderImportModal() {
    return <ImportModal />;
  }

  importSet = async () => {
    await this.props.importSetlist({
      setlists: this.props.search.setlists.slice(0, 2),
      artistName: this.props.searchDetails.artist.name,
      artistSpotifyId: this.props.searchDetails.artist.id
    });
  };

  canImportSetlist = () => {
    return (
      this.props.auth &&
      this.props.search &&
      this.props.search.setlists &&
      this.props.search.numArtists === 1 &&
      this.props.searchDetails
    );
  };

  renderImportButton = () => {
    return this.canImportSetlist() && <ImportModal />;
  };

  renderGeneralWarning = message => {
    return <p className='warning'>{message}</p>;
  };

  renderWarning = () => {
    if (this.npsearch && this.props.search.numArtists > 1) {
      return "Too many different artists found from search. Please be more specific.";
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
        return (
          <p className='alert'>Search an artist and see the results here!</p>
        );
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
          <div key='setlist' className='setlist-card-container'>
            {this.renderSetlists()}
          </div>
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
