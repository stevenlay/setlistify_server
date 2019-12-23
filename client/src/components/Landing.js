import React from "react";
import Search from "./Search";
import Results from "./Results";
import ArtistDetails from "./ArtistDetails";

export default class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='rowC'>
          <Search />
          <Results />
          <ArtistDetails />
        </div>
      </React.Fragment>
    );
  }
}
