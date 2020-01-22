import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "@blueprintjs/core";
import { Button, Header, Modal } from "semantic-ui-react";
import SetlistCard from "./SetlistCard";
import * as actions from "../actions";

class ImportModal extends Component {
  state = { open: false, loading: false, done: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  loading = () => this.setState({ loading: true });
  finished = () => this.setState({ loading: false, done: true });

  canImportSetlist = () => {
    return this.props.auth.credits > 1;
  };

  importSetlist = () => {
    this.loading();
    console.log({
      setlists: this.props.search.setlists.slice(0, 2),
      artistName: this.props.searchDetails.artist.name,
      artistSpotifyId: this.props.searchDetails.artist.id
    });
    setTimeout(() => {
      this.finished();
    }, 2000);
    // this.finished();
    // this.close();
  };

  renderSetlists = setlist => {
    if (!this.props.search) {
      return this.renderGeneralWarning("No search found");
    }

    if (this.props.search.error === 404) {
      return this.renderGeneralWarning("No artist found");
    }

    return setlist.map((set, index) => (
      <SetlistCard key={index} setlist={set} />
    ));
  };

  render() {
    const { open, dimmer, loading } = this.state;

    return (
      <div>
        <Button onClick={this.show(true)}>Import Setlist</Button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          centered={false}
        >
          <Modal.Header>
            Would you like to import the setlist for{" "}
            {this.props.searchDetails.artist.name}?
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>
                {!this.canImportSetlist() && (
                  <p className='warning'>
                    You don't have enough credits to import. Please buy more.
                  </p>
                )}

                {!loading && this.canImportSetlist() && (
                  <p className='success'>
                    You have enough credits to import this setlist.
                  </p>
                )}
              </Header>
            </Modal.Description>
            <div>
              {this.renderSetlists(this.props.search.setlists.slice(0, 2))}
              {loading && (
                <div className='loader-card-container'>
                  <Card>
                    <div className='ui active dimmer'>
                      <div className='ui text loader'>Loading</div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              No
            </Button>
            {this.canImportSetlist() && (
              <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content='Spend 1 Credit'
                onClick={this.importSetlist}
              />
            )}
            {!this.canImportSetlist() && (
              <Button
                icon='checkmark'
                labelPosition='right'
                content='Buy more credits'
                onClick={this.close}
              />
            )}
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
