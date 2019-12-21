import React from "react";
import { connect } from "react-redux";
import { Card, Elevation } from "@blueprintjs/core";

import SetlistCard from "./SetlistCard";

class Results extends React.Component {
  renderContent() {
    switch (this.props.search) {
      case false:
        return <p>Search an artist and see the results here!</p>;
      default:
        return [
          <h1 key='header'>Setlist for: {this.props.search.artist}</h1>,
          <p key='setlist'>
            {this.props.search.setlists.map(setlist =>
              setlist.songs.length > 0 ? (
                <SetlistCard setlist={setlist} />
              ) : null
            )}
          </p>
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
