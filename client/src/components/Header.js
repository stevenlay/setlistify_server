import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        return (
          <a href='/api/logout'>
            <button className='bp3-button bp3-minimal'>Logout</button>
          </a>
        );
    }
  }
  render() {
    return (
      <nav className='bp3-navbar .modifier'>
        <div className='bp3-navbar-group bp3-align-left'>
          <div className='bp3-navbar-heading'>
            <Link to={this.props.auth ? '/setlists' : '/'}>
              {' '}
              <button className='bp3-button bp3-minimal'>Setlistify</button>
            </Link>
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
