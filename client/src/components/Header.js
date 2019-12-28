import React from "react";
import { connect } from "react-redux";
import Payments from "./Payments";
import CreditCounter from "./CreditCounter";

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a href='/auth/spotify'>
            <button className='bp3-button bp3-minimal'>
              Login with Spotify
            </button>
          </a>
        );
      default:
        return [
          <CreditCounter
            credits={this.props.auth.credits}
            key='creditCounter'
          />,
          <Payments key='payments' />,
          <a href='/api/logout' key='logout'>
            <button className='bp3-button bp3-minimal'>Logout</button>
          </a>
        ];
    }
  }
  render() {
    return (
      <nav className='bp3-navbar .modifier'>
        <div className='bp3-navbar-group bp3-align-left'>
          <div className='bp3-navbar-heading'>
            <div>Setlistify</div>
          </div>
        </div>
        <div className='bp3-navbar-group bp3-align-right'>
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
