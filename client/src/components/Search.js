import React from "react";
import { connect } from "react-redux";
import { FormGroup, Card, Elevation } from "@blueprintjs/core";
import { DebounceInput } from "react-debounce-input";
import * as actions from "../actions";

class Search extends React.Component {
  handleChange = event => {
    console.log(event.target.value);
  };
  render() {
    return (
      <div className='card-container'>
        <Card interactive={true} elevation={Elevation.TWO}>
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
