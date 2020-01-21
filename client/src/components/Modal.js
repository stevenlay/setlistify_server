import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Modal } from "semantic-ui-react";
import * as actions from "../actions";

class ImportModal extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button onClick={this.show(true)}>Import Setlist</Button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          centered={false}
        >
          <Modal.Header>Import Setlist</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>
                Would you like to import the setlist for the artist?
              </Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              No
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes, import'
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, search, searchDetails }) => {
  return { auth, search, searchDetails };
};

export default connect(mapStateToProps, actions)(ImportModal);
