import React from "react";
import { connect } from "react-redux";
import { Card, Elevation, Button } from "@blueprintjs/core";

class Results extends React.Component {
  renderContent() {
    switch (this.props.search) {
      case false:
        return <p>Search an artist and see the results here!</p>;
      default:
        return <p>Hello</p>;
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
