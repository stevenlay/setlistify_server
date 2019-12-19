import React from "react";
import {
  FormGroup,
  InputGroup,
  Button,
  Card,
  Elevation
} from "@blueprintjs/core";
import { DebounceInput } from "react-debounce-input";

export default class Landing extends React.Component {
  handleChange = event => {};

  render() {
    return (
      <React.Fragment>
        <div className='login-card-container'>
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
                    onChange={this.handleChange}
                    debounceTimeout={400}
                  />
                </div>
              </FormGroup>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
