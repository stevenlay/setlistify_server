import React from "react";
import { connect } from "react-redux";
import { FormGroup, Card, Elevation } from "@blueprintjs/core";
import { DebounceInput } from "react-debounce-input";
import * as actions from "../actions";

class Search extends React.Component {
  artist = "";
  handleChange = event => {
    if (this.artist !== event.target.value) {
      this.artist = event.target.value;
      this.props.fetchArtist(this.artist);
    }
  };
  render() {
    return (
      <div className='card-container'>
        <Card interactive={false} elevation={Elevation.ONE}>
          <FormGroup
            helperText=''
            label='Search for an artist:'
            labelFor='text-input'
            labelInfo='(required)'
          >
            <div className='bp3-input-group .modifier'>
              <span className='bp3-icon bp3-icon-search'></span>
              <DebounceInput
                className='bp3-input'
                type='search'
                placeholder='Ed Sheeran'
                dir='auto'
                minLength={2}
                onChange={this.handleChange}
                debounceTimeout={-1}
              />
            </div>
          </FormGroup>
        </Card>
      </div>
    );
  }
}

export default connect(null, actions)(Search);
