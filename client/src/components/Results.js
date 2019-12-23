import React from "react";
import { connect } from "react-redux";
import { Card, Elevation, Button } from "@blueprintjs/core";

import SetlistCard from "./SetlistCard";

class Results extends React.Component {
  //TODO:
  importSet = () => {};
  renderImportButton() {}

  renderWarning = () => {
    if (this.props.search && this.props.search.numArtists > 1) {
      return "Too many different artists found from search.";
    }
    return null;
  };

  renderSetlists = () => {
    return this.props.search.setlists.map((setlist, index) =>
      setlist.songs.length > 0 ? (
        <SetlistCard key={index} setlist={setlist} />
      ) : null
    );
  };

  renderContent() {
    switch (this.props.search) {
      case false:
        return <p>Search an artist and see the results here!</p>;
      default:
        return [
          <h1 key='header'>
            Setlist for: {this.props.search.artist}{" "}
            {<Button onClick={this.importSet}>Import Recent Tour</Button>}
          </h1>,
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
        <Card interactive={false} elevation={Elevation.TWO}>
          {this.renderContent()}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => {
  return { search };
};

export default connect(mapStateToProps)(Results);
