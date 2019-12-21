import React from "react";
import Search from "./Search";
import Results from "./Results";

export default class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='rowC'>
          <Search />
          <Results />
        </div>
      </React.Fragment>
    );
  }
}
