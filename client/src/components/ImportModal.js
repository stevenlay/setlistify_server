import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "@blueprintjs/core";
import { Grid, Button, Modal } from "semantic-ui-react";
import SetlistCard from "./SetlistCard";
import * as actions from "../actions";

class ImportModal extends Component {
  state = {
    open: false,
    loading: false,
    done: this.props.false,
    success: false
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false, done: false });
  loading = () => this.setState({ loading: true });
  finished = () => this.setState({ loading: false, done: true });
  success = () => this.setState({ success: true });

  canImportSetlist = () => {
    return this.props.auth.credits > 1;
  };

  //TODO: on successful request, then deduct a credit
  importSetlist = () => {
    this.loading();
    console.log({
      setlists: this.props.search.setlists.slice(0, 2),
      artistName: this.props.searchDetails.artist.name,
      artistSpotifyId: this.props.searchDetails.artist.id
    });
    setTimeout(() => {
      this.finished();
      this.success();
      this.props.handleCredit();
    }, 2000);
  };

  renderSetlists = setlist => {
    if (!this.props.search) {
      return this.renderGeneralWarning("No search found");
    }

    if (this.props.search.error === 404) {
      return this.renderGeneralWarning("No artist found");
    }

    return setlist.map((set, index) => (
      <SetlistCard key={index} setlist={set} details={false} />
    ));
  };

  renderDoneModal = (header, message, success) => {
    const color = success ? "green" : "red";
    return (
      <>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content className='header'>
          <div>{message}</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color={color} onClick={this.close}>
            Finish
          </Button>
        </Modal.Actions>
      </>
    );
  };

  renderDialogModal = () => {
    return (
      <>
        {" "}
        <Modal.Header>
          Would you like to import the setlist for{" "}
          {this.props.searchDetails.artist.name}?
          {!this.canImportSetlist() && (
            <p className='warning'>
              You don't have enough credits to import. Please buy more.
            </p>
          )}
          {!this.state.loading && this.canImportSetlist() && (
            <p className='success'>
              You have enough credits to import this setlist.
            </p>
          )}
        </Modal.Header>
        <Modal.Content>
          <div>
            <Grid>
              {this.renderSetlists(this.props.search.setlists.slice(0, 2))}
              {this.state.loading && (
                <div className='loader-card-container'>
                  <Card>
                    <div className='ui active dimmer'>
                      <div className='ui text loader'>Loading</div>
                    </div>
                  </Card>
                </div>
              )}
            </Grid>
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
      </>
    );
  };

  render() {
    const { open, dimmer, done, success } = this.state;

    return (
      <div>
        {
          <>
            <Button onClick={this.show(true)}>Import Setlist</Button>

            <Modal
              dimmer={dimmer}
              open={open}
              onClose={this.close}
              centered={false}
            >
              {done &&
                success &&
                this.renderDoneModal(
                  "Finished Importing",
                  "Check your Spotify account for the playlist!",
                  true
                )}

              {done &&
                !success &&
                this.renderDoneModal(
                  "Error importing. Please try again.",
                  false
                )}

              {!done && this.renderDialogModal()}
            </Modal>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ auth, search, searchDetails }) => {
  return { auth, search, searchDetails };
};

export default connect(mapStateToProps, actions)(ImportModal);
