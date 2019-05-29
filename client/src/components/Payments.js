import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name='Setlistify'
        description='Songlist credits'
        amount={0}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='bp3-button bp3-minimal bp3-intent-success'>
          Buy Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
